import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonConstant } from 'app/_constant/common.constants';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User0203Service } from 'app/_service/user/phieumuon/user0203.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { SearchService } from 'app/_service/user/serach.service';
import { forkJoin, map } from 'rxjs';
declare var window: any;

@Component({
  selector: 'app-list-dang-muon',
  templateUrl: './list-dang-muon.component.html',
  styleUrls: ['./list-dang-muon.component.css']
})
export class ListDangMuonComponent implements OnInit {
  status: number = 1;
  formattedDate: string;
  listBook: DauSach[];
  phieumuonDto: phieumuonDto[];
  reverse: boolean = false;
  selectedItem: any;
  phieumuonCancel: phieumuonDto;
  listImg: string[] = [];
  numbersArray: Number[] = [];
  pageCurrent: Number = 1;
  formModalExtend: any;
  phieumuonExtend: phieumuonDto;
  max: any;
  min: any;
  returnDate: Date;

  constructor(private user0202Service: User0202Service,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private user0203Service: User0203Service,
    private dauSach: DauSachService
  ) { }

  @ViewChild('borrowedDateInput', { static: true }) borrowedDateInput: ElementRef;

  ngAfterViewInit() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    this.max = `${yyyy}-${mm}-${dd}`;
  }

  ngOnInit(): void {

    this.searchService.raiseStatutEmitterEvent(1);
    this.getData()
    this.pagination()
    this.formModalExtend = new window.bootstrap.Modal(
      document.getElementById('extendModal')
    );
  }

  getData() {
    this.user0202Service.getPhieuByStatus(1).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.phieumuonDto = resp.listResponseData as phieumuonDto[];
          this.listBook = [];
          for (const item of this.phieumuonDto) {

            if (item.listBook) {
              this.listBook.push(...item.listBook);
            }
          }
          let subscribeList: any[] = [];
          for (let i = 0; i < this.listBook.length; i++) {
            if (this.listBook[i].img) {
              subscribeList.push(this.dauSach.getCover(this.listBook[i].img!));
            }
            else {
              subscribeList.push(this.dauSach.getCover("no-image.png"));
            }
          }
          forkJoin(subscribeList).pipe(
            map((respArr) => {
              // console.log(respArr);
              for (let item of respArr) {
                this.listImg.push('data:image/jpeg;base64,' + item.responseData);
              }
              // console.log(this.imageArray)
            })
          ).subscribe();
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  appendQueryParam(page: Number) {
    if (page != 0) {
      this.router.navigate(['/user/phieumuon/status/' + this.status], { queryParams: { page: page } })
    }
  }

  pagination() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.pageCurrent = Number(param.get("page"))
      if (this.pageCurrent == 0) {
        this.pageCurrent = 1
      }
      this.phieumuonDto = []
      this.getData();
    })
  }

  openModalExtend(item: any) {
    this.phieumuonExtend = item;
    this.formModalExtend.show();
  }

  extendReturnDate(phieumuon: phieumuonDto) {
    console.log(phieumuon);
    const today = new Date();
    const rde = new Date(phieumuon.returnDateEstimate!);
    this.min = rde.toISOString().split('T')[0];
    const maxDate = new Date;
    maxDate.setTime(rde.getTime() + 14 * 24 * 60 * 60 * 1000);
    this.max = maxDate.toISOString().split('T')[0];
    console.log(this.min);
    console.log(this.max);
    if (phieumuon.extended_times === 1) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Không thể gia hạn do đã đạt giới hạn số lần gia hạn',
      });
    }
    else if ((rde.getTime() - today.getTime()) / (1000 * 3600 * 24) <= 1) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Không thể gia hạn do đã quá thời hạn được phép gia hạn',
      });
    }
    else {
      this.openModalExtend(phieumuon);
    }
  }

  confirmExtend() {
    var phieumuon = this.phieumuonExtend;
    if (!this.returnDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vui lòng chọn ngày muốn gia hạn',
      });
    }
    else {
      phieumuon.returnDateEstimate = this.returnDate;
      console.log(phieumuon);
      this.user0203Service.extendReturnDate(phieumuon).subscribe(
        (response) => {
          if (response.status === CommonConstant.RESULT_OK) {
            Swal.fire({
              icon: 'success',
              title: 'Thành công',
              text: response.message,
            }).then(() => {
              window.location.reload();
            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.message,
            });
          }
        }
      )
    }

  }
}

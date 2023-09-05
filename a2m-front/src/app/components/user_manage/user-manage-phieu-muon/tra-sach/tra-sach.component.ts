import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { DataService } from 'app/_service/comm/data.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Sys0303Service } from 'app/_service/sys/phieumuon/sys0303.service';
import { SearchService } from 'app/_service/user/serach.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-tra-sach',
  templateUrl: './tra-sach.component.html',
  styleUrls: ['./tra-sach.component.css']
})
export class TraSachComponent implements OnInit {
  idPhieuMuon: number = 0;
  phieumuonDto: phieumuonDto;
  listBook: DauSach[];
  userInfo: UserInfo;
  total: number = 0;
  selectedIds: string[] = [];
  remainingIds: string[] = [];
  fine: number = 0;
  displayFine: number = this.fine;
  currentDate: string;
  userUid: number = 0
  listImg: string[] = [];
  checkEmpty: boolean = false

  constructor(
    private route: ActivatedRoute,
    private sys0303Service: Sys0303Service,
    private datePipe: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private searchService: SearchService,
    private dataService: DataService,
    private dauSach: DauSachService
  ) { }

  ngOnInit(): void {
    this.searchService.raiseStatutEmitterEvent(1);
    this.userUid = this.dataService.getUserUid()
    this.route.paramMap.subscribe(params => {
      const idPhieuMuon = params.get('id')
      if (idPhieuMuon !== null) {
        this.idPhieuMuon = Number(idPhieuMuon);
      }
    })

    this.checkEmpty;

    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy') as string;
    this.getDetailData();

    this.route.queryParams.subscribe(params => {
      this.selectedIds = params['selectedIds'] ? params['selectedIds'].split(',') : [];
      this.remainingIds = params['remainingIds'] ? params['remainingIds'].split(',') : [];
    });

    this.getFine();
  }

  getFine() {
    this.sys0303Service.getFine(this.idPhieuMuon, this.selectedIds).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.fine = Number(resp.responseData)
          this.displayFine = Number(resp.responseData);
          console.log('Fine:', this.fine);
        }
      }
    })
  }

  getDetailData() {
    this.sys0303Service.getDetailPhieuMuon(this.idPhieuMuon).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.phieumuonDto = resp.responseData as phieumuonDto;
          this.listBook = this.phieumuonDto?.listBook ?? [];
          this.userInfo = this.phieumuonDto?.userInfo as UserInfo;

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
          this.checkEmpty = true;

          console.log(this.phieumuonDto);
          console.log(this.listBook);
        }
      }
    })
  }

  changeStatusToReturnBook() {
    this.sys0303Service.changeStatusToReturnBook(this.idPhieuMuon, this.remainingIds).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Trả sách thành công!',
          }).then(
            () => {
              this.router.navigate(['/sys/user-detail/' + this.userUid + '/phieu-muon/status/2']);
            });
        } else {
          this.toastr.error("Xác nhận phiếu đã trả thất bại!")
        }
      }
    })
  }

}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Sys0303Service } from 'app/_service/sys/phieumuon/sys0303.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-trasach',
  templateUrl: './trasach.component.html',
  styleUrls: ['./trasach.component.css']
})
export class TrasachComponent implements OnInit {
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
  listImg: string[] = []

  constructor(private route: ActivatedRoute,
    private sys0303Service: Sys0303Service,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private dauSach: DauSachService
  ) {
    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy') as string;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idPhieuMuon = params.get('id')
      if (idPhieuMuon !== null) {
        this.idPhieuMuon = Number(idPhieuMuon);
      }
    })
    this.getDetailData();
    this.route.queryParams.subscribe(params => {
      this.selectedIds = params['selectedIds'] ? params['selectedIds'].split(',') : [];
      this.remainingIds = params['remainingIds'] ? params['remainingIds'].split(',') : [];
    });

    this.getFine();

    console.log('selectedIds: ' + this.selectedIds);
    console.log('remainingIds ' + this.remainingIds);

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
          this.userInfo = this.phieumuonDto?.userInfo as UserInfo;
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
            text: 'Xác nhận phiếu đã trả thành công!',
          }).then(
            () => {
              this.router.navigate(['/sys/list-phieumuon/status/2']);
            });
        } else {
          this.toastr.error("Xác nhận phiếu đã trả thất bại!")
        }
      }
    })
  }

}

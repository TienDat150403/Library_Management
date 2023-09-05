import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { Sys0303Service } from 'app/_service/sys/phieumuon/sys0303.service';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import { User0104Service } from 'app/_service/user/user0104.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-chi-tiet',
  templateUrl: './chi-tiet.component.html',
  styleUrls: ['./chi-tiet.component.css']
})
export class ChiTietComponent implements OnInit {
  idPhieuMuon: number = 0;
  status: number = 0;
  listBook: DauSach[];
  listImg: string[] = [];
  userInfo: UserInfo;
  phieumuonDto: phieumuonDto;
  modalUpdatePhieuCho: any;
  fine: number = 0;
  phieumuonCancel: phieumuonDto;

  constructor(private route: ActivatedRoute,
    private sys0303Service: Sys0303Service,
    private sys0301service: Sys0301Service,
    private user0202Service: User0202Service,
    private user0104Service: User0104Service,
    private toastr: ToastrService,
    private dauSach: DauSachService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.status = params['status']
    })
    this.route.params.subscribe(params => {
      this.idPhieuMuon = params['id']
    })
    this.getDetailData();
  }

  updatePhieuCho() {
    this.modalUpdatePhieuCho.show();
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
            console.log(this.userInfo);
            this.fine = this.phieumuonDto.fine;
          }
        }
    })
  }

  updateStatus(idPhieuMuon: number) {
    this.idPhieuMuon = idPhieuMuon;
    this.sys0301service.updateStatus(idPhieuMuon).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Xác nhận mượn thành công!',
          }).then(
            () => {
              window.history.back();
            });
        } else {
          this.toastr.success("Xác nhận phiếu mượn thất bại!")
        }
      }
    })
  }

  cancelPhieuMuon() {
    this.user0202Service.cancelPhieuDanhChoXacNhan(this.phieumuonCancel.idPhieuMuon + '').subscribe({
      next: (resp: DataResponse) => {
        if (resp.status === CommonConstant.RESULT_OK) {
          this.getDetailData()
          this.user0104Service.countTotalNotiUnread().subscribe(data => {
          })
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Hủy phiếu mượn thành công!',
          }).then(
            () => {
              window.history.back();
            });
        }
      },
      error: (err: any) => {
      }
    })
  }

  phieuMuonSelected(item: phieumuonDto) {
    this.phieumuonCancel = item;
  }

}

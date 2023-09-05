import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { DataService } from 'app/_service/comm/data.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import { SearchService } from 'app/_service/user/serach.service';
import { User0104Service } from 'app/_service/user/user0104.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2'
declare var window: any;


@Component({
  selector: 'app-dang-cho-xac-nhan',
  templateUrl: './dang-cho-xac-nhan.component.html',
  styleUrls: ['../user-manage-phieu-muon.component.css']
})
export class DangChoXacNhanComponent implements OnInit {
  id: number = 0;
  idPhieuMuon: number = 0;
  status: number = 0;
  listBook: DauSach[];
  phieumuonDto: phieumuonDto[];
  reverse: boolean = false;
  phieumuonCancel: phieumuonDto;
  numbersArray: Number[] = [];
  pageCurrent: Number = 1;
  listImg: string[] = []

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private sys0301Service: Sys0301Service,
    private user0202Service: User0202Service,
    private toastr: ToastrService,
    private user0104Service: User0104Service,
    private searchService: SearchService,
    private router: Router,
    private dauSach: DauSachService
  ) { }

  ngOnInit(): void {
    this.searchService.raiseStatutEmitterEvent(0);
    this.id = this.dataService.getUserUid()
    console.log(this.id);
    for (let i = 1; i <= 5; i++) {
      this.numbersArray.push(i);
    }
    this.getData()
  }

  getData() {
    this.sys0301Service.getListPhieuMuonUserLimit(this.id, this.status, this.pageCurrent).subscribe({
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
          console.log(this.listBook);
          console.log("hello phieumuon : " + this.phieumuonDto);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  updateStatus() {
    this.sys0301Service.updateStatus(Number(this.phieumuonCancel.idPhieuMuon)).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Xác nhận phiếu mượn thành công!',
          }).then(
            () => {
              this.router.navigate(['/sys/user-detail/' + this.id + '/phieu-muon/status/1']);
            });
        } else {
          this.toastr.success("Xác nhận phiếu mượn thất bại")
          window.location.reload();
        }
      }
    })
  }

  getPhieuDangChoXacNhan(phieuMuon: phieumuonDto) {
    this.phieumuonCancel = phieuMuon;
  }

  cancelPhieuMuon() {
    this.user0202Service.cancelPhieuDanhChoXacNhan(this.phieumuonCancel.idPhieuMuon + '').subscribe({
      next: (resp: DataResponse) => {
        if (resp.status === CommonConstant.RESULT_OK) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Hủy phiếu mượn thành công!',
          }).then(
            () => {
              this.router.navigate(['/sys/user-detail/' + this.id + '/phieu-muon/status/3']);
            });
          this.phieumuonDto = []
          this.getData()
          this.user0104Service.countTotalNotiUnread().subscribe(data => {
          })
        }
      },
      error: (err: any) => {
      }
    })
  }
}

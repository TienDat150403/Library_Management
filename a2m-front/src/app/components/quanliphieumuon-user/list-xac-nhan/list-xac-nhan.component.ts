import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonConstant } from 'app/_constant/common.constants';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User0104Service } from 'app/_service/user/user0104.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { SearchService } from 'app/_service/user/serach.service';
import Swal from 'sweetalert2'
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-list-xac-nhan',
  templateUrl: './list-xac-nhan.component.html',
  styleUrls: ['./list-xac-nhan.component.css']
})
export class ListXacNhanComponent implements OnInit {
  status: number = 0;
  listBook: DauSach[];
  phieumuonDto: phieumuonDto[];
  reverse: boolean = false;
  listImg: string[] = [];
  phieumuonCancel: phieumuonDto;
  numbersArray: Number[] = [];
  pageCurrent: Number = 1;
  // genresList: any[] = [];

  constructor(private user0202Service: User0202Service,
    private user0104Service: User0104Service,
    private dauSach: DauSachService,
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchService.raiseStatutEmitterEvent(0);
    this.getData()
  }

  getData() {
    this.user0202Service.getPhieuByStatus(0).subscribe({
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
              this.router.navigate(['/user/phieumuon/status/3']);
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

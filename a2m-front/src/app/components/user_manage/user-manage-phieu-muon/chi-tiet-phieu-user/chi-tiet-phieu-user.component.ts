import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { DataService } from 'app/_service/comm/data.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { Sys0303Service } from 'app/_service/sys/phieumuon/sys0303.service';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-chi-tiet-phieu-user',
  templateUrl: './chi-tiet-phieu-user.component.html',
  styleUrls: ['../user-manage-phieu-muon.component.css']
})
export class ChiTietPhieuUserComponent implements OnInit {
  status: number = 2;
  idPhieuMuon: number = 0;
  listBook: DauSach[];
  userInfo: UserInfo;
  userUid: number = 0
  phieumuonDto: phieumuonDto;
  listImg: string[] = []

  constructor(private route: ActivatedRoute,
    private sys0303Service: Sys0303Service,
    private dauSach: DauSachService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idPhieuMuon = params['id']
    })

    this.route.queryParams.subscribe(params => {
      this.status = params['status']
    })
    this.getDetailData();
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
          console.log(this.phieumuonDto);
          console.log(this.listBook);
        }
      }
    })
  }


}

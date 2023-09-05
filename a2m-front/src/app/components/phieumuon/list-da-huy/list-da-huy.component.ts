import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-da-huy',
  templateUrl: './list-da-huy.component.html',
  styleUrls: ['../phieumuon.component.css']
})
export class ListDaHuyComponent implements OnInit {
  list: phieumuonDto[];
  status: number = 3;
  reverse: boolean = false;
  selectedItem: any;
  formModalOk: any;
  idPhieuMuon: number = 0;
  numbersArray: Number[] = [];
  pageCurrent: number = 1;
  username: string;
  constructor(private sys0301service: Sys0301Service,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    for (let i = 1; i <= 5; i++) {
      this.numbersArray.push(i);
      this.getData()
      this.pagination()
    }
  }

  sortByCreatedDate() {
    if (this.reverse) {
      this.list.sort((a, b) => {
        const dateA = a.createdDate ? new Date(a.createdDate) : null;
        const dateB = b.createdDate ? new Date(b.createdDate) : null;
        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime();
        }
        return 0;
      });
    }
    else {
      this.list.sort((a, b) => {
        const dateA = a.createdDate ? new Date(a.createdDate) : null;
        const dateB = b.createdDate ? new Date(b.createdDate) : null;
        if (dateA && dateB) {
          return dateB.getTime() - dateA.getTime()
        }
        return 0;
      });
    }
    this.reverse = !this.reverse;
  }

  getData() {
    this.sys0301service.getListPhieuMuonLimit(this.status, this.pageCurrent, 0).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          if (resp && resp.listResponseData && Array.isArray(resp.listResponseData)) {
            this.list = resp.listResponseData.map((item: any) => {
              const phieumuonItem: phieumuonDto = {
                idPhieuMuon: item.idPhieuMuon,
                userUid: item.userUid,
                createdDate: item.createdDate,
                borrowDate: item.borrowDate,
                returnDateEstimate: item.returnDateEstimate,
                returnUpdateReal: item.returnUpdateReal,
                status: item.status,
                extended_times: item.extended_times,
                countBook: item.countBook,
                userInfo: item.userInfo as UserInfo,
                fine: item.fine,
                cancelDate: item.cancelDate
              };
              return phieumuonItem;
            });
          }
          console.log(this.list);

        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getDataByUsername() {
    console.log(this.username);
    this.sys0301service.getPhieuByUsername(this.status, this.username).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          if (resp && resp.listResponseData && Array.isArray(resp.listResponseData)) {
            this.list = resp.listResponseData.map((item: any) => {
              const phieumuonItem: phieumuonDto = {
                idPhieuMuon: item.idPhieuMuon,
                userUid: item.userUid,
                createdDate: item.createdDate,
                borrowDate: item.borrowDate,
                returnDateEstimate: item.returnDateEstimate,
                returnUpdateReal: item.returnUpdateReal,
                status: item.status,
                extended_times: item.extended_times,
                countBook: item.countBook,
                userInfo: item.userInfo as UserInfo,
                fine: item.fine
              };
              return phieumuonItem;
            });
          }
          console.log(this.list);

        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  currentPage(page: Number) {
    if (page != 0) {
      this.router.navigate(['/sys/list-phieumuon/status/' + this.status], { queryParams: { page: page } })
    }
  }


  appendQueryParam(page: number) {
    let nextPage = this.pageCurrent + page;
    if (nextPage > 0) {
      this.router.navigate(['/sys/list-phieumuon/status/' + this.status], { queryParams: { page: nextPage } })
    }
    console.log(nextPage);
  }

  pagination() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.pageCurrent = Number(param.get("page"))
      if (this.pageCurrent == 0) {
        this.pageCurrent = 1
      }
      this.list = []
      this.getData();
    })
  }
}


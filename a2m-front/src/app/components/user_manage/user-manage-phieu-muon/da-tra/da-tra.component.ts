import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { DataService } from 'app/_service/comm/data.service';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { SearchService } from 'app/_service/user/serach.service';
declare var window: any;


@Component({
  selector: 'app-da-tra',
  templateUrl: './da-tra.component.html',
  styleUrls: ['./da-tra.component.css']
})
export class DaTraComponent implements OnInit {
  reverse: boolean = false;
  id: number = 0;
  status: number = 2;
  listBook: DauSach[];
  list: phieumuonDto[];
  numbersArray: Number[] = [];
  pageCurrent: number = 1;
  idPhieuMuon: number = 0;
  totalPhieuMuon: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private sys0301Service: Sys0301Service,
    private dataService: DataService,
    private searchService: SearchService,
    private router: Router) { }
  ngOnInit(): void {
    this.searchService.raiseStatutEmitterEvent(2);
    this.id = this.dataService.getUserUid()
    this.totalPhieu()
    this.getData()
    this.pagination()
  }


  getData() {
    this.sys0301Service.getListPhieuMuonUserLimit(this.id, 2, this.pageCurrent).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.list = resp.listResponseData as phieumuonDto[];
          this.listBook = [];
          for (const item of this.list) {
            if (item.listBook) {
              this.listBook.push(...item.listBook);
            }
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
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

  sortByReturnUpdateReal() {
    if (this.reverse) {
      this.list.sort((a, b) => {
        const dateA = a.returnUpdateReal ? new Date(a.returnUpdateReal) : null;
        const dateB = b.returnUpdateReal ? new Date(b.returnUpdateReal) : null;
        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime();
        }
        return 0;
      });
    }
    else {
      this.list.sort((a, b) => {
        const dateA = a.returnUpdateReal ? new Date(a.returnUpdateReal) : null;
        const dateB = b.returnUpdateReal ? new Date(b.returnUpdateReal) : null;
        if (dateA && dateB) {
          return dateB.getTime() - dateA.getTime()
        }
        return 0;
      });
    }

    this.reverse = !this.reverse;

  }

  appendQueryParam(page: number) {
    let nextPage = this.pageCurrent + page;
    if (nextPage > 0) {
      this.router.navigate(['/sys/user-detail/' + this.id + '/phieu-muon/status/' + this.status], { queryParams: { page: nextPage } })
    }
  }

  currentPage(page: number) {
    if (page != 0) {
      this.router.navigate(['/sys/user-detail/' + this.id + '/phieu-muon/status/' + this.status], { queryParams: { page: page } })
    }
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

  totalPhieu() {
    this.sys0301Service.getTotalPhieuByStatusAndUserUid(this.status, this.id).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.totalPhieuMuon = resp.responseData;
          this.generateNumbersArray();
          console.log('tổng số phiếu: ' + this.totalPhieuMuon);
        }
      }
    })
  }
  generateNumbersArray() {
    const totalPages = Math.ceil(this.totalPhieuMuon / 5);
    this.numbersArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

}

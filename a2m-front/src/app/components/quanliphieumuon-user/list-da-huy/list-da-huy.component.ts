import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import { SearchService } from 'app/_service/user/serach.service';

@Component({
  selector: 'app-list-da-huy',
  templateUrl: './list-da-huy.component.html',
  styleUrls: ['../quanliphieumuon-user.component.css']
})
export class ListDaHuyComponent implements OnInit {
  reverse: boolean = false;
  listBook: DauSach[];
  list: phieumuonDto[];
  selectedItem: any;
  status: number = 3;
  numbersArray: Number[] = [];
  pageCurrent: number = 1;
  totalPhieuMuon: any;

  constructor(private user0202Service: User0202Service,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sys0301service: Sys0301Service,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchService.raiseStatutEmitterEvent(3);
    this.totalPhieu()
    this.getData();
    this.pagination()
  }
  getData() {
    this.user0202Service.getListPhieuMuonLimit(3, this.pageCurrent).subscribe({
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

  // sortByReturnUpdateReal() {
  //   if (this.reverse) {
  //     this.list.sort((a, b) => {
  //       const dateA = a.returnUpdateReal ? new Date(a.returnUpdateReal) : null;
  //       const dateB = b.returnUpdateReal ? new Date(b.returnUpdateReal) : null;
  //       if (dateA && dateB) {
  //         return dateA.getTime() - dateB.getTime();
  //       }
  //       return 0;
  //     });
  //   }
  //   else {
  //     this.list.sort((a, b) => {
  //       const dateA = a.returnUpdateReal ? new Date(a.returnUpdateReal) : null;
  //       const dateB = b.returnUpdateReal ? new Date(b.returnUpdateReal) : null;
  //       if (dateA && dateB) {
  //         return dateB.getTime() - dateA.getTime()
  //       }
  //       return 0;
  //     });
  //   }
  //   this.reverse = !this.reverse;
  // }

  appendQueryParam(page: number) {
    let nextPage = this.pageCurrent + page;
    if (nextPage > 0) {
      this.router.navigate(['/user/phieumuon/status/' + this.status], { queryParams: { page: nextPage } })
    }
    console.log(nextPage);
  }

  currentPage(page: number) {
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
      this.list = []
      this.getData();
    })
  }

  totalPhieu() {
    this.user0202Service.getCountPhieuByUserUidAndStatus(this.status).subscribe({
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

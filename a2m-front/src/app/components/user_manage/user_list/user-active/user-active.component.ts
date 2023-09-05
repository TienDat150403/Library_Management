import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConstant } from 'app/_constant/auth.constant';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { Sys0101Service } from 'app/_service/sys/sys0101.service';
import { SearchService } from 'app/_service/user/serach.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-user-active',
  templateUrl: './user-active.component.html',
  styleUrls: ['../userlist.component.css']
})
export class UserActiveComponent implements OnInit {
  users: UserInfo[];
  listUsers: UserInfo[] = [];
  statusShow: String = '0'
  numbersArray: Number[] = [];
  pageCurrent: number = 1;
  previewImage: any;
  file: File;
  totalUsers: any;
  username: string;
  status: string = '02-03'


  constructor(
    private authService: AuthenticationService,
    private sys0101Service: Sys0101Service,
    private loading: LoaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searching: SearchService
  ) { }

  ngOnInit(): void {
    this.searching.raiseDataEmitterEvent('02-03')
    this.totalUser()
    this.pagination()
  }

  getListUser() {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.loading.change(true)
      this.sys0101Service.getListUser(this.status, this.pageCurrent).subscribe(
        {
          next: (resp: DataResponse) => {
            this.users = resp.listResponseData;
          },
          error: (err: any) => {
            this.loading.change(false)
          }
        }
      )
    }
  }

  getDataByUsername() {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.loading.change(true)
      this.sys0101Service.getListUserByUserid(this.username).subscribe(
        {
          next: (resp: DataResponse) => {
            this.users = resp.listResponseData;
          },
          error: (err: any) => {
            this.loading.change(false)
          }
        }
      )
    }
  }

  appendQueryParam(page: number) {
    let nextPage = this.pageCurrent + page;
    if (nextPage > 0) {
      this.router.navigate(['/sys/user-list/status/02-03'], { queryParams: { page: nextPage } })
    }
  }

  currentPage(page: number) {
    if (page != 0) {
      this.router.navigate(['/sys/user-list/status/02-03'], { queryParams: { page: page } })
    }
  }

  pagination() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.pageCurrent = Number(param.get("page"))
      if (this.pageCurrent == 0) {
        this.pageCurrent = 1
      }
      this.users = [];
      this.getListUser();
    })
  }

  totalUser() {
    this.authService.getCountUser(this.status).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.totalUsers = resp.responseData;
          this.generateNumbersArray();
          console.log(this.totalUser);
        }
      }
    })
  }

  generateNumbersArray() {
    const totalPages = Math.ceil(this.totalUsers / 10);
    this.numbersArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

}

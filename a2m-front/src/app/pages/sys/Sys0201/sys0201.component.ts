import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthConstant } from 'app/_constant/auth.constant';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { DauSach } from 'app/_model/sys/book/book.model';

@Component({
  selector: 'sys0201',
  templateUrl: './sys0201.component.html',
  styleUrls: ['./sys0201.component.css']
})
export class Sys0201Component implements OnInit {
  bookCodeList: string[] = [];
  constructor(
    private authService: AuthenticationService,
    private loading: LoaderService,
    private toastr: ToastrService,
  ) {  }
    

  ngOnInit(): void {
    // this.bookCodeList[0] = "ATMD";
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.loading.change(true)
        error: (err: any) => {
          this.loading.change(false)
        }
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sam0101',
  templateUrl: './sam0101.component.html',
  styleUrls: ['./sam0101.component.css']
})
export class Sam0101Component implements OnInit {

  userInfo: UserInfo = new UserInfo();

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private loading: LoaderService
  ) { }

  ngOnInit(): void {
    this.loading.change(true)
    this.authService.getUserInfo().subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.userInfo = resp.responseData;
          this.toastr.success("Get userInfo success");
        } else {
          this.toastr.error("Get userInfo fail")
        }
        this.loading.change(false)
      },
      error: (err: any) => {
        this.toastr.error("Get userInfo fail")
        this.loading.change(false)
      }
    })
  }

}

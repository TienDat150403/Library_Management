import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'app/_service/services/cart.service';
import { CartModelServer } from 'app/_model/models/cart.model';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'app/_service/comm/loader.service';
import { AuthConstant } from 'app/_constant/auth.constant';
import { Cookie } from 'ng2-cookies';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { User0101Service } from 'app/_service/user/user0101.service';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-sys',
  templateUrl: './headerSys.component.html',
  styleUrls: ['./headerSys.component.scss']
})
export class HeaderSysComponent implements OnInit {
  isAuthenticate: boolean = false;
  constructor(public user0101Service: User0101Service,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private loading: LoaderService) {
  }

  ngOnInit() {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.loading.change(true)
      this.authService.getUserInfo().subscribe({
        next: (resp: DataResponse) => {
          if (resp.status == CommonConstant.RESULT_OK) {
            let userInfo: UserInfo = resp.responseData;
            this.isAuthenticate = true;
            // this.toastr.success("Get userInfo success");
          } else {
            // this.toastr.error("Get userInfo fail")
          }
          this.loading.change(false)
        },
        error: (err: any) => {
          // this.toastr.error("Get userInfo fail")
          this.loading.change(false)
        }
      })
    }
  }
  login() {
    this.authService.logIn();
  }

    logout(){
        this.authService.logOut(true);
    }



  // this.user0101Service.getListBookInCart().subscribe({
  //   next: (resp: DataResponse) => {
  //     this.cartTotal = resp.listResponseData.length;
  //   }
  // })

  // this.cartService.cartTotal$.subscribe(total => {
  //   this.cartTotal = total;
  // } );

  // this.cartService.cartDataObs$.subscribe(data => this.cartData = data);

}
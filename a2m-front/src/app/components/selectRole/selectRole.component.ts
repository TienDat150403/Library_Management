import {Component, OnInit} from '@angular/core';
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
    selector: 'app-selectRole',
    templateUrl: './selectRole.component.html',
    styleUrls: ['./selectRole.component.css']
  })
export class SelectRoleComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {

  }

}

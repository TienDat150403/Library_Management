import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConstant } from 'app/_constant/auth.constant';
import { CommonConstant } from 'app/_constant/common.constants';
import { DataResponse } from 'app/_model/resp/data-response';
import { DataService } from 'app/_service/comm/data.service';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  roleUser: any[]


  constructor(
    // private activatedRoute: ActivatedRoute,
    // private authentication: AuthenticationService,
    // private router: Router,
    // private dataService: DataService,
  ) {

  }

  ngOnInit(): void {

    // if (!this.dataService.getSelectedRole() && Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
    //   this.authentication.getRoles().subscribe({
    //     next: (resp: DataResponse) => {
    //       if (resp.status == CommonConstant.RESULT_OK) {
    //         this.dataService.setSelectedRole(true);
    //         this.roleUser = resp.listResponseData;
    //         if (this.roleUser.length > 1) {
    //           console.log(1)
    //           this.router.navigate(['/sys/selectRole'])
    //         }
    //         else if (this.roleUser[0].roleId == AuthConstant.ROLE_NORMAL) {
    //           console.log(2)
    //           this.router.navigate(['/home'])
    //         }
    //         // else if(this.roleUser[0].roleId == AuthConstant.ROLE_ADMIN){
    //         //   console.log(3)
    //         //   this.router.navigate(['/sys/list-categories']) 
    //         // }
    //       }
    //     },
    //     error: (err: any) => {

    //     }
    //   })
    // }
  }
}

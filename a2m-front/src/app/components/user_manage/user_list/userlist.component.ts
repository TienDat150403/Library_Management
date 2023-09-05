import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { LoaderService } from 'app/_service/comm/loader.service';
import { ToastrService } from 'ngx-toastr';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { AuthConstant } from 'app/_constant/auth.constant';
import { Sys0101Service } from 'app/_service/sys/sys0101.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'app/_model/auth/user-info';
import { SearchService } from 'app/_service/user/serach.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {

  users: UserInfo[];
  usersActive: UserInfo[] = [];
  userDisable: UserInfo[] = [];
  userTemp: UserInfo[] = []
  statusShow: String = '0'
  numbersArray: Number[] = [];
  pageCurrent: number = 1;
  previewImage: any;
  file: File;
  totalPhieuMuon: any;
  username: string;

  status: string = ''

  constructor(
    private searchService: SearchService,
  ) {
  }
  ngOnInit(): void {
    this.status = String(localStorage.getItem('status')) || '';
    this.searchService.dataEmitter.subscribe((value) => {
      this.status = value;
    })
  }

  onChangeStatus(status: string): void {
    this.status = status;
    localStorage.setItem('status', String(status));
  }

}

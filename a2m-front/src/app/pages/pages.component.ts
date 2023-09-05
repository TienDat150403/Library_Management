import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { CommonConstant } from '../_constant/common.constants';
import { AuthConstant } from '../_constant/auth.constant';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      let accessToken = params['access_token'];
      if (accessToken != undefined && accessToken != "") {
        Cookie.set(AuthConstant.ACCESS_TOKEN_KEY, accessToken, AuthConstant.TOKEN_EXPIRE, "/")
      }
    });
  }

  ngOnInit(): void {

  }

}

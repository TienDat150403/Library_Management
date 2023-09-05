import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { SearchService } from 'app/_service/user/serach.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
declare var window: any;

@Component({
  selector: 'app-phieumuon',
  templateUrl: './phieumuon.component.html',
  styleUrls: ['./phieumuon.component.css']
})
export class PhieumuonComponent implements OnInit {
  status: number;

  constructor(private searchService: SearchService,

  ) { }

  ngOnInit(): void {
    this.status = Number(localStorage.getItem('status')) || 0;
    this.searchService.statusOfPhieuMuonEmitter.subscribe((value) => {
      this.status = value;
    })

  }

  onChangeStatus(status: number): void {
    this.status = status;
    localStorage.setItem('status', String(status));
  }

}
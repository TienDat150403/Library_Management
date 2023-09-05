import { User0203Service } from './../../_service/user/phieumuon/user0203.service';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { CommonConstant } from 'app/_constant/common.constants';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { Book } from 'app/_model/user/book.model';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import { SearchService } from 'app/_service/user/serach.service';
import Swal from 'sweetalert2';
declare var window: any;

@Component({
  selector: 'app-quanliphieumuon-user',
  templateUrl: './quanliphieumuon-user.component.html',
  styleUrls: ['./quanliphieumuon-user.component.css']
})
export class QuanliphieumuonUserComponent implements OnInit {
  status: number;
  constructor(private user0202Service: User0202Service,
    private searchService: SearchService) {
  }
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

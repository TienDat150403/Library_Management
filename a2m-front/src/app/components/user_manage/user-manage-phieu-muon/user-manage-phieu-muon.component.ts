import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'app/_service/user/serach.service';

@Component({
  selector: 'app-user-manage-phieu-muon',
  templateUrl: './user-manage-phieu-muon.component.html',
  styleUrls: ['./user-manage-phieu-muon.component.css']
})
export class UserManagePhieuMuonComponent implements OnInit {
  status: number;
  constructor(private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.status = Number(localStorage.getItem('status')) || 0;
    this.searchService.statusOfPhieuMuonEmitter.subscribe(value => {
      this.status = value
    })
  }

  onChangeStatus(status: number): void {
    this.status = status;
    localStorage.setItem('status', String(status));
  }

}

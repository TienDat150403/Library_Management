import { Component, OnInit } from '@angular/core';
import { SseService } from 'app/_service/user/sse.service';
import { User0104Service } from 'app/_service/user/user0104.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(

  ) { }


  ngOnInit(): void {

  }

}

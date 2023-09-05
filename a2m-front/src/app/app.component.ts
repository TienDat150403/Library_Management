import { Component, OnInit } from '@angular/core';
import { User0104Service } from './_service/user/user0104.service';
import { SseService } from './_service/user/sse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'a2m-front';
  notification: any;

  constructor(
    // private user0104Service: User0104Service,
    // private sse: SseService,
    // public toast: ToastrService,
  ) { }


  ngOnInit(): void {
    // this.sse.connect()
    // this.sse.getNotification().subscribe(notification => {
    //   console.log("UserComponent call sse")
    //   this.notification = notification;
    //   console.log(this.notification)
    //   this.showToast()
    //   // this.toast.info(this.notification)
    //   // console.log(this.notification)
    //   // this.user0104Service.getNotificationOfUser().subscribe(data => {
    //   // })
    // });
  }
  // showToast() {
  //   this.toast.info(this.notification);
  //   setTimeout(() => {
  //     this.toast.clear();
  //   }, 30000);
  // }

}

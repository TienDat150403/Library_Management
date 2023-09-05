import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User0104Service } from './user0104.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  private events: EventSource;
  private notification: any;
  private notificationSubject: Subject<any> = new Subject<any>();

  dataUser = new BehaviorSubject<any>({});
  currentDataUser = this.dataUser.asObservable();

  changeUserData(data: any) {
    this.dataUser.next(data);
  }

  constructor(
    private user0104Service: User0104Service,
    public toast: ToastrService,
  ) {

  }

  connect(userUid?: string) {
    if (userUid === undefined) {
      return;
    }
    // console.log(this.toast)
    this.events = new EventSource(environment.backApiUrl + `/public/subscribe/${userUid}`);

    // console.log(123)
    // console.log(this.toast)
    // this.toast.info("ok")
    this.events.onmessage = (event) => {
      // console.log(event);
      this.notification = event.data;
      console.log(this.notification)
      this.toast.info(this.notification, 'Thông báo', { onActivateTick: true });

    }

    this.events.onerror = (e) => {
      console.log('connection error');
      console.log(e);
      this.events.close();
    }
  };


  getNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }

  disconnect() {
    if (this.events) {
      this.events.close();
    }
  }

  // showToast() {
  //   this.toast.info(this.notification);
  //   setTimeout(() => {
  //     this.toast.clear();
  //   }, 30000);
  // }
}
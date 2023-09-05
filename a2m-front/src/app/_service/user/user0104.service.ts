import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonConstant } from "app/_constant/common.constants";
import { DataResponse } from "app/_model/resp/data-response";
import { Book } from "app/_model/user/book.model";
import { Notifications } from "app/_model/user/notifications.model";
import { WaitList } from "app/_model/user/waitlist.model";
import { HeadersUtil } from "app/_util/headers-util";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable, map } from "rxjs";


@Injectable({
  providedIn: "root"
})
//notification
export class User0104Service {

  private notiSubject = new BehaviorSubject<Notifications[]>([]);
  private quantiyNotiSubject = new BehaviorSubject<Number>(0);
  private quantiyUnReadNotiSubject = new BehaviorSubject<Number>(0);


  constructor(private http: HttpClient) {

  }

  getNotification() {
    return this.notiSubject.asObservable()
  }

  getQuantityNotis() {
    return this.quantiyNotiSubject.asObservable();
  }

  getUnreadQuantityNotis() {
    return this.quantiyUnReadNotiSubject.asObservable();
  }

  getNotificationOfUser(page: number): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/user/notification/get?page=' + page;
    // return this.http.get<DataResponse>(url, { headers: headers });
    return this.http.get<DataResponse>(url, { headers: headers }).pipe(
      map(data => {
        if (data.status === CommonConstant.RESULT_OK) {
          this.notiSubject.next(data.listResponseData as Notifications[]); // Cập nhật danh sách sản phẩm
        }
        //   return data; // Trả về kết quả từ server
      })
    );
  }

  countTotalNoti(): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    // const url = environment.backApiUrl + '/public/getBookTitle';
    const url = environment.backApiUrl + '/user/notification/count';
    return this.http.get<DataResponse>(url, { headers: headers }).pipe(
      map(data => {
        if (data.status === CommonConstant.RESULT_OK) {
          this.quantiyNotiSubject.next(Number(data.responseData))
        }
      })
    );
  }

  countTotalNotiUnread(): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    // const url = environment.backApiUrl + '/public/getBookTitle';
    const url = environment.backApiUrl + '/user/notification/countUnread';
    return this.http.get<DataResponse>(url, { headers: headers }).pipe(
      map(data => {
        if (data.status === CommonConstant.RESULT_OK) {
          this.quantiyUnReadNotiSubject.next(Number(data.responseData))
        }
      })
    );
  }

  updateIsRead(listNotification: string[]): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/user/notification/update';
    return this.http.put<DataResponse>(url, listNotification, { headers: headers }).pipe(
      map(data => {
        if (data.status === CommonConstant.RESULT_OK) {
          this.countTotalNotiUnread().subscribe(data => {

          })
          const currentNoti = this.notiSubject.getValue();
          // const numberCurrentNotiUnred = this.quantiyUnReadNotiSubject.getValue()
          // const updatenumberCurrentNotiUnred = Number(numberCurrentNotiUnred) - listNotification.length
          // this.quantiyUnReadNotiSubject.next(Number(updatenumberCurrentNotiUnred))
          const updatedNotifications = currentNoti.map(notification => {
            if (notification.notification_id !== undefined && listNotification.includes(notification.notification_id)) {
              // Cập nhật thuộc tính isRead cho notification
              const updatedNotification = { ...notification, isRead: true };
              return updatedNotification;
            }
            return notification;
          });
          this.notiSubject.next(updatedNotifications);
        }
        return data; // Trả về kết quả từ server
      })
    );
  }
}
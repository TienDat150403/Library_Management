import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from "ng2-cookies";
import { Observable } from 'rxjs';
import { AuthConstant } from 'app/_constant/auth.constant';
import { DataResponse } from 'app/_model/resp/data-response';
import { HeadersUtil } from 'app/_util/headers-util';
import { environment } from 'environments/environment';
import { UserInfo } from 'app/_model/auth/user-info';

@Injectable({
  providedIn: 'root'
})
export class Sys0101Service {

  constructor(
    private http: HttpClient
  ) { }


  getListUser(status: string, page: number): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0101/listUserInfo/${status}?page=` + page;
    return this.http.get<DataResponse>(url, { headers: headers })
  }
  //   const url = environment.backApiUrl + `/admin/sys0301/phieumuon/${status}`;

  getUserByUserUid(userUid: String): Observable<UserInfo> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0101/userInfo/${userUid}`;
    return this.http.get<DataResponse>(url, { headers: headers })
  }

  getCountUser(): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0101/count`;
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getListUserByUserid(userId: string): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0101/searchByUserId/${userId}`;
    return this.http.get<DataResponse>(url, { headers: headers })
  }
}
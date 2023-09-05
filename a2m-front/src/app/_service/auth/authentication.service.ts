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
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  logIn() {
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY)
    // let doamin = window.location.origin;
    let doamin = window.location.href
    window.location.href = environment.authApiUrl + "/auth/login?redirectUri=" + doamin || ""
  }

  singup() {
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY)
    let domain = window.location.origin;
    window.location.href = environment.authApiUrl + "/auth/sign-up?redirectUri=" + domain || ""
  }


  logOut(isCallApi?: boolean) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/user/logout';

    // if (isCallApi) {
    //   this.http.get<DataResponse>(url, { headers: headers }).subscribe({
    //     next: (resp: DataResponse) => {

    //     },
    //     error: (err: any) => {

    //     }
    //   })
    // }
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY)
    let domain = window.location.origin;
    // let domain = window.location.href;
    window.location.href = environment.authApiUrl + "/auth/login?actionType=logout&redirectUri=" + domain || "";
  }



  checkAuthen(): boolean {
    if (!Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.logIn();
      return false;
    }
    return true;
  }

  getUserInfo(): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/user/getUserInfo';
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getRoles(): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/user/getRoles';
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  updateUserInfo(userInfo: UserInfo): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/user/updateUserInfo';
    return this.http.post<DataResponse>(url, userInfo, { headers: headers });
  }

  disableUser(userUid: string): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0101/disable?userUid=` + userUid;
    return this.http.put<DataResponse>(url, '', { headers: headers });
  }

  addUserCover(formData: FormData): Observable<any> {
    const apiUrl = environment.backApiUrl + `/user/cover/add`
    const headers: HttpHeaders = HeadersUtil.getHeadersAuthCover();
    return this.http.post(`${apiUrl}`, formData, { headers });
  }

  getUserCover(fileName: string): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/user/cover/${fileName}`;
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getCountUser(status: string): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/user/count/${status}`;
    return this.http.get<DataResponse>(url, { headers: headers });
  }

}

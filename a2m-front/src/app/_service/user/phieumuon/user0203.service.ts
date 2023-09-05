import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from 'app/_model/resp/data-response';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { HeadersUtil } from 'app/_util/headers-util';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class User0203Service {

  constructor(private http: HttpClient) { }

  extendReturnDate(phieumuon: phieumuonDto) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/user/user0203/phieumuon/extend`;
    return this.http.post<DataResponse>(url, phieumuon, { headers: headers });
  }
}

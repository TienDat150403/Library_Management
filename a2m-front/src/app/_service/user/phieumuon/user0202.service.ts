import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from 'app/_model/resp/data-response';
import { HeadersUtil } from 'app/_util/headers-util';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User0202Service {

  constructor(private http: HttpClient) { }

  getPhieuByStatus(status: number) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/user/user0202/phieumuon/list/${status}`;
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getListPhieuMuonLimit(status: number, page: Number): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/user/user0202/phieumuon/list-pagination/${status}?page=` + page;
    return this.http.get<DataResponse>(url, { headers: headers })
  }

  cancelPhieuDanhChoXacNhan(idPhieuMuon: String) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/user/user0202/phieumuon/cancel/${idPhieuMuon}`;
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getDetailPhieuMuon(idPhieuMuon: number) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/user/user0202/phieumuon/chi-tiet?id=` + idPhieuMuon;
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getCountPhieuByUserUidAndStatus(status: number) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/user/user0202/count/${status}`;
    return this.http.get<DataResponse>(url, { headers: headers });
  }
}

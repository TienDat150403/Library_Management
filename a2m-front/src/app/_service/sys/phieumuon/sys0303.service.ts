import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from 'app/_model/resp/data-response';
import { HeadersUtil } from 'app/_util/headers-util';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Sys0303Service {
  constructor(private http: HttpClient) { }

  getDetailPhieuMuon(idPhieuMuon: number) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0303/phieumuon/chi-tiet?id=` + idPhieuMuon;
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getFine(idPhieuMuon: number, listIdSachTra: string[]) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0303/phieumuon/tien-phat?id=` + idPhieuMuon;
    return this.http.post<DataResponse>(url, listIdSachTra, { headers: headers });
  }

  changeStatusToReturnBook(idPhieuMuon: number, listIdSachMat: String[]) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0303/phieumuon/tra-sach?id=` + idPhieuMuon;
    return this.http.put<DataResponse>(url, listIdSachMat, { headers: headers });
  }

}



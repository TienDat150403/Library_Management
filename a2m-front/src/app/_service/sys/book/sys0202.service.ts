import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonConstant } from "app/_constant/common.constants";
import { DataResponse } from "app/_model/resp/data-response";
import { GenreBook } from "app/_model/sys/book/genreBook.model";
import { HeadersUtil } from "app/_util/headers-util";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
  providedIn: "root"
})
//genreBook
export class Sys0202Service {

  private genreSubject = new BehaviorSubject<GenreBook[]>([]);
  private totalGenreSubject = new BehaviorSubject<Number>(0);

  constructor(private http: HttpClient) {

  }

  getGenreBooks() {
    return this.genreSubject.asObservable();
  }

  getQuantityGenreBooks() {
    return this.totalGenreSubject.asObservable();
  }

  getListCateBook(): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/admin/sys0202/genreBook';
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getListCateBookLimit(page: Number, name: string): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/admin/sys0202/genreBook';
    // return this.http.get<DataResponse>(url, { headers: headers });
    const params = new HttpParams().set('page', page.valueOf()).set('status', status).set('name', name);

    return this.http.get<DataResponse>(url, { headers: headers, params: params }).pipe(
      map(data => {
        if (data.status === CommonConstant.RESULT_OK) {
          this.genreSubject.next(data.listResponseData as GenreBook[]); // Cập nhật danh sách sản phẩm
        }
        //   return data; // Trả về kết quả từ server
      })
    );
  }

  addGenreBook(genreBook: GenreBook): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/admin/sys0202/insert';
    // return this.http.post<DataResponse>(url, genreBook, { headers: headers });
    return this.http.post<DataResponse>(url, genreBook, { headers: headers }).pipe(
      map(data => {
        if (data.status === CommonConstant.RESULT_OK) {
          // const currentBooks = this.genreSubject.getValue(); // Lấy danh sách sản phẩm hiện tại
          // currentBooks.pop()
          // currentBooks.unshift(genreBook)
          // const updatedBooks = [...currentBooks, genreBook]; // Thêm sản phẩm mới vào danh sách
          // this.genreSubject.next(updatedBooks); // Cập nhật danh sách mới
          // this.genreSubject.next(currentBooks)
          const totalCurrent = this.totalGenreSubject.getValue();
          this.totalGenreSubject.next(totalCurrent.valueOf() + 1);
          // if (genreBook.status) {
          //   this.getListCateBookLimit(1, "").subscribe(data => {

          //   })
          // }

        }
        return data;
      })

    );
  }

  getAllGenres(): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/public/getGenreList`;
    return this.http.get<DataResponse>(url);
  }
  updateGenreBook(genreBook: GenreBook): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + '/admin/sys0202/update';
    // return this.http.put<DataResponse>(url, genreBook, { headers: headers });
    return this.http.put<DataResponse>(url, genreBook, { headers: headers }).pipe(
      map(data => {
        if (data.status === CommonConstant.RESULT_OK) {
          const currentBooks = this.genreSubject.getValue();
          const updatedBooks = currentBooks.map(gb => {
            if (gb.genre_id === genreBook.genre_id) {
              // Cập nhật genreBook cho cuốn sách cần được cập nhật
              return { ...gb, genreBook: genreBook };
            }
            return gb;
          });

          // if (genreBook.status) {
          //   this.getListCateBookLimit(1, "").subscribe(data => {

          //   })
          // }
        }
        return data; // Trả về kết quả từ server
      })
    );
  }

  countTotalGenreBook(name: string): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    // const url = environment.backApiUrl + '/public/getBookTitle';
    const url = environment.backApiUrl + '/admin/sys0202/countTotalGenreBook';
    const params = new HttpParams().set('status', status).set('name', name);

    return this.http.get<DataResponse>(url, { headers: headers, params: params }).pipe(
      map(data => {
        if (data.status === CommonConstant.RESULT_OK) {
          this.totalGenreSubject.next(Number(data.responseData))
        }
      })
    );
  }
}
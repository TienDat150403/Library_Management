import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "environments/environment";
import { DauSach } from 'app/_model/sys/book/book.model';
import { HeadersUtil } from 'app/_util/headers-util';
import { DataResponse } from 'app/_model/resp/data-response';
import { Book } from 'app/_model/user/book.model';
import { CommonConstant } from 'app/_constant/common.constants';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DauSachService {

    private totalBookSubject = new BehaviorSubject<Number>(0);
    private bookSubject = new BehaviorSubject<Book[]>([]);


    constructor(private http: HttpClient) { }
    apiMessange: any;
    postData(dausach: Book, quantity: number): Observable<any> {
        // console.log("Starting add");
        const apiUrl = `http://localhost:8096/api/admin/sys0201/add?quantity=${quantity}`;
        // console.log(accessToken);
        // console.log(quantity);
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const jsonData = JSON.stringify(dausach);
        return this.http.post(`${apiUrl}`, jsonData, { headers });
    }
    getData(): Observable<any> {
        const apiUrl = environment.backApiUrl + '/admin/sys0201/get'
        // console.log("Fetching");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }

    getBookDetail(bookCode: string): Observable<any> {
        const apiUrl = environment.backApiUrl + `/admin/sys0201/get/${bookCode}`
        // console.log("Fetching book detail");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }

    changeStatus(status: any, bookId: string): Observable<any> {
        // console.log("Starting to change status");
        const apiUrl = environment.backApiUrl + `/admin/sys0203/status/${bookId}?status=${status}`;
        // console.log(accessToken);
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.put(`${apiUrl}`, '', { headers });
    }

    changeBookTitleStatus(bookCode: string, status: any): Observable<any> {
        // console.log("Starting to change status");
        const apiUrl = environment.backApiUrl + `/admin/sys0201/status/${bookCode}?status=${status}`;
        // console.log(accessToken);
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.put(`${apiUrl}`, '', { headers });
    }

    updateBookTitle(dausach: Book): Observable<any> {
        // console.log("Starting to update book title");
        const apiUrl = environment.backApiUrl + `/admin/sys0201/update`;
        // console.log(accessToken);
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.put(`${apiUrl}`, dausach, { headers });
    }

    getBookData(bookCode: string): Observable<any> {
        const apiUrl = environment.backApiUrl + `/user/user0201/get/${bookCode}`
        // console.log("Fetching");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }

    addBook(bookCode: string, quantity: number): Observable<any> {
        const apiUrl = environment.backApiUrl + `/admin/sys0203/add/${bookCode}?quantity=${quantity}`
        // console.log("Adding books");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.post(`${apiUrl}`, '', { headers });
    }

    getBookTitle(page: Number, title: string, category: number, author: string,
        listSearchCategory: number[], listSearchAuthor: string[], categoryByName: string): Observable<any> {
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const url = environment.backApiUrl + '/public/getBookTitle';
        const url = environment.backApiUrl + '/public/getBookTitle?page=' + page;
        let params = new HttpParams().set('search', title.valueOf())
            .set('page', page.toString())
            .set('category', category)
            .set('categoryByName', categoryByName)
            .set('author', author);

        listSearchCategory.forEach((item) => {
            params = params.append('listCategory', item);
        });

        listSearchAuthor.forEach((item) => {
            params = params.append('listAuthor', item);
        });

        // let listSearchAuhorNew: string[] = []

        // Object.keys(listSearchAuthor.value).forEach((author) => {
        //     if (listSearchAuthor.value[author] === true) {
        //         listSearchAuhorNew.push(author);
        //     }
        // });


        // listSearchAuhorNew.forEach((item) => {
        //     params = params.append('listAuthor', item);
        // });


        return this.http.get<DataResponse>(url, { headers: headers, params: params }).pipe(
            map(data => {
                if (data.status === CommonConstant.RESULT_OK) {
                    this.bookSubject.next(data.listResponseData)
                }
            })
        );
    }
    //không cần token lấy cho home

    getBookTitleDetail(bookCode: String): Observable<any> {
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const url = environment.backApiUrl + `/public/get/${bookCode}`;
        // const apiUrl = environment.backApiUrl + `/public/get/${bookCode}`
        // return this.http.get<DataResponse>(url);
        return this.http.get(url, { headers });


    }

    // getBookBySearch(input: string, page: Number): Observable<any> {
    //     const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    //     // const url = environment.backApiUrl + '/public/getBookTitle';
    //     const url = environment.backApiUrl + '/public/getBookTitleSearch';
    //     const params = new HttpParams().set('search', input.valueOf()).set('page', page.toString());
    //     return this.http.get<DataResponse>(url, { headers: headers, params: params }).pipe(
    //         map(data => {
    //             if (data.status === CommonConstant.RESULT_OK) {
    //                 this.bookSubject.next(data.listResponseData)
    //             }
    //         })
    //     )
    // }

    getBookAvailable(bookCode: string): Observable<any> {
        const apiUrl = environment.backApiUrl + `/user/user0201/available/${bookCode}`
        // console.log("Getting book available");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }

    getBooksByBookCode(bookCode: string): Observable<any> {
        const apiUrl = environment.backApiUrl + `/admin/sys0203/get/${bookCode}`
        // console.log("Getting book by bookCode");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }

    getBookTitleByGenre(genre_id: number, page: number): Observable<any> {
        const apiUrl = environment.backApiUrl + `/public/get/genre/${genre_id}`
        // console.log("Getting book by genre");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const params = new HttpParams().set('page', page);
        return this.http.get(`${apiUrl}`, { headers: headers, params: params });
    }

    countTotalBookTitle(title: string, category: number, listAuthor: string[], author: string, categoryByName: string): Observable<any> {
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const url = environment.backApiUrl + '/public/getBookTitle';
        const url = environment.backApiUrl + '/public/countTotalBookTitle';
        let params = new HttpParams().set('search', title.valueOf())
            .set('category', category)
            .set('categoryByName', categoryByName)
            .set('author', author);
        // let listSearchAuhorNew: string[] = []

        // Object.keys(author.value).forEach((a) => {
        //     if (author.value[a] === true) {
        //         listSearchAuhorNew.push(a);
        //     }
        // });


        listAuthor.forEach((item) => {
            params = params.append('listAuthor', item);
        });

        return this.http.get<DataResponse>(url, { headers: headers, params: params }).pipe(
            map(data => {
                if (data.status === CommonConstant.RESULT_OK) {
                    this.totalBookSubject.next(Number(data.responseData))
                }
            })
        );
    }

    getQuantityBooks() {
        return this.totalBookSubject.asObservable();
    }
    getBooks() {
        return this.bookSubject.asObservable();
    }

    addCover(formData: FormData): Observable<any> {
        const apiUrl = environment.backApiUrl + `/admin/sys0201/add/cover`
        // console.log("Adding book cover");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuthCover();
        return this.http.post(`${apiUrl}`, formData, { headers });
    }

    getCover(fileName: string): Observable<any> {
        const apiUrl = environment.backApiUrl + `/public/get/cover/${fileName}`
        // console.log("Getting book cover");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuthCover();
        return this.http.get(`${apiUrl}`);
    }
    

    getAuthorToFilter(): Observable<any> {
        const apiUrl = environment.backApiUrl + `/public/get/author`
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }
}


import { User0101Service } from 'app/_service/user/user0101.service';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { AuthConstant } from 'app/_constant/auth.constant';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { DauSach } from 'app/_model/sys/book/book.model';
import Swal from 'sweetalert2'
import { Book } from 'app/_model/user/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { User0201Service } from 'app/_service/user/phieumuon/user0201.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { forkJoin } from 'rxjs';
import _ from 'lodash';

@Component({
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    formattedDate: string;
    bookCodeList: string[] = [];
    bookList: DauSach[] = [];
    bookListUnavailable: DauSach[] = [];
    imageList: string[] = [];
    imageListUn: string[] = [];
    agreed: boolean = false;
    phieumuon: phieumuonDto;
    route: ActivatedRoute | null | undefined;
    min = new Date().toISOString().split('T')[0];
    borrowedDate: Date = new Date(new Date().setDate(new Date().getDate() + 3));;
    max;

    @ViewChild('borrowedDateInput', { static: true }) borrowedDateInput: ElementRef;

    ngAfterViewInit() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        this.formattedDate = `${yyyy}-${mm}-${dd}`;
    }

    constructor(
        private authen: AuthenticationService,
        private loading: LoaderService,
        private dauSachService: DauSachService,
        private user0201Service: User0201Service,
        private user0101Service: User0101Service,
        private router: Router,
    ) { }


    ngOnInit(): void {
        if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
            this.loading.change(true)
            const historyState = history.state;
            console.log(historyState.data);
            const maxDate = new Date();
            maxDate.setTime(maxDate.getTime() + 14 * 24 * 60 * 60 * 1000);
            this.max = maxDate.toISOString().split('T')[0];
            if (historyState && historyState.data) {
                this.bookCodeList = historyState.data;
            }
            if (this.bookCodeList.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hiện không có sách nào có thể mượn. Vui lòng chọn sách cần mượn ở màn hình chính',
                }).then(() => {
                    this.router.navigate(['/user/cart/'])
                });
            }
            error: (err: any) => {
                this.loading.change(false)
            }
            this.getList();
        }
    }

    onSubmit() {
        if (this.agreed === true) {
            var tmp: DauSach[] = [];
            for (let item of this.bookList) tmp.push(item);
            this.bookList = [];
            this.bookListUnavailable = [];
            const imgSubscribeList: any[] = [];
            const imgSubscribeList2: any[] = [];
            this.imageList = [];
            this.imageListUn = [];
            console.log(this.bookList);
            let subscribeList: any[] = [];
            for (let i = 0; i < this.bookCodeList.length; i++) {
                subscribeList.push(this.dauSachService.getBookAvailable(this.bookCodeList[i]));
            }
            forkJoin(subscribeList).subscribe((responseArray) => {
                console.log(responseArray);
                const sachList: any[] = [];
                const sachList2: any[] = [];
                for (let i = 0; i < responseArray.length; i++) {
                    if (responseArray[i].responseData) {
                        sachList.push(this.dauSachService.getBookTitleDetail(this.bookCodeList[i]));
                    }
                    else {
                        sachList2.push(this.dauSachService.getBookTitleDetail(this.bookCodeList[i]));
                    }
                }
                if (sachList.length === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: 'Tất cả sách bạn chọn hiện đã tạm hết!',
                    });
                    forkJoin(sachList2).subscribe(
                        (response) => {
                            for (let item of response) this.bookListUnavailable.push(item.responseData);
                        }
                    );
                }
                else forkJoin(sachList)
                    .pipe(
                        map((response) => {
                            console.log(response);
                            console.log(tmp);
                            const listTmp: DauSach[] = [];
                            for (let i = 0; i < response.length; i++) {
                                listTmp.push(response[i].responseData);
                            }
                            console.log(listTmp);
                            console.log(_.isEqual(tmp, listTmp));
                            if (_.isEqual(tmp, listTmp)) {
                                this.phieumuon = {
                                    createdDate: new Date(),
                                    borrowDate: new Date(),
                                    status: 0,
                                    extended_times: 0,
                                    listBook: listTmp,
                                    fine: 0
                                };
                                console.log(this.phieumuon.listBook);
                                if (this.borrowedDate) this.phieumuon.borrowDate = this.borrowedDate;
                                else this.phieumuon.borrowDate?.setDate(this.phieumuon.borrowDate.getDate() + 3);
                                this.user0201Service.addPhieuMuon(listTmp, this.phieumuon).subscribe(
                                    (response) => {
                                        console.log('Response:', response);
                                        if (response.status == CommonConstant.RESULT_WN) {
                                            this.authen.logIn();
                                        }
                                        if (response.status === CommonConstant.RESULT_OK) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Thành công',
                                                text: 'Mượn sách thành công',
                                            }).then(() => {
                                                for (let item of listTmp) {
                                                    var book: Book = new Book();
                                                    book.bookCode = item.bookCode;
                                                    this.user0101Service.delete(book).subscribe(
                                                        (response) => {
                                                            if (response.status === CommonConstant.RESULT_NG) {
                                                                console.log(response);
                                                            }
                                                        }
                                                    )
                                                }
                                                this.router.navigate(['/user/phieumuon/status/0']).then(() => {

                                                });
                                            });
                                        }
                                        else if (response.status === CommonConstant.RESULT_NG) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: response.message,
                                            });
                                        }
                                    },
                                    (error) => {
                                        console.error('Error:', error);
                                    }
                                );
                            }
                            else {
                                listTmp.forEach(val => this.bookList.push(Object.assign({}, val)));
                                for (let item of this.bookList) {
                                    if (item.img != null) {
                                        imgSubscribeList.push(this.dauSachService.getCover(item.img!));
                                    }
                                    else {
                                        imgSubscribeList.push(this.dauSachService.getCover("no-image.png"));
                                    }
                                }
                                forkJoin(imgSubscribeList).pipe(
                                    map((respArr) => {
                                        // console.log(respArr);
                                        for (let item of respArr) {
                                            this.imageList.push('data:image/jpeg;base64,' + item.responseData);
                                        }

                                        // console.log(this.imageList)
                                    })
                                ).subscribe();
                                forkJoin(sachList2).pipe(
                                    map((response) => {
                                        response.forEach(val => this.bookListUnavailable.push(Object.assign({}, val.responseData)));
                                        // console.log(this.bookListUnavailable);
                                        for (let item of this.bookListUnavailable) {
                                            if (item.img != null) {
                                                imgSubscribeList2.push(this.dauSachService.getCover(item.img!));
                                            }
                                            else {
                                                imgSubscribeList2.push(this.dauSachService.getCover("no-image.png"));
                                            }
                                        }
                                        forkJoin(imgSubscribeList2).pipe(
                                            map((respArr) => {
                                                // console.log(respArr);
                                                for (let item of respArr) {
                                                    this.imageListUn.push('data:image/jpeg;base64,' + item.responseData);
                                                }
                                                // console.log(this.imageArray)
                                            })
                                        ).subscribe();
                                    }
                                    )
                                ).subscribe();
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Oops...',
                                    text: 'Danh sách sách đã cập nhật, vui lòng kiểm tra lại',
                                });
                            }
                        })
                    )
                    .subscribe();
            }
            );
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bạn cần đồng ý với điều khoản!',
            });
        }
    }

    getList() {
        const imgSubscribeList: any[] = [];
        const imgSubscribeList2: any[] = [];
        const subscribeList: any[] = [];
        for (let i = 0; i < this.bookCodeList.length; i++) {
            subscribeList.push(this.dauSachService.getBookAvailable(this.bookCodeList[i]));
        }
        forkJoin(subscribeList).subscribe((responseArray) => {
            console.log(responseArray);
            const sachList: any[] = [];
            const sachList2: any[] = [];
            for (let i = 0; i < responseArray.length; i++) {
                if (responseArray[i].responseData) {
                    sachList.push(this.dauSachService.getBookTitleDetail(this.bookCodeList[i]));
                }
                else {
                    sachList2.push(this.dauSachService.getBookTitleDetail(this.bookCodeList[i]));
                }
            }
            if (sachList.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    text: 'Tất cả sách bạn chọn hiện đã tạm hết!',
                });
            }
            else {
                forkJoin(sachList).pipe(
                    map((response) => {
                        for (let item of response) this.bookList.push(item.responseData);
                        for (let item of this.bookList) {
                            if (item.img != null) {
                                imgSubscribeList.push(this.dauSachService.getCover(item.img!));
                            }
                            else {
                                imgSubscribeList.push(this.dauSachService.getCover("no-image.png"));
                            }
                        }
                        forkJoin(imgSubscribeList).pipe(
                            map((respArr) => {
                                // console.log(respArr);
                                for (let item of respArr) {
                                    this.imageList.push('data:image/jpeg;base64,' + item.responseData);
                                }

                                // console.log(this.imageList)
                            })
                        ).subscribe()
                    })
                ).subscribe()
            }
            forkJoin(sachList2).subscribe(
                (response) => {
                    for (let item of response) this.bookListUnavailable.push(item.responseData);
                    for (let item of this.bookListUnavailable) {
                        if (item.img != null) {
                            imgSubscribeList2.push(this.dauSachService.getCover(item.img!));
                        }
                        else {
                            imgSubscribeList2.push(this.dauSachService.getCover("no-image.png"));
                        }
                    }
                    forkJoin(imgSubscribeList2).pipe(
                        map((respArr) => {
                            // console.log(respArr);
                            for (let item of respArr) {
                                this.imageListUn.push('data:image/jpeg;base64,' + item.responseData);
                            }
                            // console.log(this.imageArray)
                        })
                    ).subscribe()
                }
            )
        })
    }
}
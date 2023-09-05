import { Book } from 'app/_model/user/book.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'app/_service/services/cart.service';
import { CartModelServer } from 'app/_model/models/cart.model';
import { BehaviorSubject, Subscription, forkJoin, map } from 'rxjs';
import { ProductModelServer } from 'app/_model/models/product.model';
import { style } from '@angular/animations';
import { User0101Service } from 'app/_service/user/user0101.service';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User0102Service } from 'app/_service/user/user0102.service';
import { CurrencySuffixPipe } from 'app/_pipe/format_currency.pipe';
import { User0201Service } from 'app/_service/user/phieumuon/user0201.service';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mg-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'],
  host: {
    'class': 'xyz' // Đặt tên class bạn muốn sử dụng
  },
  styles: [`
  .xyz {
    width: 100%;
  }
`]
})
export class WaitListComponent implements OnInit, OnDestroy {
  //   cartData: CartModelServer;
  waitListTotal: number;
  selectedBook: Book[] = [];
  bookInWaitList: Book[] = [];
  bookInWaitListActive: Book[] = [];
  bookInWaitListDisable: Book[] = [];
  subscriptions: Subscription[] = [];
  listImgActive: string[] = [];
  listImgDisable: string[] = [];

  constructor(
    private user0102Service: User0102Service,
    private router: Router,
    private activatedRout: ActivatedRoute,
    private dauSach: DauSachService,
    private authen: AuthenticationService,
    private toast: ToastrService,
    private user0202Service: User0202Service,
    private user0101Service: User0101Service,
    private user0201Service: User0201Service,
  ) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.getbook()
    this.selectedBook = [];
    //  this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    //  this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  getbook() {
    this.subscriptions.push(
      this.user0102Service.getListBookInWaitList().subscribe(data => {
        // Xử lý dữ liệu
      })
    )
    this.subscriptions.push(
      this.user0102Service.getBooks().subscribe(books => {
        this.bookInWaitList = [];
        this.bookInWaitListActive = [];
        this.bookInWaitListDisable = [];
        this.bookInWaitList = books;
        for (let b of this.bookInWaitList) {
          if (b.quantity == 0) {
            this.bookInWaitListDisable.push(b)
          }
          else {
            this.bookInWaitListActive.push(b)
          }
        }
        let subscribeList: any[] = [];
        let subscribeList2: any[] = [];
        for (let i = 0; i < this.bookInWaitListActive.length; i++) {
          if (this.bookInWaitListActive[i].img) {
            subscribeList.push(this.dauSach.getCover(this.bookInWaitListActive[i].img!));
          }
          else {
            subscribeList.push(this.dauSach.getCover("no-image.png"));
          }
        }
        forkJoin(subscribeList).pipe(
          map((respArr) => {
            // console.log(respArr);
            for (let item of respArr) {
              this.listImgActive.push('data:image/jpeg;base64,' + item.responseData);
            }
            // console.log(this.imageArray)
          })
        ).subscribe();

        for (let i = 0; i < this.bookInWaitListDisable.length; i++) {
          if (this.bookInWaitListDisable[i].img) {
            subscribeList.push(this.dauSach.getCover(this.bookInWaitListDisable[i].img!));
          }
          else {
            subscribeList.push(this.dauSach.getCover("no-image.png"));
          }
        }
        forkJoin(subscribeList).pipe(
          map((respArr) => {
            // console.log(respArr);
            for (let item of respArr) {
              this.listImgDisable.push('data:image/jpeg;base64,' + item.responseData);
            }
            // console.log(this.imageArray)
          })
        ).subscribe();

      })
    )
  }

  updateSelectedBook(book: Book) {
    if (book.checked) {
      this.selectedBook.push(book)
    }
    else {
      const index = this.selectedBook.indexOf(book);
      if (index > -1) {
        this.selectedBook.splice(index, 1);
      }
    }
    // console.log(this.selectedBook)
  }

  deleteFromWaitList(book: Book) {
    this.user0102Service.delete(book).subscribe(resp => {
      if (resp.status == CommonConstant.RESULT_OK) {
        this.toast.success(resp.message)
      }
      else {
        this.toast.error(resp.message)
      }
    });
  }

  borrowMany() {
    var exist = 0;
    // console.log(this.selectedBook)
    this.user0202Service.getPhieuByStatus(0).subscribe(
      (response) => {
        if (response.status == CommonConstant.RESULT_WN) {
          this.authen.logIn();
        }
      }
    )
    this.user0201Service.checkPhieuMuonExists().subscribe(
      (response) => {
        const phieumuonNumber = response.responseData;
        if (phieumuonNumber !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bạn còn phiếu mượn chưa trả! Vui lòng trả phiếu mượn trước khi mượn thêm sách',
          });
        }
        else {
          var bookCodeList: String[] = [];
          for (let item of this.selectedBook) {
            let id: string = item.bookCode!;
            bookCodeList.push(id);
          }
          // console.log(bookCodeList);
          this.router.navigate(['/user/checkout'], { state: { data: bookCodeList } });
        }
      }
    )
  }
  addBookToCart(bookTitle: Book) {
    this.user0101Service.insert(bookTitle).subscribe(resp => {
      if (resp.status == CommonConstant.RESULT_WN) {
        this.authen.logIn();
      }
      else if (resp.status == CommonConstant.RESULT_OK) {
        this.toast.success(resp.message)
      }
      else if (resp.status == CommonConstant.RESULT_NG) {
        this.toast.error(resp.message)
      }
    });
  }

  // selectAllBook() {
  //   if (!this.selectAll) {
  //     this.selectedBook = []
  //     this.selectedBook = this.bookInWaitListActive
  //   }
  //   if (this.selectAll) {
  //     this.selectedBook = []
  //   }
  //   this.selectAll = !this.selectAll
  //   this.bookInWaitListActiveCopy.forEach((item) => (item.checked = this.selectAll));
  //   this.bookInWaitListActiveCopy = [...this.bookInWaitListActive];

  //   console.log("selectAllBook" + this.bookInWaitListActiveCopy)
  // }
}

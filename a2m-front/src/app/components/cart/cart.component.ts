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
import { User0201Service } from 'app/_service/user/phieumuon/user0201.service';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import Swal from 'sweetalert2';
import { DauSachService } from 'app/_service/services/dausach.service';

@Component({
  selector: 'mg-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  // providers: [User0101Service],
  host: {
    'class': 'xyz' // Đặt tên class bạn muốn sử dụng
  },
  styles: [`
  .xyz {
    width: 100%;
  }
`]
})
export class CartComponent implements OnInit, OnDestroy {

  selectAll: boolean = false
  selectedBook: Book[] = [];
  bookInCart: Book[] = [];
  bookInCartActive: Book[] = [];
  imgActive: any[] = [];
  bookInCartDisable: Book[] = [];
  imgDisable: any[] = [];
  subscriptions: Subscription[] = [];
  bookInCartActiveCopy: Book[];


  constructor(
    private authen: AuthenticationService,
    private user0101Service: User0101Service,
    private toastr: ToastrService,
    private router: Router,
    private activatedRout: ActivatedRoute,
    private user0201Service: User0201Service,
    private user0202Service: User0202Service,
    private dauSach: DauSachService,
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    // this.bookInCartActiveCopy = [...this.bookInCartActive];
    // this.getListBookInCart()
    this.getBook()
    this.selectedBook = [];
  }

  getBook() {
    this.subscriptions.push(
      this.user0101Service.getListBookInCart().subscribe(data => {
        // Xử lý dữ liệu
      })
    )
    this.subscriptions.push(
      this.user0101Service.getBooks().subscribe(books => {
        this.bookInCart = [];
        this.bookInCartActive = [];
        this.bookInCartDisable = [];
        this.bookInCart = books;
        let subscribeList: any[] = [];
        let subscribeList2: any[] = [];
        this.imgActive = [];
        this.imgDisable = [];
        for (let b of this.bookInCart) {
          b.checked = false;
          if (b.quantity == 0) {
            this.bookInCartDisable.push(b);
            if (b.img) {
              subscribeList.push(this.dauSach.getCover(b.img!));
            }
            else {
              subscribeList.push(this.dauSach.getCover("no-image.png"));
            }
          }
          else {
            this.bookInCartActive.push(b);
            if (b.img) {
              subscribeList2.push(this.dauSach.getCover(b.img!));
            }
            else {
              subscribeList2.push(this.dauSach.getCover("no-image.png"));
            }
          }
        }
        this.subscriptions.push(
          forkJoin(subscribeList).pipe(
            map((respArr) => {
              // console.log(respArr);
              for (let item of respArr) {
                this.imgDisable.push('data:image/jpeg;base64,' + item.responseData);
              }
              // console.log(this.imageArray)
            })
          ).subscribe()
        )
        this.subscriptions.push(
          forkJoin(subscribeList2).pipe(
            map((respArr) => {
              // console.log(respArr);
              for (let item of respArr) {
                this.imgActive.push('data:image/jpeg;base64,' + item.responseData);
              }
              // console.log(this.imageArray)
            })
          ).subscribe()
        )
        // console.log(this.bookInCart);
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
    this.bookInCartActive = [...this.bookInCartActiveCopy];
    console.log(this.bookInCartActive)
  }

  deleteFromCart(book: Book, img: string) {

    this.user0101Service.delete(book).subscribe(resp => {
      if (resp.status == CommonConstant.RESULT_OK) {
        this.toastr.success("Xóa sản phẩm khỏi giỏ hàng thành công")
        const res = this.imgActive.filter(obj => obj !== img)
        this.imgActive = res;
        const res2 = this.imgDisable.filter(obj => obj !== img)
        this.imgDisable = res2;
        this.selectedBook = [];
      }
      else {
        this.toastr.error("Xóa sản phẩm khỏi giỏ hàng thất bại")
      }
    });
  }

  showBookDetail(book: Book) {
    this.router.navigate(['/home/book', book.bookCode]).then((navigationResult) => {
      if (navigationResult) {
        console.log('Điều hướng thành công');
      } else {
        console.log('Điều hướng thất bại');
      }
    });

  }

  selectAllBook() {
    if (!this.selectAll) {
      this.selectedBook = []
      this.selectedBook = this.bookInCartActive
    }
    if (this.selectAll) {
      this.selectedBook = []
    }
    this.selectAll = !this.selectAll
    this.bookInCartActiveCopy.forEach((item) => (item.checked = this.selectAll));
    this.bookInCartActiveCopy = [...this.bookInCartActive];

    console.log("selectAllBook" + this.bookInCartActiveCopy)
  }

  borrow() {
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
}

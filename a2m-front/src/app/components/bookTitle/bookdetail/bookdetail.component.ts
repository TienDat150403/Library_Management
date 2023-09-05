import { DauSach, Sach } from 'app/_model/sys/book/book.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ProductService } from 'app/_service/services/product.service';
import { ProductModelServer } from 'app/_model/models/product.model';
import { map } from "rxjs/operators";
import { CartService } from 'app/_service/services/cart.service';
import { Book } from 'app/_model/user/book.model';
import { DauSachService } from 'app/_service/services/dausach.service';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { User0101Service } from 'app/_service/user/user0101.service';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { User0102Service } from 'app/_service/user/user0102.service';
import { User0201Service } from 'app/_service/user/phieumuon/user0201.service';
import { SseService } from 'app/_service/user/sse.service';
import Swal from 'sweetalert2';
import { GenreBook } from 'app/_model/sys/book/genreBook.model';

declare let $: any;

@Component({
  selector: 'sys-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class SysBookDetailComponent implements AfterViewInit, OnInit {

  // id: number;
  product;
  bookTitle: Book
  thumbimages: any[] = [];
  id: string = '';
  quantity: number = 1;
  bookList: Sach[] = [];
  status: number = 1;
  imageSrc: any;
  bookActiveNumber: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private authen: AuthenticationService,
    private dauSach: DauSachService,
    private user0101Service: User0101Service,
    private user0102Service: User0102Service,
    private user0201Service: User0201Service,
    private toast: ToastrService,
    private sse: SseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.id = '' + this.activatedRoute.snapshot.paramMap.get('bookCode');
    this.dauSach.getBookTitleDetail(this.id).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK)
          this.bookTitle = resp.responseData;
        this.bookTitle.bookCode = this.id;
        if (this.bookTitle.img != null) {
          this.dauSach.getCover(this.bookTitle.img!).subscribe(
            (response) => {
              this.imageSrc = 'data:image/jpeg;base64,' + response.responseData;
            }
          );
        }
        else {
          this.dauSach.getCover("no-image.png").subscribe(
            (response) => {
              this.imageSrc = 'data:image/jpeg;base64,' + response.responseData;
            }
          );
        }
        // this.bookTitle.quantity = 0;
      },
      error: (err: any) => {

      }
    })
    this.dauSach.getBooksByBookCode(this.id).subscribe(
      (response) => {
        console.log(response.responseData);
        if (response.status === CommonConstant.RESULT_OK) {
          this.bookList = response.responseData;
          for (let item of this.bookList) {
            if (item.status === 1) this.bookActiveNumber++;
          }
        }
      }
    )

  }

  // getCoverImageUrl(imageName: string) {
  //   return this.dauSach.getCover(imageName).subscribe();
  // }

  ngAfterViewInit(): void {

    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  setStatus(status: number) {
    this.status = status;
  }

  handleMinus() {
    if (this.quantity > 0) this.quantity--;
  }
  handlePlus() {
    this.quantity++;
  }

  addBooks() {
    if (this.quantity > 0) this.dauSach.addBook(this.id, this.quantity).subscribe(
      (response) => {
        if (response.status === CommonConstant.RESULT_OK) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Thêm sách thành công',
          }).then(() => {
            window.location.reload();
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Có lỗi trong việc thêm sách',
          });
        }
      }
    )
  }

  enableBook(book: Sach) {
    Swal.fire({
      icon: 'info',
      title: 'Xác nhận',
      text: 'Bạn có muốn kích hoạt quyển sách này không?',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dauSach.changeStatus(1, book.bookId).subscribe(
            (response) => {
              if (response.status === CommonConstant.RESULT_OK) {
                Swal.fire({
                  icon: 'success',
                  title: 'Thành công',
                  text: 'Kích hoạt sách thành công',
                }).then(() => {
                  window.location.reload();
                });
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Có lỗi trong việc kích hoạt sách',
                });
              }
            }
          )
        }
      }
    );

  }

  disableBook(book: Sach) {
    Swal.fire({
      icon: 'info',
      title: 'Confirm',
      text: 'Bạn có muốn vô hiệu hóa quyển sách này không?',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dauSach.changeStatus(0, book.bookId).subscribe(
            (response) => {
              if (response.status === CommonConstant.RESULT_OK) {
                Swal.fire({
                  icon: 'success',
                  title: 'Thành công',
                  text: 'Vô hiệu hóa sách thành công',
                }).then(() => {
                  window.location.reload();
                });
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Có lỗi trong việc vô hiệu hóa sách',
                });
              }
            }
          )
        }
      }
    );
  }

  enableBookTitle(bookCode: any) {
    Swal.fire({
      icon: 'info',
      title: 'Xác nhận',
      text: 'Bạn có muốn kích hoạt đầu sách này không?',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dauSach.changeBookTitleStatus(bookCode, 1).subscribe(
            (response) => {
              if (response.status === CommonConstant.RESULT_OK) {
                Swal.fire({
                  icon: 'success',
                  title: 'Thành công',
                  text: 'Kích hoạt đầu sách thành công',
                }).then(() => {
                  window.location.reload();
                });
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Có lỗi trong việc kích hoạt sách',
                });
              }
            }
          )
        }
      }
    );

  }

  disableBookTitle(bookCode: any) {
    Swal.fire({
      icon: 'info',
      title: 'Xác nhận',
      text: 'Bạn có muốn vô hiệu hóa đầu sách này không?',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dauSach.changeBookTitleStatus(bookCode, 0).subscribe(
            (response) => {
              if (response.status === CommonConstant.RESULT_OK) {
                Swal.fire({
                  icon: 'success',
                  title: 'Thành công',
                  text: 'Vô hiệu hóa đầu sách thành công',
                }).then(() => {
                  window.location.reload();
                });
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Có lỗi trong việc vô hiệu hóa sách',
                });
              }
            }
          )
        }
      }
    );

  }
  genreNav(genre: GenreBook) {
    this.router.navigate(['/home'], { queryParams: { category: genre.genre_id, page: 1 } })
  }
}

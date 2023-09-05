import { User0202Service } from './../../_service/user/phieumuon/user0202.service';
import { DauSach } from 'app/_model/sys/book/book.model';
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
import { BookTitleComponent } from '../bookTitle/booktitlelist/booktitle.component';
import { User0101Service } from 'app/_service/user/user0101.service';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { User0102Service } from 'app/_service/user/user0102.service';
import { User0201Service } from 'app/_service/user/phieumuon/user0201.service';
import { SseService } from 'app/_service/user/sse.service';
import Swal from 'sweetalert2';
import { GenreBook } from 'app/_model/sys/book/genreBook.model';
import { DataService } from 'app/_service/comm/data.service';

declare let $: any;

@Component({
  selector: 'mg-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit, OnInit {

  // id: number;
  product;
  bookTitle: Book
  thumbimages: any[] = [];
  id: string = ''
  imageSrc: any;

  @ViewChild('quantity') quantityInput;

  constructor(private activatedRoute: ActivatedRoute,
    private authen: AuthenticationService,
    private dauSach: DauSachService,
    private user0101Service: User0101Service,
    private user0102Service: User0102Service,
    private user0201Service: User0201Service,
    private user0202Service: User0202Service,
    private toast: ToastrService,
    private dataService: DataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = '' + this.activatedRoute.snapshot.paramMap.get('id');



    this.dauSach.getBookTitleDetail(this.id).subscribe({
      next: (resp: DataResponse) => {
        console.log(resp.responseData);
        if (resp.status == CommonConstant.RESULT_OK)
          this.bookTitle = resp.responseData;
        this.bookTitle.bookCode = this.id;
        if (this.bookTitle.img) {
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
  }

  addBookToCart() {
    if (this.bookTitle.status == "0") {
      this.toast.error("Sách đã ngừng cung cấp!")
    }
    else{
      this.user0101Service.insert(this.bookTitle).subscribe(resp => {
        if (resp.status == CommonConstant.RESULT_WN) {
          this.authen.logIn();
        }
        else if (resp.status == CommonConstant.RESULT_OK) {
          this.dauSach.getBookAvailable(this.id).subscribe(
            (response) => {
              console.log("Checking book available")
              if (response.responseData) {
                this.toast.success(resp.message)
              }
              else {
                this.toast.error("Hiện tại sách đã hết!");
              }
            },
            (error) => {
              console.log("Error checking book available");
            }
          )
        }
        else if (resp.status == CommonConstant.RESULT_NG) {
          this.toast.error(resp.message)
        }
      });
    }
    
  }

  addBookToWaitList() {
    this.user0102Service.insert(this.bookTitle).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_WN) {
          this.authen.logIn();
        }
        else if (resp.status == CommonConstant.RESULT_OK) {
          this.toast.success(resp.message)
          // this.sse.connect()
        }
        else if (resp.status == CommonConstant.RESULT_NG) {
          this.toast.error(resp.message)
        }
        // else if()
      }
    });

    // this.sse.connect()

  }

  borrow() {
    this.user0201Service.checkPhieuMuonExists().subscribe(
      (response) => {
        if (response.status === CommonConstant.RESULT_WN) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bạn chưa đăng nhập, vui lòng đăng nhập trước khi mượn sách',
          }).then(() => {
            this.authen.logIn();
          });
        }
        else if (this.bookTitle.status == "0") {
          this.toast.error("Sách đã ngừng cung cấp!")
        }
        else {
          const phieumuonNumber = response.responseData;
          if (phieumuonNumber !== 0) {
            this.toast.error("Bạn còn phiếu mượn chưa trả! Vui lòng trả phiếu mượn trước khi mượn thêm sách");
          }
          else {
            this.dauSach.getBookAvailable(this.id).subscribe(
              (response) => {
                console.log("Checking book available")
                if (response.responseData) {
                  this.router.navigate(['/user/checkout'], { state: { data: [this.bookTitle.bookCode] } });
                }
                else {
                  this.toast.error("Hiện tại sách đã hết!");
                }
              },
              (error) => {
                console.log("Error checking book available");
              }
            )
          }
        }
        
      }
    )
  }

  navigateToHome(genreBook: GenreBook) {
    this.dataService.setNavigateToGenre(true)
    this.router.navigate(['/home'], { queryParams: { page: 1, category: genreBook.genre_id } })

  }

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

  genreNav(genre: GenreBook) {
    this.router.navigate(['/home'], { queryParams: { category: genre.genre_id, page: 1 } })
  }

}

import { Sys0202Service } from 'app/_service/sys/book/sys0202.service';
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
  selector: 'sys-editbooktitle',
  templateUrl: './editBookTitle.component.html',
  styleUrls: ['./editBookTitle.component.scss']
})
export class EditBookTitleComponent implements AfterViewInit, OnInit {

  // id: number;
  product;
  bookTitle: Book
  thumbimages: any[] = [];
  id: string = '';
  quantity: number = 0;
  bookList: Sach[] = [];
  status: number = 1;
  genreAll: GenreBook[] = [];
  selectedGenre: GenreBook[] = [];
  previewImage: any;
  file: File;

  constructor(private activatedRoute: ActivatedRoute,
    private authen: AuthenticationService,
    private dauSach: DauSachService,
    private user0101Service: User0101Service,
    private user0102Service: User0102Service,
    private user0201Service: User0201Service,
    private sys0202Service: Sys0202Service,
    private toast: ToastrService,
    private sse: SseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = '' + this.activatedRoute.snapshot.paramMap.get('bookCode');
    this.dauSach.getBookTitleDetail(this.id).pipe(
      map(
        (resp) => {
          if (resp.status == CommonConstant.RESULT_OK)
            this.bookTitle = resp.responseData;
          this.bookTitle.bookCode = this.id;
          this.selectedGenre = this.bookTitle.genres!;
          if (this.bookTitle.img != null) {
            this.dauSach.getCover(this.bookTitle.img!).subscribe(
              (response) => {
                this.previewImage = 'data:image/jpeg;base64,' + response.responseData;
              }
            );
          }
          else {
            this.dauSach.getCover("no-image.png").subscribe(
              (response) => {
                this.previewImage = 'data:image/jpeg;base64,' + response.responseData;
              }
            );
          }
        }
      )
    ).subscribe();
    this.sys0202Service.getAllGenres().subscribe(
      (response) => {
        if (response.status === CommonConstant.RESULT_OK) this.genreAll = response.responseData;
        console.log(response.responseData)
      }
    );
  }

  isSelected(genre_id: number): boolean {
    // console.log(this.selectedGenre);
    for (let i of this.selectedGenre) {
      // console.log(genre_id);
      if (genre_id == i.genre_id) return true;
    }
    return false
  }

  toggleChoice(item: GenreBook) {
    if (this.isSelected(item.genre_id!)) {
      this.selectedGenre = this.selectedGenre.filter(i => i !== item);
    } else {
      this.selectedGenre.push(item);
    }
    console.log(this.selectedGenre)
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

  setStatus(status: number) {
    this.status = status;
  }

  handleMinus() {
    this.quantity--;
  }
  handlePlus() {
    this.quantity++;
  }

  error_title: string = '';
  error_author: string = '';
  error_publisher: string = '';
  error_description: string = '';

  submit() {
    let isValidate = true;

    if (this.bookTitle.title === "") {
      this.error_title = 'Tiêu đề không được để trống'
      isValidate = false;
    }

    if (this.bookTitle.author === "") {
      this.error_author = 'Tác giả không được để trống'
      isValidate = false;
    }

    if (this.bookTitle.publisher === "") {
      this.error_publisher = 'Nhà xuất bản không được để trống'
      isValidate = false;
    }

    if (this.bookTitle.description!.length > 3000) {
      this.error_description = 'Mô tả không được quá 3000 ký tự'
      isValidate = false;
    }

    if (isValidate === true) {
      this.bookTitle.genres = this.selectedGenre;
      this.dauSach.updateBookTitle(this.bookTitle).subscribe(
        (response) => {
          if (response.status === CommonConstant.RESULT_OK) {
            Swal.fire({
              icon: 'success',
              title: 'Thành công',
              text: 'Sửa đầu sách thành công',
            }).then(() => {
              if (this.file) {
                const formData = new FormData();
                formData.append("file", this.file);
                formData.append("bookCode", this.id);
                this.dauSach.addCover(formData).subscribe();
              }
              this.router.navigate(['/sys/list-dausach']);
            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Sách cùng tên đã tồn tại trong hệ thống',
            });
          }
        }
      )
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.previewImage = event.target!.result;
      }
    }
    this.file = event.target.files[0];
  }

  enableBook(bookId: any) {
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
          this.dauSach.changeStatus(1, bookId).subscribe(
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

  disableBook(bookId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Xác nhận',
      text: 'Bạn có muốn vô hiệu hóa quyển sách này không?',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dauSach.changeStatus(0, bookId).subscribe(
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


}

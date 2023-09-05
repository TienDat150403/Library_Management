import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { ToastrService } from 'ngx-toastr';
import { DauSach } from 'app/_model/sys/book/book.model';
import { AuthConstant } from 'app/_constant/auth.constant';
import { Cookie } from 'ng2-cookies';
import { GenreBook } from 'app/_model/sys/book/genreBook.model';
import { Sys0202Service } from 'app/_service/sys/book/sys0202.service';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import Swal from 'sweetalert2'
import { DauSachService } from 'app/_service/services/dausach.service';
import { Book } from 'app/_model/user/book.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var window: any;

@Component({
  selector: 'add-book-title',
  templateUrl: './addbooktitle.component.html',
  styleUrls: ['./addbooktitle.component.scss']
})
export class AddBookTitleComponent implements OnInit {
  myForm: FormGroup;
  previewImage: any;
  file: File;
  bookTitle: Book = {
    bookCode: '',
    title: '',
    publisher: '',
    price: 0,
    pages: 0,
    description: '',
    status: '1',
    author: '',
    createdYear: 0,
    category: 0,
    img: '',
    genres: []
  };
  genreAll: GenreBook[] = [];
  quantity: number = 1;
  selectedGenre: GenreBook[];
  constructor(
    private authService: AuthenticationService,
    private loading: LoaderService,
    private toastr: ToastrService,
    private dauSachService: DauSachService,
    private sys0202Service: Sys0202Service,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.sys0202Service.getAllGenres().subscribe(
      (response) => {
        if (response.status === CommonConstant.RESULT_OK) this.genreAll = response.responseData;
        console.log(response.responseData)
      }
    );
    this.dauSachService.getCover("no-image.png").subscribe(
      (response) => {
        this.previewImage = 'data:image/jpeg;base64,' + response.responseData;
      }
    )
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

  get registerFormControl() {
    return this.myForm.controls;
  }

  error_title: string = '';
  error_author: string = '';
  error_publisher: string = '';
  error_description: string = '';

  addBookTitle() {
    let isValidate = true;

    if (this.bookTitle.title === "") {
      this.error_title = 'Tiêu đề không được để trống'
      isValidate = false;
    }

    if (this.bookTitle.title!.length > 50) {
      this.error_title = 'Tiêu đề không được quá 50 ký tự'
      isValidate = false;
    }

    if (this.bookTitle.author === "") {
      this.error_author = 'Tác giả không được để trống'
      isValidate = false;
    }

    if (this.bookTitle.title!.length > 50) {
      this.error_author = 'Tác giả không được quá 50 ký tự'
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
      console.log(this.selectedGenre)
      this.dauSachService.postData(this.bookTitle, this.quantity).subscribe(
        (response) => {
          if (response.status === "NG") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Thêm không thành công!',
              footer: '<a href="">Sách đã tồn tại trong hệ thống</a>'
            });
          }
          else {
            Swal.fire({
              icon: 'success',
              title: 'Thành công',
              text: 'Thêm thành công!',
            }).then(
              () => {
                if (this.file) {
                  const formData = new FormData();
                  formData.append("file", this.file);
                  formData.append("bookCode", response.responseData.bookCode);
                  this.dauSachService.addCover(formData).subscribe();
                }
                this.router.navigate(['/sys/list-dausach']);
              }
            );
          }
        },
        (error) => {

          console.error('Error adding data:', error);
        }
      )
      // this.addDauSach.postGenre(this.selectedGenre);
      console.log(this.bookTitle);
      // window.location.reload();
    }
  }

  isSelected(genre_id: number): boolean {
    // console.log(this.selectedGenre);
    for (let i of this.bookTitle.genres!) {
      // console.log(genre_id);
      if (genre_id == i.genre_id) return true;
    }
    return false
  }

  toggleChoice(item: GenreBook) {
    if (this.isSelected(item.genre_id!)) {
      this.bookTitle.genres = this.bookTitle.genres!.filter(i => i !== item);
    } else {
      this.bookTitle.genres!.push(item);
    }
    console.log(this.bookTitle.genres)
  }

  handleMinus(event) {
    event.preventDefault()
    if (this.quantity > 0) this.quantity--;
  }
  handlePlus(event) {
    event.preventDefault()
    this.quantity++;
  }


}
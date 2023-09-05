import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthConstant } from 'app/_constant/auth.constant';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { DauSach, Sach } from 'app/_model/sys/book/book.model';
import { GenreBook } from 'app/_model/sys/book/genreBook.model';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';

declare var window: any;

@Component({
  selector: 'book-title',
  templateUrl: './booktitle.component.html',
  styleUrls: ['./booktitle.component.css']
})
export class BookTitleComponent implements OnInit {
  public data: DauSach[];
  dataActive: DauSach[] = []
  dataDisable: DauSach[] = []
  public bookdata: Sach[];
  formModalDetail: any;
  formModalDisable: any;
  formModalEnable: any;
  disableBookCode: string;
  enableBookCode: string;
  genre_list: string;
  dausachDetail: DauSach = {
    bookCode: '',
    title: '',
    publisher: '',
    price: 0,
    pages: 0,
    description: '',
    status: 0,
    author: '',
    createdYear: 0,
    category: 0,
    img: '',
    genres: []
  };
  quantity: 0;
  imageArray: string[] = [];
  imageArrayDis: string[] = [];

  status: number = 1;
  numbersArray: Number[] = [];

  //pagination
  pageCurrent: number = 1;
  maxPage: number;
  tableSize: number = 5;


  constructor(private authService: AuthenticationService,
    private loading: LoaderService,
    private toastr: ToastrService,
    private dauSachService: DauSachService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  userInfo = new UserInfo();

  setStatus(status: number) {
    this.status = status;
    this.pageCurrent = 1;
  }

  ngOnInit(): void {
    // for (let i = 1; i <= 5; i++) {
    //   this.numbersArray.push(i);
    // }

    // if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
    this.loading.change(true);
    this.fetchData();
    this.formModalDetail = new window.bootstrap.Modal(
      document.getElementById('modal-detail-cat')
    );
    this.formModalDisable = new window.bootstrap.Modal(
      document.getElementById('modal-disable-cat')
    );
    this.formModalEnable = new window.bootstrap.Modal(
      document.getElementById('modal-enable-cat')
    );
    // }

    // this.activatedRoute.queryParamMap.subscribe((param) => {
    //   this.pageCurrent = Number(param.get("page"))
    //   // this.searchAuthor = param.get("author") ?? ""

    //   if (this.pageCurrent == 0) {
    //     this.pageCurrent = 1
    //   }
    //   // if (!this.isFindBySearch) {
    //   this.dauSachService.getBookTitle(this.pageCurrent, "", 0, "", [], ['']).subscribe(data => {
    //     this.data = data.responseData;

    //   })

    //   this.dauSachService.countTotalBookTitle("", 0, ['']).subscribe(data => {
    //     // this.data = data.responseData;

    //   })

    // })


  }

  // fetchData() {
  //   this.dauSachService.getData().subscribe(
  //     (response) => {
  //       this.data = response.responseData;
  //       for (let c of this.data) {
  //         if (c.status == 1) {
  //           this.dataActive.push(c)
  //         }
  //         else if (c.status == 0) {
  //           this.dataDisable.push(c)
  //         }
  //       }
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   )
  // }

  fetchData() {
    this.dauSachService.getData().pipe(
      map((response) => {
        this.data = []
        this.data = response.responseData;
        console.log(this.data);
        this.dataActive = [];
        this.dataDisable = [];
        for (let c of this.data) {
          if (c.status == 1) {
            this.dataActive.push(c)
          }
          else if (c.status == 0) {
            this.dataDisable.push(c)
          }
        }
        let subscribeList: any[] = [];
        for (let i = 0; i < this.dataActive.length; i++) {
          if (this.dataActive[i].img) {
            subscribeList.push(this.dauSachService.getCover(this.dataActive[i].img!));
          }
          else {
            subscribeList.push(this.dauSachService.getCover("no-image.png"));
          }
        }
        forkJoin(subscribeList).pipe(
          map((respArr) => {
            // console.log(respArr);
            for (let item of respArr) {
              this.imageArray.push('data:image/jpeg;base64,' + item.responseData);
            }
            // console.log(this.imageArray)
          })
        ).subscribe();
        let subscribeList2: any[] = [];
        for (let i = 0; i < this.dataDisable.length; i++) {
          if (this.dataDisable[i].img) {
            subscribeList2.push(this.dauSachService.getCover(this.dataDisable[i].img!));
          }
          else {
            subscribeList2.push(this.dauSachService.getCover("no-image.png"));
          }
        }
        forkJoin(subscribeList2).pipe(
          map((respArr) => {
            // console.log(respArr);
            for (let item of respArr) {
              this.imageArrayDis.push('data:image/jpeg;base64,' + item.responseData);
            }
            // console.log(this.imageArray)
          })
        ).subscribe();
      })
    ).subscribe();

  }

  openModel(item: DauSach) {
    this.dauSachService.getBookDetail(item.bookCode).subscribe(
      (response) => {
        this.dausachDetail = response.responseData;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
    this.genre_list = this.dausachDetail.genres.map(item => item.genre_name).join(', ');
    // this.dausachDetail = item;
    this.dauSachService.getBookData(item.bookCode).subscribe(
      (response) => {
        this.bookdata = response.responseData;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
    this.formModalDetail.show();
  }

  closeModel() {
    this.formModalDetail.hide();
  }

  openModelDisable(bookCode: string) {
    this.disableBookCode = bookCode;
    this.formModalDisable.show();
  }

  closeModelDisable() {
    this.disableBookCode = '';
    this.formModalDisable.hide();
  }
  disable() {
    this.dauSachService.changeStatus(0, this.disableBookCode).subscribe();
    this.formModalDisable.hide();
    window.location.reload();
  }

  openModelEnable(bookCode: string) {
    this.enableBookCode = bookCode;
    this.formModalEnable.show();
  }

  closeModelEnable() {
    this.enableBookCode = '';
    this.formModalEnable.hide();
  }

  enable() {
    this.dauSachService.changeStatus(1, this.enableBookCode).subscribe();
    this.formModalEnable.hide();
    window.location.reload();
  }

  changePage(event: any): void {
    // console.log(event)
    this.pageCurrent = event;
    // this.router.navigate(['/sys/list-dausach'], { queryParams: { page: this.pageCurrent } })

  }
}

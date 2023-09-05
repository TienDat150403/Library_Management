import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'app/_service/services/cart.service';
import { CartModelServer } from 'app/_model/models/cart.model';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'app/_service/comm/loader.service';
import { AuthConstant } from 'app/_constant/auth.constant';
import { Cookie } from 'ng2-cookies';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { User0101Service } from 'app/_service/user/user0101.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Book } from 'app/_model/user/book.model';
import { User0102Service } from 'app/_service/user/user0102.service';
import { SearchService } from 'app/_service/user/serach.service';
import { User0104Service } from 'app/_service/user/user0104.service';
import { DataService } from 'app/_service/comm/data.service';
import { DauSach } from 'app/_model/sys/book/book.model';
import { Router } from '@angular/router';
import { SseService } from 'app/_service/user/sse.service';
import { GenreBook } from 'app/_model/sys/book/genreBook.model';
import { User0103Service } from 'app/_service/user/user0103.service';
import { Role } from 'app/_model/auth/role';
import { lastValueFrom } from 'rxjs';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // cartData: CartModelServer;
  cartTotal: number;
  waitListTotal: number;
  notificationTotal: number;
  isAuthenticate: boolean = false;

  notification: any;
  listGenre: GenreBook[] = []
  roleUser: Role[]

  constructor(public user0101Service: User0101Service,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private loading: LoaderService,
    private user0102Service: User0102Service,
    private user0103Service: User0103Service,
    private user0104Service: User0104Service,
    private searchService: SearchService,
    private dataService: DataService,
    private dauSach: DauSachService,
    private router: Router,
    private sse: SseService,
    private toast: ToastrService,
  ) {
  }

  async ngOnInit() {

    this.cartTotal = 0;
    this.waitListTotal = 0;
    this.notificationTotal = 0;

    // if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
    //   this.loading.change(true)
    //   this.authService.getUserInfo().subscribe({
    //     next: (resp: DataResponse) => {
    //       if (resp.status == CommonConstant.RESULT_OK) {
    //         let userInfo: UserInfo = resp.responseData;
    //         this.roleUser = userInfo.roles ?? []
    //         console.log(this.roleUser)
    //         this.sse.connect(userInfo?.userUid)
    //         this.isAuthenticate = true;
    //       } else {
    //       }
    //       this.loading.change(false)
    //     },
    //     error: (err: any) => {
    //       this.loading.change(false)
    //     }
    //   })

    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      // (async () => {
      await this.getUserInfo();
      // })()
    }
    console.log("Header đây nè " + this.isAuthenticate)


    if (this.isAuthenticate) {
      this.user0101Service.getListBookInCart().subscribe(data => {

      });
      this.user0101Service.getBooks().subscribe(books => {
        this.cartTotal = books.length;
      });

      this.user0102Service.getListBookInWaitList().subscribe(data => {

      });
      this.user0102Service.getBooks().subscribe(books => {
        this.waitListTotal = books.length;
      });

      this.user0104Service.countTotalNotiUnread().subscribe(data => {

      });

      this.user0104Service.getUnreadQuantityNotis().subscribe(quantiy => {
        this.notificationTotal = quantiy.valueOf()
      });
    }


    //   // if (this.isAuthenticate) {
    //   this.user0103Service.getListCateBookForUser().subscribe(data => {

    //   });

    //   this.user0103Service.getGenreForUser().subscribe(genres => {
    //     this.listGenre = genres
    //   });
    //   // }

    // }


  }

  async getUserInfo(): Promise<void> {
    const resp = await lastValueFrom(this.authService.getUserInfo())
    if (resp.status == CommonConstant.RESULT_OK) {
      let userInfo: UserInfo = resp.responseData;
      console.log(userInfo)
      this.roleUser = userInfo.roles ?? []
      console.log("Hello hehe" + this.roleUser)
      this.sse.connect(userInfo?.userUid)
      this.isAuthenticate = true;
    }
  }

  login() {
    this.authService.logIn();
  }

  logout() {
    this.dataService.setSelectedRole(false);
    this.authService.logOut();

  }

  signup() {
    this.authService.singup()
  }

  enteredText: string = "";
  selectSearch: number = 0; //chọn tìm kiếm theo tên sách theo tên tác giả

  onSearchTextChanged() {
    console.log(this.enteredText)
    this.searchService.raiseDataEmitterEvent(this.enteredText);
    // this.searchService.raiseSelectSearchevent(this.selectSearch)
  }

  searchBookBackEnd() {
    console.log(this.selectSearch)
    if (this.selectSearch == 0) {
      this.router.navigate(['/home'], { queryParams: { search: this.enteredText, page: 1 } })
    }
    else if (this.selectSearch == 1) {
      this.router.navigate(['/home'], { queryParams: { author: this.enteredText, page: 1 } })
    }
    else if (this.selectSearch == 2) {
      this.router.navigate(['/home'], { queryParams: { categoryByName: this.enteredText, page: 1 } })
    }
  }

  showToast() {
    this.toast.info(this.notification);
    setTimeout(() => {
      this.toast.clear();
    }, 30000);
  }

  search(genre: GenreBook) {
    console.log(this.selectSearch)
    this.router.navigate(['/home'], { queryParams: { search: this.enteredText, category: genre.genre_id, page: 1 } })
  }

  // onChangeSelectedStatus() {
  //   console.log(this.selectSearch)
  //   // this.getData();
  // }
}
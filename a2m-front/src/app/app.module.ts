import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './_config/http-error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserInfoComponent } from './pages/user/user-info/user-info.component';
import { ProductComponent } from './components/product/product.component';
import { SearchService } from './_service/user/serach.service';
import { DetailComponent } from './components/phieumuon/detail-phieu-tra/detail.component';
import { TrasachComponent } from './components/phieumuon/trasach/trasach.component';
import { ChiTietComponent } from './components/phieumuon/chi-tiet/chi-tiet.component';
import { DetailPhieumuonUserComponent } from './components/quanliphieumuon-user/detail-phieumuon-user/detail-phieumuon-user.component';
import { SharedPipeModule } from "./_pipe/sharedpipe.module";
import { TestComponent } from './test/test.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CurrencySuffixPipe } from './_pipe/format_currency.pipe';
// import { ConvertToSpacesPipe } from 'convert-to-spaces.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    // HeaderComponent,
    // FooterComponent,
    // HomeComponent,
    // LoginComponent,
    // RegisterComponent,
    // CartComponent,
    // CheckoutComponent,
    ProductComponent,
    ThankyouComponent,
    TrasachComponent,
    DetailComponent,
    ChiTietComponent,
    DetailPhieumuonUserComponent,
    TestComponent,
    // DetailComponent,
    // UserManageComponent,
    // UserDetailComponent,
    // UserWaitComponent,
    // UserBorrowComponent,
    // UserGivedComponent,
    // CartComponent
    // UserInfoComponent,
    // ConvertToSpacesPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    SearchService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    SharedPipeModule.forRoot(),
  ]
})
export class AppModule { }

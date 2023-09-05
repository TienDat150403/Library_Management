import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SysRoutingModule } from './sys-routing.module';
import { Sys0201Component } from './Sys0201/sys0201.component';
import { SysComponent } from './sys.component';
import { BookTitleComponent } from 'app/components/bookTitle/booktitlelist/booktitle.component';
import { AddBookTitleComponent } from 'app/components/bookTitle/addbooktitle/addbooktitle.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from 'app/components/category/category.component';
import { PhieumuonComponent } from 'app/components/phieumuon/phieumuon.component';

import { CheckoutComponent } from 'app/components/checkout/checkout.component';
import { LayoutsModule } from 'app/components/layouts/layouts.module';
import { SelectRoleComponent } from 'app/components/selectRole/selectRole.component';
import { UserManageModule } from 'app/components/user_manage/usermanage.module';
import { DetailComponent } from 'app/components/phieumuon/detail-phieu-tra/detail.component';
import { ListChoComponent } from 'app/components/phieumuon/list-cho/list-cho.component';
import { ListDangMuonComponent } from 'app/components/phieumuon/list-dang-muon/list-dang-muon.component';
import { ListDaTraComponent } from 'app/components/phieumuon/list-da-tra/list-da-tra.component';
import { ListDaHuyComponent } from 'app/components/phieumuon/list-da-huy/list-da-huy.component';
import { SysBookDetailComponent } from 'app/components/bookTitle/bookdetail/bookdetail.component';
import { EditBookTitleComponent } from 'app/components/bookTitle/editBookTitle/editBookTitle.component';
import { SharedPipeModule } from 'app/_pipe/sharedpipe.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SysComponent,
    BookTitleComponent,
    Sys0201Component,
    SysBookDetailComponent,
    AddBookTitleComponent,
    CheckoutComponent,
    CategoryComponent,
    SelectRoleComponent,
    PhieumuonComponent,
    ListChoComponent,
    ListDangMuonComponent,
    ListDaTraComponent,
    ListDaHuyComponent,
    EditBookTitleComponent,
  ],
  imports: [
    CommonModule,
    SysRoutingModule,
    FormsModule,
    LayoutsModule,
    UserManageModule,
    NgxPaginationModule,
    SharedPipeModule
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysModule { }

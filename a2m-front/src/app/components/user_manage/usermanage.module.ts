import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user_list/userlist.component';
import { UserDetailComponent } from './user_detail/userdetail.component';
import { UserManagePhieuMuonComponent } from './user-manage-phieu-muon/user-manage-phieu-muon.component';
import { DangChoXacNhanComponent } from './user-manage-phieu-muon/dang-cho-xac-nhan/dang-cho-xac-nhan.component';
import { SharedPipeModule } from 'app/_pipe/sharedpipe.module';
import { DangMuonComponent } from './user-manage-phieu-muon/dang-muon/dang-muon.component';
import { TraSachComponent } from './user-manage-phieu-muon/tra-sach/tra-sach.component';
import { DaTraComponent } from './user-manage-phieu-muon/da-tra/da-tra.component';
import { DaHuyComponent } from './user-manage-phieu-muon/da-huy/da-huy.component';
import { ChiTietPhieuUserComponent } from './user-manage-phieu-muon/chi-tiet-phieu-user/chi-tiet-phieu-user.component';
import { UserActiveComponent } from './user_list/user-active/user-active.component';
import { UserdiActiveComponent } from './user_list/userdi-active/userdi-active.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserManagePhieuMuonComponent,
    DangChoXacNhanComponent,
    DangMuonComponent,
    TraSachComponent,
    DaTraComponent,
    DaHuyComponent,
    ChiTietPhieuUserComponent,
    UserActiveComponent,
    UserdiActiveComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedPipeModule
  ],
  exports: [
    UserListComponent,
    UserDetailComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UserManageModule { }

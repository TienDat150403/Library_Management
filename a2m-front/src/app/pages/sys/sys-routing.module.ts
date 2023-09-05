import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysComponent } from './sys.component';
import { CategoryComponent } from 'app/components/category/category.component';
import { AuthConstant } from "app/_constant/auth.constant";
import { RoleGuard } from "app/_guard/role.guard";
import { Sys0201Component } from './Sys0201/sys0201.component';
import { PhieumuonComponent } from "app/components/phieumuon/phieumuon.component";
import { SelectRoleComponent } from "app/components/selectRole/selectRole.component";
import { UserListComponent } from 'app/components/user_manage/user_list/userlist.component';
import { UserDetailComponent } from 'app/components/user_manage/user_detail/userdetail.component';
import { DetailComponent } from 'app/components/phieumuon/detail-phieu-tra/detail.component';
import { TrasachComponent } from 'app/components/phieumuon/trasach/trasach.component';

import { UserInfoComponent } from '../user/user-info/user-info.component';
import { ListDangMuonComponent } from 'app/components/phieumuon/list-dang-muon/list-dang-muon.component';
import { ListDaTraComponent } from 'app/components/phieumuon/list-da-tra/list-da-tra.component';
import { ListDaHuyComponent } from 'app/components/phieumuon/list-da-huy/list-da-huy.component';
import { ListChoComponent } from 'app/components/phieumuon/list-cho/list-cho.component';
import { ChiTietComponent } from 'app/components/phieumuon/chi-tiet/chi-tiet.component';
import { AddBookTitleComponent } from 'app/components/bookTitle/addbooktitle/addbooktitle.component';
import { SysBookDetailComponent } from 'app/components/bookTitle/bookdetail/bookdetail.component';
import { EditBookTitleComponent } from 'app/components/bookTitle/editBookTitle/editBookTitle.component';

import { QuanliphieumuonUserComponent } from "app/components/quanliphieumuon-user/quanliphieumuon-user.component";
import { ListXacNhanComponent } from 'app/components/quanliphieumuon-user/list-xac-nhan/list-xac-nhan.component';
import { UserManagePhieuMuonComponent } from 'app/components/user_manage/user-manage-phieu-muon/user-manage-phieu-muon.component';
import { DangChoXacNhanComponent } from 'app/components/user_manage/user-manage-phieu-muon/dang-cho-xac-nhan/dang-cho-xac-nhan.component';
import { DangMuonComponent } from 'app/components/user_manage/user-manage-phieu-muon/dang-muon/dang-muon.component';
import { TraSachComponent } from 'app/components/user_manage/user-manage-phieu-muon/tra-sach/tra-sach.component';
import { DaTraComponent } from 'app/components/user_manage/user-manage-phieu-muon/da-tra/da-tra.component';
import { DaHuyComponent } from 'app/components/user_manage/user-manage-phieu-muon/da-huy/da-huy.component';
import { ChiTietPhieuUserComponent } from 'app/components/user_manage/user-manage-phieu-muon/chi-tiet-phieu-user/chi-tiet-phieu-user.component';
import { TestComponent } from 'app/test/test.component';
import { ProductByGenreComponent } from 'app/components/productByGenre/productByGenre.component';
import { UserActiveComponent } from 'app/components/user_manage/user_list/user-active/user-active.component';
import { UserdiActiveComponent } from 'app/components/user_manage/user_list/userdi-active/userdi-active.component';


const routes: Routes = [
  {
    path: "", component: SysComponent,
    children: [
      { path: "userInfo", component: UserInfoComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "list-dausach", component: Sys0201Component, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "list-dausach/add", component: AddBookTitleComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "list-dausach/detail/:bookCode", component: SysBookDetailComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "list-dausach/edit/:bookCode", component: EditBookTitleComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "list-categories", component: CategoryComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "list-categories/:id", component: ProductByGenreComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },

      // { path: "list-categories", component: TestComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      { path: "list-phieumuon/:status", component: PhieumuonComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      // { path: 'selectRole', component: SelectRoleComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
      {
        path: "user-list", component: UserListComponent,
        children: [
          { path: "", redirectTo: 'status/02-03', pathMatch: "full" },
          { path: "status/02-03", component: UserActiveComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
          { path: "status/02-04", component: UserdiActiveComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
        ]

      },
      {
        path: "user-detail/:id", component: UserDetailComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] },
        children: [
          {
            path: "phieu-muon", component: UserManagePhieuMuonComponent,
            children: [
              { path: "", redirectTo: 'status/0', pathMatch: "full" },
              { path: "status/0", component: DangChoXacNhanComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
              { path: "status/1", component: DangMuonComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
              { path: "tra-sach/:id", component: TraSachComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
              { path: "status/2", component: DaTraComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
              { path: "status/3", component: DaHuyComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
              { path: "chi-tiet/:id", component: ChiTietPhieuUserComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } }
            ]
          }
        ]
      },
      {
        path: "list-phieumuon", component: PhieumuonComponent,
        children: [
          { path: "", redirectTo: 'status/0', pathMatch: "full" },
          { path: "status/0", component: ListChoComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
          { path: "status/1", component: ListDangMuonComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
          { path: "status/2", component: ListDaTraComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
          { path: "status/3", component: ListDaHuyComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
          { path: "chi-tiet/:id", component: DetailComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
          { path: "tra-sach/:id", component: TrasachComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } },
          { path: "chi-tiet-phieu-muon/:id", component: ChiTietComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } }
        ]
      },
    ]
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }

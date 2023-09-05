import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../_guard/auth.guard';
import { HomeComponent } from 'app/components/home/home.component';
import { CartComponent } from 'app/components/cart/cart.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { RoleGuard } from 'app/_guard/role.guard';
import { AuthConstant } from 'app/_constant/auth.constant';

const routes: Routes = [
  {
    path: "", component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', loadChildren: () => import('./dashboards/dashboards.module').then((m) => m.DashboardsModule), },
      { path: 'sys', loadChildren: () => import('./sys/sys.module').then((m) => m.SysModule), canActivate: [AuthGuard] },
      { path: 'sam', loadChildren: () => import('./sam/sam.module').then((m) => m.SamModule), canActivate: [AuthGuard] },
      { path: 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule), canActivate: [AuthGuard] },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

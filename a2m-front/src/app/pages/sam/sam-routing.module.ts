import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamComponent } from './sam.component';
import { Sam0101Component } from './sam0101/sam0101.component';
import { Sam0201Component } from './sam0201/sam0201.component';
import { RoleGuard } from 'app/_guard/role.guard';
import { AuthConstant } from 'app/_constant/auth.constant';

const routes: Routes = [
  {
    path: "", component: SamComponent,
    children: [
      { path: "", redirectTo: "sam0101", pathMatch: "full" },
      { path: "sam0101", component: Sam0101Component, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
      { path: "sam0201", component: Sam0201Component, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN] } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamRoutingModule { }

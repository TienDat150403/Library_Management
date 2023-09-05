import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { NgModule } from "@angular/core";
import { AuthConstant } from "app/_constant/auth.constant";
import { RoleGuard } from "app/_guard/role.guard";
import { CartComponent } from "app/components/cart/cart.component";
import { HomeComponent } from "app/components/home/home.component";
import { WaitListComponent } from "app/components/waitlist/waitlist.component";
import { NotificationsComponent } from "app/components/notifications/notifications.component";
import { ProductComponent } from "app/components/product/product.component";
import { QuanliphieumuonUserComponent } from "app/components/quanliphieumuon-user/quanliphieumuon-user.component";
import { ListDangMuonComponent } from "app/components/quanliphieumuon-user/list-dang-muon/list-dang-muon.component";
import { ListXacNhanComponent } from "app/components/quanliphieumuon-user/list-xac-nhan/list-xac-nhan.component";
import { ListDaTraComponent } from "app/components/quanliphieumuon-user/list-da-tra/list-da-tra.component";
import { ListDaHuyComponent } from "app/components/quanliphieumuon-user/list-da-huy/list-da-huy.component";
import { CheckoutComponent } from "app/components/checkout/checkout.component";
import { ProductByGenreComponent } from "app/components/productByGenre/productByGenre.component";
import { DetailPhieumuonUserComponent } from "app/components/quanliphieumuon-user/detail-phieumuon-user/detail-phieumuon-user.component";


const routes: Routes = [
    {
        path: "", component: UserComponent,
        children: [
            // { path: 'book/:id', component: ProductComponent },
            // { path: 'home', component: HomeComponent, },
            // { path: 'home/:id', component: ProductByGenreComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_NORMAL] } },
            // {path: "userInfo", component: UserInfoComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] },
            { path: "userInfo", component: UserInfoComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },

            // {path: "cart", component: CartComponent, canActivate: [RoleGuard], },
            { path: "cart", component: CartComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
            { path: "waitlist", component: WaitListComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_NORMAL] } },

            { path: "checkout", component: CheckoutComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
            // { path: "borrow", component: PhieumuonComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_NORMAL] } },
            { path: "notification", component: NotificationsComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
            {
                path: "phieumuon", component: QuanliphieumuonUserComponent,
                children: [
                    { path: "", redirectTo: 'status/0', pathMatch: "full" },
                    { path: "status/0", component: ListXacNhanComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
                    { path: "status/1", component: ListDangMuonComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
                    { path: "status/2", component: ListDaTraComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
                    { path: "status/3", component: ListDaHuyComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
                    { path: "chi-tiet/:id", component: DetailPhieumuonUserComponent, canActivate: [RoleGuard], data: { guards: [AuthConstant.ROLE_ADMIN, AuthConstant.ROLE_NORMAL] } },
                ]
            },
        ]
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }

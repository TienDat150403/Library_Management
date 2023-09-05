import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ThankyouComponent } from "./components/thankyou/thankyou.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: "error", loadChildren: () => import('./components/errors/errors.module').then(m => m.ErrorsModule) },
  // {
  //   path: "product/:id",
  //   component: ProductComponent,
  // },
  // {
  //   path: "checkout",
  //   component: CheckoutComponent,
  // },
  { path: "**", redirectTo: "error" }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

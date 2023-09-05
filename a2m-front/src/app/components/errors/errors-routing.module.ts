import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { ErrorsComponent } from './errors.component';

const routes: Routes = [
  {
    path: "", component: ErrorsComponent,
    children: [
      { path: "", redirectTo: "404", pathMatch: "full" },
      { path: "403", component: Error403Component },
      { path: "404", component: Error404Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }

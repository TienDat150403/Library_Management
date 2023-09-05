import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { ErrorsComponent } from './errors.component';


@NgModule({
  declarations: [
    Error403Component,
    Error404Component,
    ErrorsComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }

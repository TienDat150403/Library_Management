import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamRoutingModule } from './sam-routing.module';
import { Sam0101Component } from './sam0101/sam0101.component';
import { Sam0201Component } from './sam0201/sam0201.component';
import { SamComponent } from './sam.component';


@NgModule({
  declarations: [
    Sam0101Component,
    Sam0201Component,
    SamComponent
  ],
  imports: [
    CommonModule,
    SamRoutingModule
  ]
})
export class SamModule { }

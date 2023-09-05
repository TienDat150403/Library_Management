import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../components/shared/shared.module';
import { LayoutsModule } from 'app/components/layouts/layouts.module';
import { FormsModule } from '@angular/forms';
import { SelectRoleComponent } from 'app/components/selectRole/selectRole.component';
import { CurrencySuffixPipe } from 'app/_pipe/format_currency.pipe';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    // SharedModule,
    // LayoutsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }

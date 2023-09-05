import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { CartComponent } from 'app/components/cart/cart.component';
import { LayoutsModule } from 'app/components/layouts/layouts.module';
import { SharedModule } from 'app/components/shared/shared.module';
import { WaitList } from 'app/_model/user/waitlist.model';
import { WaitListComponent } from 'app/components/waitlist/waitlist.component';
import { NotificationsComponent } from 'app/components/notifications/notifications.component';
import { CartService } from 'app/_service/services/cart.service';
import { User0101Service } from 'app/_service/user/user0101.service';
import { QuanliphieumuonUserComponent } from 'app/components/quanliphieumuon-user/quanliphieumuon-user.component';
import { ListDangMuonComponent } from 'app/components/quanliphieumuon-user/list-dang-muon/list-dang-muon.component';
import { ListXacNhanComponent } from 'app/components/quanliphieumuon-user/list-xac-nhan/list-xac-nhan.component';
import { ListDaTraComponent } from 'app/components/quanliphieumuon-user/list-da-tra/list-da-tra.component';
import { ListDaHuyComponent } from 'app/components/quanliphieumuon-user/list-da-huy/list-da-huy.component';
import { ProductByGenreComponent } from 'app/components/productByGenre/productByGenre.component';
import { SharedPipeModule } from 'app/_pipe/sharedpipe.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    // UserInfoComponent,
    UserComponent,
    CartComponent,
    WaitListComponent,
    NotificationsComponent,
    QuanliphieumuonUserComponent,
    ListDangMuonComponent,
    ListXacNhanComponent,
    ListDaTraComponent,
    ListDaHuyComponent,
    ProductByGenreComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    LayoutsModule,
    SharedModule,
    SharedPipeModule,
    NgxPaginationModule,
  ],
  providers: [User0101Service],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { ServiceComponent } from './service/service.component';
import { RoomComponent } from './room/room.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';
import { RoomCardComponent } from './shared/components/room-card/room-card.component';
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddRoomComponent } from './room/addroom/add-room/add-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateRoomComponent } from './room/addroom/update-room/update-room.component';
import { DeleteRoomComponent } from './room/addroom/delete-room/delete-room.component';
import { RoomDetailsComponent } from './shared/components/room-details/room-details.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CustomerComponent,
    ServiceComponent,
    RoomComponent,
    RoomtypeComponent,
    RoomCardComponent,
    AddRoomComponent,
    UpdateRoomComponent,
    DeleteRoomComponent,
    RoomDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModalModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

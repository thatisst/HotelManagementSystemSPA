import { UpdateRoomComponent } from './room/addroom/update-room/update-room.component';
import { AddRoomComponent } from './room/addroom/add-room/add-room.component';
import { ServiceComponent } from './service/service.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';
import { RoomComponent } from './room/room.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch:"full"},
  {path: "customer", component: CustomerComponent, children: [
    {path: "add", component: CustomerComponent},
    {path: "update", component: CustomerComponent},
    {path: "delete", component: CustomerComponent}
  ]},
  {path: "room", component: RoomComponent, children: [
    {path: "{:id}", component: RoomComponent},
    {path: "add", component: RoomComponent},
    {path: "update", component: RoomComponent},
    {path: "delete", component: RoomComponent}
  ]},
  {path: "roomtype", component: RoomtypeComponent, children: [
    {path: "add", component: RoomtypeComponent},
    {path: "update", component: RoomtypeComponent},
    {path: "delete", component: RoomtypeComponent}
  ]},
  {path: "service", component: ServiceComponent, children: [
    {path: "add", component: ServiceComponent},
    {path: "update", component: ServiceComponent},
    {path: "delete", component: ServiceComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

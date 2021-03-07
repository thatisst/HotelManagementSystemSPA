import { RoomService } from './../core/services/room.service';
import { CustomerService } from './../core/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Room } from '../shared/models/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rooms: Room[] = [];

  constructor(private roomService : RoomService) { }

  ngOnInit(): void {
    this.roomService.listAllRooms().subscribe(
      c => {
        this.rooms = c;
      }
    )
  }

}

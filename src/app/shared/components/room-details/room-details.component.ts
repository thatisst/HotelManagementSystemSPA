import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from './../../../core/services/room.service';
import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  room!:Room;
  id!:number;

  constructor(private roomService: RoomService
    ,private router: Router
    ,private route: ActivatedRoute
    ,private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.id = + (params.get('id') as any);
        this.getRoomDetails();
      }
    )
  }

  private getRoomDetails() {
    this.roomService.listRoom(this.id).subscribe(
      r => {
        this.room = r;
      }
    );
  }

}

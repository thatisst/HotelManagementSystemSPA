import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../shared/models/room';
import { RoomService } from '../core/services/room.service';
import { faEdit, faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  closeResult = '';

  rooms: Room[] = [];

  @Input()
  addedRoomForm!: FormGroup;

  constructor(private roomService : RoomService
    , private modalService: NgbModal) { }

  ngOnInit(): void {
    this.roomService.listAllRooms().subscribe(
      r => {
        this.rooms = r;
      }
    )
  }

  onSubmitAddRoom() {
    console.log(this.addedRoomForm)
    this.roomService.addRoom(this.addedRoomForm.value);
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}


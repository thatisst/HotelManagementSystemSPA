import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
  addedRoomForm!: FormGroup;
  updateRoomForm!: FormGroup;
  deletedRoomForm!: FormGroup;

  constructor(private roomService: RoomService
    , private modalService: NgbModal
    , private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.roomService.listAllRooms().subscribe(
      r => {
        this.rooms = r;
      }
    )
    this.buildFormAddRoom();
    this.buildFormUpdateRoom();
    this.buildFormDeleteRoom();
  }

  buildFormAddRoom() {
    this.addedRoomForm = this.fb.group({
      rtCode: ['3'],
      status: ['true']

    });
  }


  onSubmitAddRoom() {
    console.log(this.addedRoomForm);
    this.roomService.addRoom(this.addedRoomForm.value).subscribe(
      (res) =>{
        console.log(res);
      } ,
      (err : HttpErrorResponse) => {
        console.log(err);
      }
    );
  }


  buildFormUpdateRoom() {
    this.updateRoomForm = this.fb.group({
      id: ['8'],
      rtCode: ['3'],
      status: ['']
    });
  }

  onSubmitUpdateRoom() {
    console.log(this.updateRoomForm);
    this.roomService.updateRoom(this.updateRoomForm.value).subscribe(
      (res) =>{
        console.log(res);
      } ,
      (err : HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  buildFormDeleteRoom() {
    this.deletedRoomForm = this.fb.group({
      id: ['5', Validators.nullValidator]
    });
  }

  onSubmitDeleteRoom() {
    console.log(this.deletedRoomForm);
    this.roomService.deleteRoom(this.deletedRoomForm.value['id']).subscribe(
      (res) =>{
        console.log(res);
      } ,
      (err : HttpErrorResponse) => {
        console.log(err);
      }
    );
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


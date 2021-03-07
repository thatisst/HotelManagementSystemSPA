import { RoomService } from './../../../core/services/room.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.css']
})
export class DeleteRoomComponent implements OnInit {
  closeResult = '';

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  deletedRoomForm!: FormGroup;

  constructor(private modalService: NgbModal
    , private fb: FormBuilder
    , private roomService: RoomService
    , private router: Router, private route: ActivatedRoute) { }

  // convenience getter for easy access to form fields
  get f() { return this.deletedRoomForm.controls; }

  ngOnInit(): void {
    this.buildFormDeleteForm();
  }

  buildFormDeleteForm() {
    this.deletedRoomForm = this.fb.group({
      id: ['5', Validators.nullValidator]
      // ,
      // rtCode: ['3', Validators.required],
      // status: ['true', Validators.required]
    });
  }

  onSubmitDeleteRoom() {
    console.log(this.deletedRoomForm)
    this.roomService.deleteRoom(this.deletedRoomForm.value);
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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



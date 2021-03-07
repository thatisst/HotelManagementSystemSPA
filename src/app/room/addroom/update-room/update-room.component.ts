import { RoomService } from './../../../core/services/room.service';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {
  closeResult = '';

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  updateRoomForm!: FormGroup;
  submitted = false;

  // addedRoom!: Room;
  returnUrl!: string;


  constructor(private modalService: NgbModal
    , private fb: FormBuilder
    , private roomService: RoomService
    , private router: Router, private route: ActivatedRoute) { }

  // convenience getter for easy access to form fields
  get f() { return this.updateRoomForm.controls; }


  ngOnInit(): void {
    this.buildForm();
  }

  
  buildForm() {
    // this.updateRoomForm = this.fb.group({
    //   id: ['5', Validators.required],
    //   rtCode: ['3', Validators.required],
    //   status: ['true', Validators.required]

    // });
    this.updateRoomForm = new FormGroup({
      id: new FormControl(),
      rtCode: new FormControl(),
      status: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.updateRoomForm)
    this.roomService.updateRoom(this.updateRoomForm.value);
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



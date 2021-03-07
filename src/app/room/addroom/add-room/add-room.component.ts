import { RoomService } from './../../../core/services/room.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  closeResult = '';

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  addedRoomForm!: FormGroup;


  constructor(private modalService: NgbModal
    , private fb: FormBuilder
    , private roomService: RoomService
    , private router: Router, private route: ActivatedRoute) { }

  // convenience getter for easy access to form fields
  get f() { return this.addedRoomForm.controls; }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addedRoomForm = this.fb.group({
      // id: ['', Validators.nullValidator],
      rtCode: ['3', Validators.required],
      status: ['true', Validators.required]

    });
  }

  onSubmitAddRoom() {
    console.log(this.addedRoomForm)
    this.roomService.addRoom(this.addedRoomForm.value);
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




import { RoomtypeService } from './../core/services/roomtype.service';
import { RoomType } from './../shared/models/roomtype';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.css']
})
export class RoomtypeComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  closeResult = '';
  roomTypes: RoomType[] = [];
  addedRoomTypeForm!: FormGroup;
  updatedRoomTypeForm!: FormGroup;
  deletedRoomTypeForm!: FormGroup;

  constructor(private roomTypeService : RoomtypeService
    , private modalService: NgbModal
    , private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.roomTypeService.listAllRoomTypes().subscribe(
      r => {
        this.roomTypes = r;
      }
    );
    this.buildFormAddRoomType();
    this.buildFormUpdateRoomType();
    this.buildFormDeleteRoomType();
  }


  buildFormAddRoomType() {
    this.addedRoomTypeForm = this.fb.group({
      // id: ['', Validators.nullValidator],
      rtDesc: ['', Validators.required],
      rent: ['', Validators.required]
    });
  }

  onSubmitAddRoomType() {
    console.log(this.addedRoomTypeForm)
    this.roomTypeService.addRoomType(this.addedRoomTypeForm.value);
  }


  buildFormUpdateRoomType() {
    this.updatedRoomTypeForm = this.fb.group({
      id: ['', Validators.nullValidator],
      rtDesc: ['', Validators.required],
      rent: ['', Validators.required]
    });
  }

  onSubmitUpdateRoomType() {
    console.log(this.updatedRoomTypeForm)
    this.roomTypeService.updateRoomType(this.updatedRoomTypeForm.value);
  }

  buildFormDeleteRoomType() {
    this.deletedRoomTypeForm = this.fb.group({
      id: ['', Validators.nullValidator]
    });
  }

  onSubmitDeleteRoomType() {
    console.log(this.deletedRoomTypeForm)
    this.roomTypeService.deleteRoomType(this.deletedRoomTypeForm.value);
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
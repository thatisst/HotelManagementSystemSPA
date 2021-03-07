import { ServiceService } from './../core/services/service.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../shared/models/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  closeResult = '';
  services: Service[] = [];
  addedServiceForm!: FormGroup;
  updatedServiceForm!: FormGroup;
  deletedServiceForm!: FormGroup;

  constructor(private serviceService : ServiceService
    , private modalService: NgbModal
    , private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.serviceService.listAllServices().subscribe(
      r => {
        this.services = r;
      }
    );
    this.buildFormAddService();
    this.buildFormUpdateService();
    this.buildFormDeleteService();

  }

  buildFormAddService() {
    this.addedServiceForm = this.fb.group({
      // id: ['', Validators.nullValidator],
      roomNo: ['', Validators.required],
      sDesc: ['', Validators.required],
      amount: ['', Validators.required],
      serviceDate: ['', Validators.required]
    });
  }

  onSubmitAddService() {
    console.log(this.addedServiceForm);
    this.serviceService.addService(this.addedServiceForm.value).subscribe(
      (res) =>{
        console.log(res);
      } ,
      (err : HttpErrorResponse) => {
        console.log(err);
      }
    );
  }


  buildFormUpdateService() {
    this.updatedServiceForm = this.fb.group({
      id: ['', Validators.nullValidator],
      roomNo: ['', Validators.required],
      sDesc: ['', Validators.required],
      amount: ['', Validators.required],
      serviceDate: ['', Validators.required]
    });
  }

  onSubmitUpdateService() {
    console.log(this.updatedServiceForm);
    this.serviceService.updateService(this.updatedServiceForm.value).subscribe(
      (res) =>{
        console.log(res);
      } ,
      (err : HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  buildFormDeleteService() {
    this.deletedServiceForm = this.fb.group({
      id: ['', Validators.nullValidator]
    });
  }

  onSubmitDeleteService() {
    console.log(this.deletedServiceForm);
    this.serviceService.deleteService(this.deletedServiceForm.value['id']).subscribe(
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


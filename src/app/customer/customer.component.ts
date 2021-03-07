import { CustomerService } from './../core/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../shared/models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  closeResult = '';
  customers: Customer[] = [];
  addedCustomerForm!: FormGroup;
  updatedCustomerForm!: FormGroup;
  deletedCustomerForm!: FormGroup;

  constructor(private customerService : CustomerService
    , private modalService: NgbModal
    , private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.customerService.listAllCustomers().subscribe(
      r => {
        this.customers = r;
      }
    )
    this.buildFormAddCustomer();
    this.buildFormUpdateCustomer();
    this.buildFormDeleteCustomer();
  }


  buildFormAddCustomer() {
    this.addedCustomerForm = this.fb.group({
      // id: ['', Validators.nullValidator],
      roomNo: ['15', Validators.required],
      cName: ['Yum', Validators.required],
      address: ['89 St', Validators.required],
      phone: ['6546589614', Validators.required],
      email: ['yun@gmail.com', Validators.required],
      checkin: ['', Validators.required],
      totalPersons: ['1', Validators.required],
      bookingDays: ['1', Validators.required],
      advance: ['50', Validators.required]
    });
  }

  onSubmitAddCustomer() {
    console.log(this.addedCustomerForm);
    this.customerService.addCustomer(this.addedCustomerForm.value).subscribe(
      (res) =>{
        console.log(res);
      } ,
      (err : HttpErrorResponse) => {
        console.log(err);
      }
    );
  }


  buildFormUpdateCustomer() {
    this.updatedCustomerForm = this.fb.group({
      id: ['13', Validators.nullValidator],
      roomNo: ['15', Validators.required],
      cName: ['Yum', Validators.required],
      address: ['89 D St', Validators.required],
      phone: ['6546589614', Validators.required],
      email: ['yun@gmail.com', Validators.required],
      checkin: ['', Validators.required],
      totalPersons: ['1', Validators.required],
      bookingDays: ['1', Validators.required],
      advance: ['50', Validators.required]
    });
  }

  onSubmitUpdateCustomer() {
    console.log(this.updatedCustomerForm);
    this.customerService.updateCustomer(this.updatedCustomerForm.value).subscribe(
      (res) =>{
        console.log(res);
      } ,
      (err : HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  buildFormDeleteCustomer() {
    this.deletedCustomerForm = this.fb.group({
      id: ['', Validators.nullValidator]
    });
  }

  onSubmitDeleteCustomer() {
    console.log(this.deletedCustomerForm);
    this.customerService.deleteCustomer(this.deletedCustomerForm.value['id']).subscribe(
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


import { CustomerService } from './../core/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../shared/models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      roomNo: ['', Validators.required],
      cName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      checkin: ['', Validators.required],
      totalPersons: ['', Validators.required],
      bookingDays: ['', Validators.required],
      advance: ['', Validators.required]
    });
  }

  onSubmitAddCustomer() {
    console.log(this.addedCustomerForm)
    this.customerService.addCustomer(this.addedCustomerForm.value);
  }


  buildFormUpdateCustomer() {
    this.updatedCustomerForm = this.fb.group({
      id: ['', Validators.nullValidator],
      roomNo: ['', Validators.required],
      cName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      checkin: ['', Validators.required],
      totalPersons: ['', Validators.required],
      bookingDays: ['', Validators.required],
      advance: ['', Validators.required]
    });
  }

  onSubmitUpdateCustomer() {
    console.log(this.updatedCustomerForm)
    this.customerService.updateCustomer(this.updatedCustomerForm.value);
  }

  buildFormDeleteCustomer() {
    this.deletedCustomerForm = this.fb.group({
      id: ['', Validators.nullValidator]
    });
  }

  onSubmitDeleteCustomer() {
    console.log(this.deletedCustomerForm)
    this.customerService.deleteCustomer(this.deletedCustomerForm.value);
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


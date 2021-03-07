import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers: Customer[] =[];

  constructor(private apiService:ApiService) { }

  listAllCustomers(): Observable<Customer[]> {
    return this.apiService.listAll('customer');
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.apiService.create('customer/update', customer);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.apiService.create('customer/add', customer);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.apiService.create('customer/delete', id);
  }
}

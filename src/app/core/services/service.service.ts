import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/shared/models/service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  services: Service[] =[];

  constructor(private apiService:ApiService) { }

  listAllServices(): Observable<Service[]> {
    return this.apiService.listAll('service');
  }

  updateService(updatedRoomType: Service): Observable<Service> {
    return this.apiService.create('service/update', updatedRoomType);
  }

  addService(addedService: Service): Observable<Service> {
    return this.apiService.create('service/add', addedService);
  }

  deleteService(id: number): Observable<Service> {
    return this.apiService.create('service/delete', id);
  }
}

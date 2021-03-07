import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { RoomType } from 'src/app/shared/models/roomtype';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {

  roomtypes: RoomType[] =[];

  constructor(private apiService:ApiService) { }

  listAllRoomTypes(): Observable<RoomType[]> {
    return this.apiService.listAll('roomtype');
  }

  updateRoomType(updatedRoomType: RoomType): Observable<RoomType> {
    return this.apiService.create('roomtype/update', updatedRoomType);
  }

  addRoomType(addedRoomType: RoomType): Observable<RoomType> {
    return this.apiService.create('roomtype/add', addedRoomType);
  }

  deleteRoomType(id: number): Observable<RoomType> {
    return this.apiService.create('roomtype/delete', id);
  }
}

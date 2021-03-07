import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Room } from 'src/app/shared/models/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms: Room[] =[];
  
  constructor(private apiService: ApiService) { }

  listAllRooms(): Observable<Room[]> {
    return this.apiService.listAll('room');
  }

  updateRoom(updatedRoom: Room): Observable<Room> {
    return this.apiService.update('room/update', updatedRoom);
  }

  addRoom(addedRoom: Room): Observable<Room> {
    return this.apiService.create('room/add', addedRoom);
  }

  deleteRoom(id: number): Observable<Room> {
    return this.apiService.delete('room/delete', id);
  }

  listRoom(id: number): Observable<Room> {
    return this.apiService.getOne('room', id);
  }

  
}

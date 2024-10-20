import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../model/room.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-management',
  standalone: true, // Asegúrate de que esto esté presente si es un componente independiente
  imports: [CommonModule, RouterModule], // Asegúrate de que CommonModule esté importado aquí
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.list().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  deleteRoom(room: Room) {
    if (confirm(`¿Estás seguro de que deseas eliminar la habitación ${room.number}?`)) {
      this.roomService.delete(room.id).subscribe(() => {
        this.loadRooms(); // Recargar la lista después de eliminar
      });
    }
  }
}

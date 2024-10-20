import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { ClientService } from '../services/client.service';
import { RoomService } from '../services/room.service';
import { Client } from '../model/client.interface';
import { Room } from '../model/room.interface';
import { RouterModule } from '@angular/router'; // Asegúrate de tener esto

@Component({
  selector: 'app-client-room',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Importa CommonModule
  templateUrl: './client-room.component.html',
  styleUrls: ['./client-room.component.css'],
})
export class ClientRoomComponent implements OnInit {
  clients: Client[] = [];
  rooms: Room[] = [];

  constructor(
    private clientService: ClientService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.loadClients();
    this.loadRooms();
  }

  loadClients() {
    this.clientService.list().subscribe(
      (data: Client[]) => {
        this.clients = data;
        this.assignRoomsToClients(); // Llama a la función para asignar habitaciones
      },
      (error) => {
        console.error('Error al cargar los clientes', error);
      }
    );
  }

  assignRoomsToClients() {
    this.clients.forEach(client => {
      // Busca la habitación correspondiente en la lista de habitaciones
      client.room = this.rooms.find(room => room.id === client.roomId) || null;
    });
  }

  loadRooms() {
    this.roomService.list().subscribe(
      (data: Room[]) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Error al cargar las habitaciones', error);
      }
    );
  }

  deleteClient(client: Client) {
    if (confirm(`¿Estás seguro de que deseas eliminar al cliente ${client.name}?`)) {
      this.clientService.delete(client.id).subscribe(() => {
        this.loadClients();
      });
    }
  }

  trackById(_index: number, client: Client): number {
    return client.id;
  }
}

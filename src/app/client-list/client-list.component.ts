import { DatePipe } from '@angular/common';
import { ClientService } from './../services/client.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Client } from '../model/client.interface';
import { CommonModule } from '@angular/common';  // Importa CommonModule aquí


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],  // Agrega CommonModule aquí
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  private clientService = inject(ClientService);

  clients: Client[] = [];

  ngOnInit(): void {
    this.loadALL();
  }

  loadALL() {
    this.clientService.list()
      .subscribe(clients => {
        this.clients = clients;
      });
  }

  deleteClient(client: Client) {
    this.clientService.delete(client.id)
      .subscribe(() => {
        this.loadALL();
      });
  }
}



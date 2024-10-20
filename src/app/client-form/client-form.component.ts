import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { RoomService } from '../services/room.service';
import { Client } from '../model/client.interface';
import { Room } from '../model/room.interface';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clientService = inject(ClientService);
  private roomService = inject(RoomService);

  form!: FormGroup;
  client: Client = { id: 0, name: '', email: '', createAt: new Date(), reservation: null, roomId: undefined, room: null, habitacion: 112, cedula: '', ciudadD: '', number: ''};
  rooms: Room[] = [];
  isEditMode: boolean = false;
  roomOccupied: boolean = false;

  ngOnInit(): void {
    this.loadRooms();
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.clientService.get(parseInt(id)).subscribe(client => {
        this.client = client;
        this.form = this.fb.group({
          name: [client.name, Validators.required],
          email: [client.email, [Validators.required, Validators.email]],
          roomId: [client.room?.id || '', Validators.required],
          number: [client.number, [Validators.required, ]],
          cedula: [client.cedula, [Validators.required]], // Nuevo campo cedula
          ciudadD: [client.ciudadD, [Validators.required]] // Nuevo campo ciudadD
        });

        // Verificar si la habitación está ocupada al cargar el cliente
        if (this.client.room?.id) {
          this.checkRoomOccupied(this.client.room.id);
        }
      });
    } else {
      this.isEditMode = false;
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        roomId: ['', Validators.required],
        cedula: ['', [Validators.required]], // Nuevo campo cedula
        ciudadD: ['', [Validators.required]], // Nuevo campo ciudadD
        number: ['', [Validators.required]]
      });
    }

    // Suscribirse a los cambios en el campo de habitación
    this.form.get('roomId')?.valueChanges.subscribe(roomId => {
      console.log('Room ID seleccionado:', roomId); // Agrega este log
      if (roomId) {
        this.checkRoomOccupied(roomId);
      } else {
        this.roomOccupied = false; // Reiniciar si no hay habitación seleccionada
      }
    });
  }

  loadRooms() {
    this.roomService.list().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });
  }

  checkRoomOccupied(roomId: number) {
    this.clientService.list().subscribe((clients: Client[]) => {
      console.log('Clientes recuperados:', clients); // Agrega este log
      this.roomOccupied = clients.some(client => client.roomId === roomId && client.id !== this.client.id);
      console.log('Room occupied:', this.roomOccupied); // Agrega este log
    });
  }

  save() {
    const clientForm = this.form.value;

    // Verificar que roomId no sea nulo
    if (!clientForm.roomId) {
      console.error('Error: Room ID is null');
      alert('Por favor, seleccione una habitación.');
      return;
    }

    // Verificar si la habitación está ocupada
    if (this.roomOccupied) {
      alert('La habitación ya está ocupada por otro cliente.'); // Muestra el mensaje de advertencia
      return; // No continuar con la creación del cliente
    }

    // Si estamos en modo edición, actualizamos el cliente existente
    if (this.isEditMode) {
      this.clientService.update(this.client.id, { ...clientForm, roomId: clientForm.roomId })
        .subscribe({
          next: () => {
            console.log('Cliente actualizado correctamente');
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error al actualizar cliente:', error);
          }
        });
    } else {
      // Si no estamos en modo edición, creamos un nuevo cliente
      this.clientService.create({ ...clientForm, roomId: clientForm.roomId })
        .subscribe({
          next: () => {
            console.log('Cliente creado correctamente');
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error al crear cliente:', error);
          }
        });
    }
  }
}

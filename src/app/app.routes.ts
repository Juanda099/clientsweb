import { Routes } from '@angular/router';
import { RoomManagementComponent } from './room-management/room-management.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./client-list/client-list.component').then(m => m.ClientListComponent), // Lista de clientes
  },
  {
    path: 'new',
    loadComponent: () => import('./client-form/client-form.component').then(m => m.ClientFormComponent), // Formulario para nuevo cliente
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./client-form/client-form.component').then(m => m.ClientFormComponent), // Editar cliente existente
  },
  {
    path: 'rooms',
    loadComponent: () => import('./client-room/client-room.component').then(m => m.ClientRoomComponent), // Ruta para la gestión de habitaciones
  },
  {
    path: 'rooms/manage',
    loadComponent: () => import('./room-management/room-management.component').then(m => m.RoomManagementComponent), // Gestión de habitaciones
  },
  {
    path: 'rooms/new',
    loadComponent: () => import('./room-form.component/room-form.component.component').then(m => m.RoomFormComponent) // Ruta para crear nueva habitación
  },
  {
    path: 'rooms/:id/edit',
    loadComponent: () => import('./room-form.component/room-form.component.component').then(m => m.RoomFormComponent) // Ruta para editar habitación
  },
  {
    path: ':id/reservations',
    loadComponent: () => import('./reservation-list/reservation-list.component').then(m => m.ReservationListComponent), // Gestionar reservas para un cliente específico
  },
  {
    path: ':id/reservations/new',
    loadComponent: () => import('./reservation-form/reservation-form.component').then(m => m.ReservationFormComponent), // Nueva reservación para un cliente específico
  },
  {
    path: ':id/reservations/:reservationId/edit',
    loadComponent: () => import('./reservation-form/reservation-form.component').then(m => m.ReservationFormComponent), // Editar una reservación existente para un cliente
  },
];


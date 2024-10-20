import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from './../services/reservation.service';

@Component({
  selector: 'app-client-reservation',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'], // Cambia 'styleUrl' a 'styleUrls'
  standalone: true,
})
export class ReservationListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private reservationService = inject(ReservationService);

  clientId!: number;
  reservation: any; // Define el tipo apropiado según tu modelo

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadReservation();
  }


  // Métodos para crear, actualizar o eliminar reservas pueden ir aquí
  loadReservation() {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservation = reservations.filter(r => this.clientId === this.clientId);
      // Maneja la reserva como desees. Por ejemplo, puedes mostrarla en la vista.
    }, error => {
      console.error('Error al cargar las reservas:', error);
    });
  }

}

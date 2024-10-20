import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from './../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true, // Añadir esta línea
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export default class ReservationListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private reservationService = inject(ReservationService);

  
  clientId!: number;
  reservation: any; // Define el tipo apropiado según tu modelo

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadReservation();
  }

  loadReservation() {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservation = reservations.filter(r => r.clientId === this.clientId);
    }, error => {
      console.error('Error al cargar las reservas:', error);
    });
  }
}



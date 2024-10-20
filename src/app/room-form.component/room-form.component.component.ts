import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../model/room.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-form',
  standalone: true,
  templateUrl: './room-form.component.component.html', // Asegúrate de que el nombre del archivo sea correcto
  styleUrls: ['./room-form.component.component.css'],   // Asegúrate de que el nombre del archivo sea correcto
  imports: [ReactiveFormsModule, CommonModule]
})
export class RoomFormComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;
  roomId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {
    this.form = this.fb.group({
      number: ['', Validators.required],
      status: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.roomId) {
      this.isEditMode = true;
      this.loadRoom(this.roomId);
    }
  }

  loadRoom(id: number) {
    this.roomService.get(id).subscribe(room => {
      this.form.patchValue(room);
    });
  }

  save() {
    if (this.form.valid) {
      if (this.isEditMode) {
        this.roomService.update(this.roomId!, this.form.value).subscribe(() => {
          this.router.navigate(['/rooms']); // Cambia a la ruta de lista de habitaciones
        });
      } else {
        this.roomService.add(this.form.value).subscribe(() => {
          this.router.navigate(['/rooms']); // Cambia a la ruta de lista de habitaciones
        });
      }
    }
  }
}

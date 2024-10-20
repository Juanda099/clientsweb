import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientRoomComponent } from './client-room.component';
import { CommonModule } from '@angular/common';

describe('ClientRoomComponent', () => {
  let component: ClientRoomComponent;
  let fixture: ComponentFixture<ClientRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ClientRoomComponent]  // Agregamos CommonModule en las pruebas
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

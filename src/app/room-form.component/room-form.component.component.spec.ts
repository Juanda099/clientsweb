import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFormComponentComponent } from './room-form.component.component';

describe('RoomFormComponentComponent', () => {
  let component: RoomFormComponentComponent;
  let fixture: ComponentFixture<RoomFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

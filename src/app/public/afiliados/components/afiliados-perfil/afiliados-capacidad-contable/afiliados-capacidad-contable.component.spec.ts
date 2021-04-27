import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosCapacidadContableComponent } from './afiliados-capacidad-contable.component';

describe('AfiliadosCapacidadContableComponent', () => {
  let component: AfiliadosCapacidadContableComponent;
  let fixture: ComponentFixture<AfiliadosCapacidadContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosCapacidadContableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosCapacidadContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

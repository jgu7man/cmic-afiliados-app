import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSolicitudesClientesComponent } from './admin-solicitudes-clientes.component';

describe('AdminSolicitudesClientesComponent', () => {
  let component: AdminSolicitudesClientesComponent;
  let fixture: ComponentFixture<AdminSolicitudesClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSolicitudesClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSolicitudesClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

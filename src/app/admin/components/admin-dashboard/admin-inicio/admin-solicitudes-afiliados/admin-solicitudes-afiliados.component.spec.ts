import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSolicitudesAfiliadosComponent } from './admin-solicitudes-afiliados.component';

describe('AdminSolicitudesAfiliadosComponent', () => {
  let component: AdminSolicitudesAfiliadosComponent;
  let fixture: ComponentFixture<AdminSolicitudesAfiliadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSolicitudesAfiliadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSolicitudesAfiliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

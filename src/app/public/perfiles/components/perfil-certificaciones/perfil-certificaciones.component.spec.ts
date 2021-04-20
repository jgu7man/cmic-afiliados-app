import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCertificacionesComponent } from './perfil-certificaciones.component';

describe('PerfilCertificacionesComponent', () => {
  let component: PerfilCertificacionesComponent;
  let fixture: ComponentFixture<PerfilCertificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilCertificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCertificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

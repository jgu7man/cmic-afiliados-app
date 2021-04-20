import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosCertificacionesEspecializacionesComponent } from './afiliados-certificaciones-especializaciones.component';

describe('AfiliadosCertificacionesEspecializacionesComponent', () => {
  let component: AfiliadosCertificacionesEspecializacionesComponent;
  let fixture: ComponentFixture<AfiliadosCertificacionesEspecializacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosCertificacionesEspecializacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosCertificacionesEspecializacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

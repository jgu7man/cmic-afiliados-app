import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosEquipoMaquinariaComponent } from './afiliados-equipo-maquinaria.component';

describe('AfiliadosEquipoMaquinariaComponent', () => {
  let component: AfiliadosEquipoMaquinariaComponent;
  let fixture: ComponentFixture<AfiliadosEquipoMaquinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosEquipoMaquinariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosEquipoMaquinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

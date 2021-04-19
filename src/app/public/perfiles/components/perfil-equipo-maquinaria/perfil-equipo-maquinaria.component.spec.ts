import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEquipoMaquinariaComponent } from './perfil-equipo-maquinaria.component';

describe('PerfilEquipoMaquinariaComponent', () => {
  let component: PerfilEquipoMaquinariaComponent;
  let fixture: ComponentFixture<PerfilEquipoMaquinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilEquipoMaquinariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEquipoMaquinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilExperienciaComponent } from './perfil-experiencia.component';

describe('PerfilExperienciaComponent', () => {
  let component: PerfilExperienciaComponent;
  let fixture: ComponentFixture<PerfilExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

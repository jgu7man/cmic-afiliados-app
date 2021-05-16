import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEspecialidadComponent } from './catalogo-especialidad.component';

describe('CatalogoEspecialidadComponent', () => {
  let component: CatalogoEspecialidadComponent;
  let fixture: ComponentFixture<CatalogoEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

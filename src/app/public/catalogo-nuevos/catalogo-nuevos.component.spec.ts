import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoNuevosComponent } from './catalogo-nuevos.component';

describe('CatalogoNuevosComponent', () => {
  let component: CatalogoNuevosComponent;
  let fixture: ComponentFixture<CatalogoNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoNuevosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

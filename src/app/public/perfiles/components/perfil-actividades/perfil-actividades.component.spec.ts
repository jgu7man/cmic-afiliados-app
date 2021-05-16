import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilActividadesComponent } from './perfil-actividades.component';

describe('PerfilActividadesComponent', () => {
  let component: PerfilActividadesComponent;
  let fixture: ComponentFixture<PerfilActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

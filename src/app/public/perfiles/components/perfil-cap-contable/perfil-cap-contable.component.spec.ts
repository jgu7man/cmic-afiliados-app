import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCapContableComponent } from './perfil-cap-contable.component';

describe('PerfilCapContableComponent', () => {
  let component: PerfilCapContableComponent;
  let fixture: ComponentFixture<PerfilCapContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilCapContableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCapContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

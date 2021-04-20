import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilRecursosHumanosComponent } from './perfil-recursos-humanos.component';

describe('PerfilRecursosHumanosComponent', () => {
  let component: PerfilRecursosHumanosComponent;
  let fixture: ComponentFixture<PerfilRecursosHumanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilRecursosHumanosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilRecursosHumanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

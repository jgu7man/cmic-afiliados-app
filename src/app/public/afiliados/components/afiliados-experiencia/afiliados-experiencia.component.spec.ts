import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosExperienciaComponent } from './afiliados-experiencia.component';

describe('AfiliadosExperienciaComponent', () => {
  let component: AfiliadosExperienciaComponent;
  let fixture: ComponentFixture<AfiliadosExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

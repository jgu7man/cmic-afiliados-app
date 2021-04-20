import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosPerfilComponent } from './afiliados-perfil.component';

describe('AfiliadosPerfilComponent', () => {
  let component: AfiliadosPerfilComponent;
  let fixture: ComponentFixture<AfiliadosPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

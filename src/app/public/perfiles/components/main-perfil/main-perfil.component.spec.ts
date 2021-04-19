import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPerfilComponent } from './main-perfil.component';

describe('MainPerfilComponent', () => {
  let component: MainPerfilComponent;
  let fixture: ComponentFixture<MainPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

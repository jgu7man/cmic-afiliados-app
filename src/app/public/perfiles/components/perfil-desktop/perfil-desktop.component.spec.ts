import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDesktopComponent } from './perfil-desktop.component';

describe('PerfilDesktopComponent', () => {
  let component: PerfilDesktopComponent;
  let fixture: ComponentFixture<PerfilDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

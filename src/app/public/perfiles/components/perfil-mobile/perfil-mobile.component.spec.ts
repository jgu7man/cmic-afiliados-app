import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMobileComponent } from './perfil-mobile.component';

describe('PerfilMobileComponent', () => {
  let component: PerfilMobileComponent;
  let fixture: ComponentFixture<PerfilMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

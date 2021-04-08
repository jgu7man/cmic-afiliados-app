import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosLoginComponent } from './afiliados-login.component';

describe('AfiliadosLoginComponent', () => {
  let component: AfiliadosLoginComponent;
  let fixture: ComponentFixture<AfiliadosLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosPersonalFormComponent } from './afiliados-personal-form.component';

describe('AfiliadosPersonalFormComponent', () => {
  let component: AfiliadosPersonalFormComponent;
  let fixture: ComponentFixture<AfiliadosPersonalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosPersonalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosPersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

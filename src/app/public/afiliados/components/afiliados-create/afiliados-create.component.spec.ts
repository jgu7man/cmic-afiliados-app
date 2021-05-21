import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosCreateComponent } from './afiliados-create.component';

describe('AfiliadosCreateComponent', () => {
  let component: AfiliadosCreateComponent;
  let fixture: ComponentFixture<AfiliadosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesFormComponent } from './datos-generales-form.component';

describe('DatosGeneralesFormComponent', () => {
  let component: DatosGeneralesFormComponent;
  let fixture: ComponentFixture<DatosGeneralesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosGeneralesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesSelectorComponent } from './actividades-selector.component';

describe('ActividadesSelectorComponent', () => {
  let component: ActividadesSelectorComponent;
  let fixture: ComponentFixture<ActividadesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

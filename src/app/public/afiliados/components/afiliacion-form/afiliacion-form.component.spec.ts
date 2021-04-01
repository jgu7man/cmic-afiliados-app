import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliacionFormComponent } from './afiliacion-form.component';

describe('AfiliacionFormComponent', () => {
  let component: AfiliacionFormComponent;
  let fixture: ComponentFixture<AfiliacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliacionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

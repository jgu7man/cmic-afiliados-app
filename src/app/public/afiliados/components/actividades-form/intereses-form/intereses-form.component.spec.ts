import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresesFormComponent } from './intereses-form.component';

describe('InteresesFormComponent', () => {
  let component: InteresesFormComponent;
  let fixture: ComponentFixture<InteresesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteresesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteresesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

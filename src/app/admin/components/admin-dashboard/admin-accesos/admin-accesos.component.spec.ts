import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccesosComponent } from './admin-accesos.component';

describe('AdminAccesosComponent', () => {
  let component: AdminAccesosComponent;
  let fixture: ComponentFixture<AdminAccesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAccesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

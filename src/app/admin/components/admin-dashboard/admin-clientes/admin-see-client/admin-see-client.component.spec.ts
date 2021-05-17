import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeeClientComponent } from './admin-see-client.component';

describe('AdminSeeClientComponent', () => {
  let component: AdminSeeClientComponent;
  let fixture: ComponentFixture<AdminSeeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSeeClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

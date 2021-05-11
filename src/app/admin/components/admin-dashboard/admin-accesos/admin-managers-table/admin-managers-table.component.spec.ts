import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagersTableComponent } from './admin-managers-table.component';

describe('AdminAfiliadosTableComponent', () => {
  let component: AdminManagersTableComponent;
  let fixture: ComponentFixture<AdminManagersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManagersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientesTableComponent } from './admin-clientes-table.component';

describe('AdminClientesTableComponent', () => {
  let component: AdminClientesTableComponent;
  let fixture: ComponentFixture<AdminClientesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClientesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

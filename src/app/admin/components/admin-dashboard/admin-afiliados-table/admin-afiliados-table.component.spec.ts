import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAfiliadosTableComponent } from './admin-afiliados-table.component';

describe('AdminAfiliadosTableComponent', () => {
  let component: AdminAfiliadosTableComponent;
  let fixture: ComponentFixture<AdminAfiliadosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAfiliadosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAfiliadosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

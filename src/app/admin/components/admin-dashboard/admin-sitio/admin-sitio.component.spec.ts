import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSitioComponent } from './admin-sitio.component';

describe('AdminSitioComponent', () => {
  let component: AdminSitioComponent;
  let fixture: ComponentFixture<AdminSitioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSitioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

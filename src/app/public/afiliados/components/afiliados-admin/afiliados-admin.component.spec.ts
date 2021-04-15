import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosAdminComponent } from './afiliados-admin.component';

describe('AfiliadosAdminComponent', () => {
  let component: AfiliadosAdminComponent;
  let fixture: ComponentFixture<AfiliadosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

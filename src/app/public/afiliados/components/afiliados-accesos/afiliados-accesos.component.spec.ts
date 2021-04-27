import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosAccesosComponent } from './afiliados-accesos.component';

describe('AfiliadosAccesosComponent', () => {
  let component: AfiliadosAccesosComponent;
  let fixture: ComponentFixture<AfiliadosAccesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosAccesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosAccesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

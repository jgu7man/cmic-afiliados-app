import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosRecursosHumanosComponent } from './afiliados-recursos-humanos.component';

describe('AfiliadosRecursosHumanosComponent', () => {
  let component: AfiliadosRecursosHumanosComponent;
  let fixture: ComponentFixture<AfiliadosRecursosHumanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosRecursosHumanosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosRecursosHumanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosRegistroComponent } from './afiliados-registro.component';

describe('AfiliadosRegistroComponent', () => {
  let component: AfiliadosRegistroComponent;
  let fixture: ComponentFixture<AfiliadosRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadosRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadosRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

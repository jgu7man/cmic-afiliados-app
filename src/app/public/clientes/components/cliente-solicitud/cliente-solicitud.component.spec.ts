import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSolicitudComponent } from './cliente-solicitud.component';

describe('ClienteSolicitudComponent', () => {
  let component: ClienteSolicitudComponent;
  let fixture: ComponentFixture<ClienteSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRevokeAccesoComponent } from './dialog-revoke-acceso.component';

describe('DialogRevokeAccesoComponent', () => {
  let component: DialogRevokeAccesoComponent;
  let fixture: ComponentFixture<DialogRevokeAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRevokeAccesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRevokeAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

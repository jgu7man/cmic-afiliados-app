import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClienteLoginComponent } from './dialog-cliente-login.component';

describe('DialogClienteLoginComponent', () => {
  let component: DialogClienteLoginComponent;
  let fixture: ComponentFixture<DialogClienteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClienteLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClienteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

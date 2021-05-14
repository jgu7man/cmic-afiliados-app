import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAceptClientComponent } from './dialog-acept-client.component';

describe('DialogAceptClientComponent', () => {
  let component: DialogAceptClientComponent;
  let fixture: ComponentFixture<DialogAceptClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAceptClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAceptClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

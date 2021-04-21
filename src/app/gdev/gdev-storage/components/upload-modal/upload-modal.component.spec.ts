import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdevUploadModalComponent } from './upload-modal.component';

describe('UploadModalComponent', () => {
  let component: GdevUploadModalComponent;
  let fixture: ComponentFixture<GdevUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdevUploadModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GdevUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

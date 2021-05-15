import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingSpinnerComponent } from './uploading-spinner.component';

describe('UploadingSpinnerComponent', () => {
  let component: UploadingSpinnerComponent;
  let fixture: ComponentFixture<UploadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

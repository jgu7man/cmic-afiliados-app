import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { MaterialModule } from 'src/shared/material.module';
import { GdevUploadModalComponent } from './components/upload-modal/upload-modal.component';
import { UploadingSpinnerComponent } from './components/uploading-spinner/uploading-spinner.component';

@NgModule({
  declarations: [UploadFilesComponent, GdevUploadModalComponent, UploadingSpinnerComponent],
  imports: [CommonModule, NgxDropzoneModule, MaterialModule],
  exports: [UploadFilesComponent, GdevUploadModalComponent],
})
export class GdevStorageModule {}

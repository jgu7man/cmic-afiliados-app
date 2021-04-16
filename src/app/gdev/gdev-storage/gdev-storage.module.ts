import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { MaterialModule } from 'src/shared/material.module';



@NgModule({
  declarations: [UploadFilesComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    MaterialModule
  ],
  exports: [UploadFilesComponent]
})
export class GdevStorageModule { }

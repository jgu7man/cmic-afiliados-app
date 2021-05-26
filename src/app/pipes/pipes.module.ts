import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './timestamp.pipe';
import { ComercialNamePipe } from './comercial-name.pipe';
import { CutTextPipe } from './cut-text.pipe';



@NgModule({
  declarations: [TimestampPipe, ComercialNamePipe, CutTextPipe],
  imports: [
    CommonModule
  ],
  exports: [TimestampPipe, ComercialNamePipe, CutTextPipe]
})
export class PipesModule { }

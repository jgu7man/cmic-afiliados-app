import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxAuthModule } from '@marxa/auth';
import { GdevStorageModule } from './gdev-storage/gdev-storage.module';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MaterialModule } from 'src/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GdevSliderModule } from './slider/gdev-slider.module';
import { ListCrudModule } from './list-crud/list-crud.module';



@NgModule({
  declarations: [
    YearSelectorComponent
  ],
  imports: [
    CommonModule,
    GdevStorageModule,
    MomentDateModule,
    MaterialModule,
    // FormsModule,
    ReactiveFormsModule,
    GdevSliderModule,
    ListCrudModule
  ],
  exports: [
    GdevStorageModule,
    MxAuthModule,
    YearSelectorComponent,
    GdevSliderModule,
    ListCrudModule
  ]
})
export class GdevModule { }

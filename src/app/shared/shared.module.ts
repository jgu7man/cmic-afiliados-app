import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MaterialModule } from 'src/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCrudModule } from './list-crud/list-crud.module';
import { MxAuthModule } from '@marxa/auth';
import { GdevSliderModule } from './slider/gdev-slider.module';



@NgModule({
  declarations: [
    YearSelectorComponent
  ],
  imports: [
    CommonModule,
    MomentDateModule,
    MaterialModule,
    ReactiveFormsModule,
    GdevSliderModule,
    ListCrudModule
  ],
  exports: [
    MxAuthModule,
    YearSelectorComponent,
    GdevSliderModule,
    ListCrudModule
  ]
})
export class SharedModule { }

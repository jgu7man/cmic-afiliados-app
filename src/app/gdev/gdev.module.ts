import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdevAlertModule } from 'gdev-alert';
import { GdevAuthModule } from 'gdev-auth';
import { GdevCacheModule } from 'gdev-cache';
import { GdevLoadingModule } from 'gdev-loading';
import { GdevResponsiveModule } from 'gdev-responsive';
import { GdevStorageModule } from './gdev-storage/gdev-storage.module';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MaterialModule } from 'src/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    GdevAlertModule,
    GdevAuthModule,
    GdevCacheModule,
    GdevLoadingModule,
    GdevResponsiveModule,
    YearSelectorComponent,
    GdevSliderModule,
    ListCrudModule
  ]
})
export class GdevModule { }

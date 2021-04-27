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
    ReactiveFormsModule
  ],
  exports: [
    GdevAlertModule,
    GdevAuthModule,
    GdevCacheModule,
    GdevLoadingModule,
    GdevResponsiveModule,
    YearSelectorComponent,
  ]
})
export class GdevModule { }

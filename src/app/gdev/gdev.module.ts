import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdevAlertModule } from 'gdev-alert';
import { GdevAuthModule } from 'gdev-auth';
import { GdevCacheModule } from 'gdev-cache';
import { GdevLoadingModule } from 'gdev-loading';
import { GdevResponsiveModule } from 'gdev-responsive';
import { GdevStorageModule } from './gdev-storage/gdev-storage.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GdevStorageModule,
  ], exports: [
    GdevAlertModule,
    GdevAuthModule,
    GdevCacheModule,
    GdevLoadingModule,
    GdevResponsiveModule,
  ]
})
export class GdevModule { }

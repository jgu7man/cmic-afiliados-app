import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from 'src/shared/firebase.module';
import { MaterialModule } from 'src/shared/material.module';
import { GdevModule } from './gdev/gdev.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseModule,
    MaterialModule,
    GdevModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

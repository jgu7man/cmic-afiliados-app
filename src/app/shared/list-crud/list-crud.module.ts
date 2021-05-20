import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCrudComponent } from './list-crud/list-crud.component';
import { DrawerTemplateDirective } from './drawer-template.directive';
import { MaterialModule } from 'src/shared/material.module';



@NgModule({
  declarations: [
    ListCrudComponent,
    DrawerTemplateDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ListCrudComponent,
  ]
})
export class ListCrudModule { }

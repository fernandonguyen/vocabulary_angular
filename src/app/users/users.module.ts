import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list.component';
import { LayoutComponent } from './layout.component';
import { AddEditComponent } from './add-edit.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListComponent, LayoutComponent, AddEditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FruitDashboardComponent } from '../_components/employee-dashboard/fruit-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FruitDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FruitDashboardComponent
  ]
})
export class FruitModule { }

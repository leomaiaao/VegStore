import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardComponent } from '../_components/employee-dashboard/employee-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    EmployeeDashboardComponent
  ]
})
export class EmployeeModule { }

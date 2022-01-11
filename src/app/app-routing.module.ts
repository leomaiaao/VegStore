import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './Employee/_components/employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './_login/login/login.component';
import { SignupComponent } from './_signup/signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'Employee', component:EmployeeDashboardComponent}
  //utilizar um guard com o canActivate para verificar se o usuário está presente ou não
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

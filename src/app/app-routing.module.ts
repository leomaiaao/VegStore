import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProductComponent } from './component/product/product.component';
import { FruitDashboardComponent } from './Employee/_components/employee-dashboard/fruit-dashboard.component';
import { GuardService } from './guard.service';
import { LoginComponent } from './_login/login/login.component';
import { SignupComponent } from './_signup/signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'fruit', component:FruitDashboardComponent, canActivate: [GuardService]},
  {path:'products', component:ProductComponent, canActivate: [GuardService]},
  {path: 'cart', component:CartComponent, canActivate: [GuardService]}

  //utilizar um guard com o canActivate para verificar se o usuário está presente ou não
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

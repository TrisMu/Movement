import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomScreenComponent } from './Components/hom-screen/hom-screen.component';
import { RegisterComponent } from './Components/register/register.component';
const routes: Routes = [
  {path: "register", component: LoginComponent},
  {path: "home", component: HomScreenComponent},
  {path: "login", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

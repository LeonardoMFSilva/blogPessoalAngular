import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [

  {path:"", redirectTo:"entrar", pathMatch:"full"},
  
  {path:"entrar", component: LoginComponent},
  {path: "cadastrar", component: SignupComponent},

  {path: "inicio", component: InicioComponent},

  {path: "tema", component: TemaComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 

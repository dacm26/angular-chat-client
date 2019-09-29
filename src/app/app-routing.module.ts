import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'sign-up',
  component: SignUpComponent
}, {
  path: 'rooms',
  component: RoomsComponent
}, {
  path: '', 
  redirectTo: 'login', 
  pathMatch: 'full'
}, {
  path: '**', 
  redirectTo: 'login', 
  pathMatch: 'full'
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthGuard } from '../shared/auth.guard';
import { UserLayoutComponent } from './user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {path:"",component:SignupComponent},
      {path:"signup",component:SignupComponent},
      {path:"login",component:LoginComponent},
      {path:"change-password",component:ChangePasswordComponent},
      {path:"forgot-password",component:ForgotPasswordComponent},
      {path:"reset-password",component:ResetPasswordComponent},
      {path:"profile",component:ProfileComponent, canActivate:[AuthGuard]},
      {path:"dashboard",component:DashboardComponent, canActivate:[AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

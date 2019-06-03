import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToItems = redirectLoggedInTo(['user/profile']);

const routes: Routes = [
  { path: 'user', children: [
    { path: 'login', component: LoginComponent },
    { path: 'reg', component: RegistrationComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AngularFireAuthGuard] },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

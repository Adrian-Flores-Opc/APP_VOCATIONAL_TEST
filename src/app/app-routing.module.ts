import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AuthGuardService } from './core/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo:'/Home', pathMatch:'full'},
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'Login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'Register', component: UserRegisterComponent, canActivate: [AuthGuardService] },
  { path: 'Dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule), canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

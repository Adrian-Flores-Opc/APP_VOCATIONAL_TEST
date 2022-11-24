import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AuthGuardService } from './core/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo:'/Home', pathMatch:'full'},
  { path: 'Home',canActivate: [AuthGuardService], component: HomeComponent  },
  { path: 'Login',canActivate: [AuthGuardService], component: LoginComponent },
  { path: 'Register',canActivate: [AuthGuardService],  component: UserRegisterComponent},
  { path: 'Dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule), canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

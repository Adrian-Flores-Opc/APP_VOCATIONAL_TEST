import { ResultsComponent } from './results/results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TakeTestComponent } from './take-test/take-test.component';
import { CareersComponent } from './careers/careers.component';
import { AuthGuardService } from 'src/app/core/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:
  [
    { path: '', component: TakeTestComponent, canActivate: [AuthGuardService] },
    { path: 'Test', component: TakeTestComponent, canActivate: [AuthGuardService] },
    { path: 'Results', component: ResultsComponent, canActivate: [AuthGuardService] },
    { path: 'Careers', component: CareersComponent, canActivate: [AuthGuardService] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

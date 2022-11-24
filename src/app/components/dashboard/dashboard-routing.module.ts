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
    // { path: '', component: TakeTestComponent, canActivate: [AuthGuardService] },
    { path: 'Test', canActivate: [AuthGuardService],  component: TakeTestComponent },
    { path: 'Results',canActivate: [AuthGuardService],  component: ResultsComponent },
    { path: 'Careers', canActivate: [AuthGuardService],  component: CareersComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

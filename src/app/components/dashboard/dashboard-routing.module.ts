import { ResultsComponent } from './results/results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TakeTestComponent } from './take-test/take-test.component';
import { CareersComponent } from './careers/careers.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:
  [
    { path: '', component: TakeTestComponent },
    { path: 'Test', component: TakeTestComponent },
    { path: 'Results', component: ResultsComponent },
    { path: 'Careers', component: CareersComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

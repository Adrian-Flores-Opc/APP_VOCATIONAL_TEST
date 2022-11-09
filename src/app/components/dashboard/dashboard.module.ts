import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TakeTestComponent } from './take-test/take-test.component';
import { ResultsComponent } from './results/results.component';
import { CareersComponent } from './careers/careers.component';

import { SharedModule } from '../shared/shared.module';
import { MainNavComponent } from './main-nav/main-nav.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TakeTestComponent,
    ResultsComponent,
    CareersComponent,
    MainNavComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }

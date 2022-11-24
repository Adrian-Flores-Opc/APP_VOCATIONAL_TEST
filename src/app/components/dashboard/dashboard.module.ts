import { AppComponent } from './../../app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TakeTestComponent } from './take-test/take-test.component';
import { ResultsComponent } from './results/results.component';
import { CareersComponent } from './careers/careers.component';

import { SharedModule } from '../shared/shared.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { DialogComponent } from './dialog/dialog.component';
import { AccessService } from 'src/app/core/layout/access.service';
import { StorageService } from 'src/app/core/session/storage.service';
import { AuthGuardService } from 'src/app/core/auth/auth-guard.service';


@NgModule({
  declarations: [
    DashboardComponent,
    TakeTestComponent,
    ResultsComponent,
    CareersComponent,
    MainNavComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [ AccessService, StorageService, AuthGuardService ],
  bootstrap:[ AppComponent ]
})
export class DashboardModule { }

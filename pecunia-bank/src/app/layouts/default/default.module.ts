import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PassbookComponent } from 'src/app/modules/passbook/passbook.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule} from '@angular/material/sidenav';
import { AddAtmComponent } from 'src/app/modules/add-atm/add-atm.component'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BlockCardComponent } from 'src/app/modules/block-card/block-card.component';
import { AccountSummaryComponent } from 'src/app/modules/account-summary/account-summary.component';
import {  MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PassbookComponent,
    AddAtmComponent,
    BlockCardComponent,
    AccountSummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class DefaultModule { }

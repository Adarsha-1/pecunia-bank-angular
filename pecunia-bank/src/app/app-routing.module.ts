import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PassbookComponent } from './modules/passbook/passbook.component';
import { AddAtmComponent } from './modules/add-atm/add-atm.component'
import { BlockCardComponent } from './modules/block-card/block-card.component';
import { AccountSummaryComponent } from './modules/account-summary/account-summary.component';

const routes: Routes = [
  {path:'',component:DefaultComponent,
    children:[{
      path:'',component: DashboardComponent
    },
    {path:'add-atm',component:AddAtmComponent},
    {path:'block-card',component:BlockCardComponent},
    {path:'account-summary',component:AccountSummaryComponent},
    {path:'update-passbook',component:PassbookComponent}
]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

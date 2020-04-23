import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseraddComponent } from './useradd/useradd.component';
import { Routes, RouterModule } from '@angular/router';
import { UserinfosComponent } from './userinfos/userinfos.component';
import { StatisticsComponent } from './statistics/statistics.component';


const routes: Routes = [

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserinfoRoutingModule { }

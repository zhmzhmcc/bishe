import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component'
import { UserinfoComponent } from './pages/userinfo/userinfo/userinfo.component';
import { UserinfosComponent } from './pages/userinfo/userinfo/userinfos/userinfos.component';
import { UseraddComponent } from './pages/userinfo/userinfo/useradd/useradd.component';
import { StatisticsComponent } from './pages/userinfo/userinfo/statistics/statistics.component';
import { ExportdataComponent } from './pages/userinfo/userinfo/exportdata/exportdata.component';

const routes:Routes = [
  { path: '',redirectTo: '/login',pathMatch:'full' },//默认首页路径
  { path: 'login',component:LoginComponent},
  { 
    path: 'userinfo' ,
    component:UserinfoComponent,
    children:[
      {
        path:'userinfos',
        component:UserinfosComponent
      },
      {
        path:'useradd',
        component:UseraddComponent
      },
      {
        path:'statistic',
        component:StatisticsComponent
      },
      {
        path:'exportdata',
        component:ExportdataComponent
      },


    ]
  }
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) 
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

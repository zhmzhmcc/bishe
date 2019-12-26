import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserinfoComponent } from './pages/userinfo/userinfo/userinfo.component';
import { UserinfosComponent } from './pages/userinfo/userinfo/userinfos/userinfos.component';
import { UseraddComponent } from './pages/userinfo/userinfo/useradd/useradd.component';
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserinfoComponent,
    UserinfosComponent,
    UseraddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

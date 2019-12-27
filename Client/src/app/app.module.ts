import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';

import {DatePipe} from '@angular/common';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
// import { VehicleMoreDetailsComponent } from './vehicle/vehicle-more-details/vehicle-more-details.component';
// import { VehicleAddComponent } from './vehicle/vehicle-add/vehicle-add.component';









@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
    // VehicleMoreDetailsComponent,
    // VehicleAddComponent    
  ],
  providers: [
    DatePipe,
    {provide:HTTP_INTERCEPTORS, useClass:HttpIntercepterBasicAuthService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

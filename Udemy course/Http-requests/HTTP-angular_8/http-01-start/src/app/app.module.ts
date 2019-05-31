import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorsComponent } from './auth-interceptors/auth-interceptors.component';
import {LoggingInterceptorService} from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent, AuthInterceptorsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    // order of interceptors matters. Auth in this case will be first
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorsComponent, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}

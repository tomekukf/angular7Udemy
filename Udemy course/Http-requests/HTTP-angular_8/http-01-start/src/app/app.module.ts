import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorsComponent } from './auth-interceptors/auth-interceptors.component';

@NgModule({
  declarations: [AppComponent, AuthInterceptorsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorsComponent, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}

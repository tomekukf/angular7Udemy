import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChangeColorDirective } from './change-color.directive';
import { AppUnlessDirective } from './customStructuralDirective/app-unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChangeColorDirective,
    AppUnlessDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

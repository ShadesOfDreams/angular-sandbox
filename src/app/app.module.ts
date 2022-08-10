import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFindingsComponent } from './pages/angular-findings/angular-findings.component';
import { UserregistrationComponent } from './pages/angular-tests/reactive-form.component';
import { HomeComponent } from './pages/home/home.component';
import { JSFindingsComponent } from './pages/js-findings/js-findings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JSFindingsComponent,
    AngularFindingsComponent,
    UserregistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFindingsComponent } from './pages/angular-findings/angular-findings.component';
import { HomeComponent } from './pages/home/home.component';
import { JSFindingsComponent } from './pages/js-findings/js-findings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JSFindingsComponent,
    AngularFindingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

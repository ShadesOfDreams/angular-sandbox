import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFindingsComponent } from './pages/angular-findings/angular-findings.component';
import { UserregistrationComponent } from './pages/angular-tests/reactive-form.component';
import { HomeComponent } from './pages/home/home.component';
import { JSFindingsComponent } from './pages/js-findings/js-findings.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    data: {
      title: 'Home page'
    },
    component: HomeComponent
  },
  {
    path: 'js-findings',
    pathMatch: 'full',
    data: {
      title: 'JS findings'
    },
    component: JSFindingsComponent,
  },
  {
    path: 'angular-findings',
    pathMatch: 'full',
    data: {
      title: 'Angular findings'
    },
    component: AngularFindingsComponent,
  },
  {
    path: 'angular-test',
    component: UserregistrationComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { ContactComponent } from './feature/contact/contact.component';
import { AboutComponent } from './feature/about/about.component';
import { BmiCalculatorComponent } from './feature/bmi-calculator/bmi-calculator.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'bmi-calculator',
    component: BmiCalculatorComponent,
  },
  // {
  //   path: 'login',
  //   component: ContactComponent,
  // },
  // {
  //   path: 'register',
  //   component: ContactComponent,
  // },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

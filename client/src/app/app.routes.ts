import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { ContactComponent } from './feature/contact/contact.component';
import { AboutComponent } from './feature/about/about.component';
import { BmiCalculatorComponent } from './feature/bmi-calculator/bmi-calculator.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { RegisterComponent } from './feature/auth/components/register/register.component';
import { AuthGuard, loginRegisterGuard } from './core/guards';
import { TrainersComponent } from './feature/trainers/components/trainers/trainers.component';
import { PlansComponent } from './feature/plans/components/plans/plans.component';
import { AddPlanComponent } from './feature/plans/components/add-plan/add-plan.component';
import { EditPlanComponent } from './feature/plans/components/edit-plan/edit-plan.component';
import { EditTrainerComponent } from './feature/trainers/components/edit-trainer/edit-trainer.component';
import { AddTrainerComponent } from './feature/trainers/components/add-trainer/add-trainer.component';

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
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-plan',
    component: AddPlanComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-plan/:id',
    component: EditPlanComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'trainers',
    component: TrainersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-trainer',
    component: AddTrainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-trainer/:id',
    component: EditTrainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginRegisterGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

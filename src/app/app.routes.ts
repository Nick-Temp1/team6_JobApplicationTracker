import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Dashboard } from './pages/dashboard/dashboard';
import { AllApplications } from './pages/all-applications/all-applications';
import { Schedule } from './pages/schedule/schedule';
import { AddNewApplication } from './pages/add-new-application/add-new-application';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'dashboard', component: Dashboard },
  { path: 'all-applications', component: AllApplications },
  { path: 'schedule', component: Schedule },
  { path: 'add-new-application', component: AddNewApplication },
];

import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Dashboard } from './pages/dashboard/dashboard';
import { AllApplications } from './pages/all-applications/all-applications';
import { Schedule } from './pages/schedule/schedule';
import { AddNewApplication } from './pages/add-new-application/add-new-application';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'all-applications', component: AllApplications, canActivate: [authGuard] },
  { path: 'schedule', component: Schedule, canActivate: [authGuard] },
  { path: 'add-new-application', component: AddNewApplication, canActivate: [authGuard] },
];

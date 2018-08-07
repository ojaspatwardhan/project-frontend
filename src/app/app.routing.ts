import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'make-appointment', component: MakeAppointmentComponent },
  { path: 'admin-page', component: AdminPageComponent },
  { path: '**', component: HomePageComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

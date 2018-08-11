import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TechnicianPageComponent } from './technician-page/technician-page.component';
import { SymptomCheckerComponent } from './symptom-checker/symptom-checker.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'make-appointment', component: MakeAppointmentComponent },
  { path: 'admin-page', component: AdminPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'technician-page', component: TechnicianPageComponent },
  { path: 'symptom-checker', component: SymptomCheckerComponent },
  { path: 'services-page', component: ServicesPageComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', component: HomePageComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', component: HomePageComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

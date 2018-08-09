import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { AppointmentServiceClient } from './services/appointment.service.client';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceClient } from './services/user.service.client';
import { SymptomCheckerServiceClient } from './services/symptom-checker.service.client';


import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatListModule,
  MatDialogModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TechnicianPageComponent } from './technician-page/technician-page.component';
import { SymptomCheckerComponent } from './symptom-checker/symptom-checker.component';

import { FilterPipe} from './filters/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    FooterComponentComponent,
    MakeAppointmentComponent,
    AdminPageComponent,
    ProfilePageComponent,
    FilterPipe,
    TechnicianPageComponent,
    SymptomCheckerComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    DlDateTimePickerDateModule
  ],
  providers: [
    AppointmentServiceClient,
    UserServiceClient,
    SymptomCheckerServiceClient,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

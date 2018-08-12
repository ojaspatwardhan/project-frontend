import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule} from 'angular-webstorage-service';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { AppointmentServiceClient } from './services/appointment.service.client';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceClient } from './services/user.service.client';
import { SymptomCheckerServiceClient } from './services/symptom-checker.service.client';
import { EmailServiceClient } from './services/email.service.client';

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
import { ServicesPageComponent } from './services-page/services-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';


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
    SymptomCheckerComponent,
    ServicesPageComponent,
    ContactUsComponent,
    AboutUsComponent,
    EditUserComponent,
    CreateUserComponent
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
    DlDateTimePickerDateModule,
    StorageServiceModule
  ],
  providers: [
    AppointmentServiceClient,
    UserServiceClient,
    SymptomCheckerServiceClient,
    EmailServiceClient,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

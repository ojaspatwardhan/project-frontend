import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatListModule,
  MatDialogModule,
  MatIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    FooterComponentComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

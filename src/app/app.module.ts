import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService, ChatService } from './services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatDividerModule,
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

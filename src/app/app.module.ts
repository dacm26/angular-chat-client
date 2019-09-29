import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService, ChatService, RoomService, UserService } from './services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatDividerModule,
  MatListModule,
  MatDialogModule,
} from '@angular/material';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AuthInterceptor } from './interceptors';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    CreateRoomComponent,
    RoomsComponent
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
    MatListModule,
    MatDialogModule,    
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    CreateRoomComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    RoomService,
    AuthService,
    ChatService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

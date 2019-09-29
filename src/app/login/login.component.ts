import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.authService.login(this.getCredentials(), (error, response) => {
      console.log({
        error,
        response
      });
      if (error) {
        this.snackbar.open(error.error, '', {
          duration: 3500,
        });
      } else {
        // redirect to chat
        this.snackbar.open('Welcome!', '', {
          duration: 3500,
        });
      }
    });
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  private getCredentials(): Object {
    const credentials = {
      data: {
        password: this.loginForm.get('password').value,
        username: this.loginForm.get('username').value
      }
    };
    return credentials;
  }
}

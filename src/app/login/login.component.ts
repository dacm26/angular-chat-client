import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';

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
    this.error = '';
    this.authService.login(this.getCredentials(), (error, response) => {
      console.log({
        error,
        response
      });
      if (error) {
        this.error = error.error
      } else {
        // redirect to chat
      }
    });
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

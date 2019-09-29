import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../services';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../app.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'age': ['', Validators.required],
      'username': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp() {
    this.userService.signUp(this.getData()).subscribe((response) => {
      if (!response) {
        this.snackbar.open('Username already taken', '', {
          duration: 3500,
        });
      } else {
        this.snackbar.open('Sign up complete', '', {
          duration: 3500,
        });
        this.router.navigate(['/login']);
      } 
    });
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }

  private getData(): Object {
    const credentials = {
      data: {
        firstName: this.signUpForm.get('firstName').value,
        lastName: this.signUpForm.get('lastName').value,
        age: this.signUpForm.get('age').value,
        password: this.signUpForm.get('password').value,
        username: this.signUpForm.get('username').value
      }
    };
    return credentials;
  }
}

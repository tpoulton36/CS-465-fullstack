import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Authentication } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  public formError = '';

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) {}

  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      return;
    }

    this.doLogin();
  }

  private doLogin(): void {
    const user = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    this.authenticationService.login(user, this.credentials.password).subscribe({
      next: () => {
        window.location.href = '/';
      },
      error: () => {
        this.formError = 'Login failed. Please check your email and password.';
      }
    });
  }
}
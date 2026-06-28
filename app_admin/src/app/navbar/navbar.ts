import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(
    public authenticationService: Authentication,
    public router: Router
  ) {}

  public logout(): void {
    this.authenticationService.logout();
    window.location.href = '/';
  }
}
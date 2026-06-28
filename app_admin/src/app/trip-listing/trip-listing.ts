import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  providers: [TripData],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message = '';

  constructor(
    private tripDataService: TripData,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private authenticationService: Authentication
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  private getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        this.message = `There are ${value.length} trips available.`;
        console.log(this.message);
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
}
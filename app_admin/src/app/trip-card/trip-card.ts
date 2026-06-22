import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard implements OnInit {
  @Input('trip') trip!: Trip;

  constructor(
    private router: Router,
    private tripDataService: TripData
  ) {}

  ngOnInit(): void {}

  public editTrip(trip: Trip): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip): void {
    if (confirm(`Delete ${trip.name}?`)) {
      this.tripDataService.deleteTrip(trip.code).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }
}
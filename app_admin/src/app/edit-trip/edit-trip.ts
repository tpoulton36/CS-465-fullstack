import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {
  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: '',
  };

  constructor(
    private tripDataService: TripData,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');

    if (tripCode) {
      this.tripDataService.getTrip(tripCode).subscribe({
        next: (trip: Trip) => {
          this.trip = {
            ...trip,
            start: trip.start.substring(0, 10)
          };
          this.changeDetectorRef.detectChanges();
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  onSubmit(): void {
    this.tripDataService.updateTrip(this.trip).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
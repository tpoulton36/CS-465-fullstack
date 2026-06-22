import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css',
})
export class AddTrip {
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
    private router: Router
  ) {}

  onSubmit(): void {
    this.tripDataService.addTrip(this.trip).subscribe({
      next: (data: Trip) => {
        console.log(data);
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }
}
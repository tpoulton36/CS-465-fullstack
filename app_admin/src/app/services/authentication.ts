import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from './trip-data';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripData
  ) {}

  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token ? token : '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }

    return false;
  }

  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));

    return { email, name } as User;
  }

  public login(user: User, password: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, password).pipe(
      tap((value: AuthResponse) => {
        if (value && value.token) {
          this.saveToken(value.token);
        }
      })
    );
  }

  public register(user: User, password: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, password).pipe(
      tap((value: AuthResponse) => {
        if (value && value.token) {
          this.saveToken(value.token);
        }
      })
    );
  }
}
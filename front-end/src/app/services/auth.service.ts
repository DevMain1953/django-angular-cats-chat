import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authTokenSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      this.authTokenSubject.next(savedToken);
    }
  }

  setAuthToken(token: string): void {
    this.authTokenSubject.next(token);
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): Observable<string | null> {
    return this.authTokenSubject.asObservable();
  }

  getAuthTokenAsString(): string | null {
    return this.authTokenSubject.getValue();
  }

  clearAuthToken(): void {
    this.authTokenSubject.next(null);
    localStorage.removeItem('authToken');
  }
}
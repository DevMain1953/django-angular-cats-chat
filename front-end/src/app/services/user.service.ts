import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/register/', data);
  }

  getToken(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/login/', data);
  }

  deleteToken(): Observable<any> {
    return this.http.post(this.baseUrl + '/logout/', {});
  }
}

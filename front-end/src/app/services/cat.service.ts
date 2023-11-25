import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CatService {
  private baseUrl = 'http://localhost:8000/api/cats/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cat[]> {
    return this.http.get<any>(this.baseUrl)
    .pipe(
      map(response => response.results as Cat[])
    )
  }

  get(id: any): Observable<Cat> {
    return this.http.get<any>(`${this.baseUrl}${id}`)
    .pipe(
      map(response => response as Cat)
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}

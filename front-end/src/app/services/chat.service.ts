import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { filter, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})

export class ChatService {
  private socket$: WebSocketSubject<any>;
  private baseUrl = 'http://localhost:8000/api/chat/';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');

    const socketUrl = `ws://localhost:8001/ws/chat/?token=${token}`;

    this.socket$ = webSocket({
      url: socketUrl,
      deserializer: (event) => JSON.parse(event.data),
      serializer: (value) => JSON.stringify(value),
      openObserver: {
        next: () => console.log('WebSocket connection opened'),
      },
    });
  }

  connect(): Observable<any> {
    return this.socket$.asObservable().pipe(
      filter((event: any) => event.type === 'chat.message'),
      tap((event: any) => {
        console.log('Received message:', event);
      })
    );
  }

  sendMessage(message: string): void {
    this.socket$.next({ type: 'chat.message', message });
  }

  getAll(): Observable<Message[]> {
    return this.http.get<any>(this.baseUrl)
    .pipe(
      map(response => response.results as Message[])
    )
  }
}
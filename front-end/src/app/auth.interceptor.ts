import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(AuthService) private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getAuthToken().pipe(
      take(1),
      switchMap(token => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Token ${token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
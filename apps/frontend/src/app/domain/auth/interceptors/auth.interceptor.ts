import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

const ACCESS_TOKEN_KEY = 'auth_token';

export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthEndpoint = req.url.includes('/login') || req.url.includes('/refresh');
    const token = this.authService.authToken() || localStorage.getItem(ACCESS_TOKEN_KEY);
    const authReq = !isAuthEndpoint && token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !isAuthEndpoint) {
          // aqui entraria refresh+retry; não deslogar direto
        }
        return throwError(() => error);
      }),
    );
  }
}

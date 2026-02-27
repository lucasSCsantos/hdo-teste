import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

const ACCESS_TOKEN_KEY = 'auth_token';

export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  private refreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthEndpoint = req.url.includes('/login') || req.url.includes('/refresh') || req.url.includes('/logout');

    const token = this.authService.authToken() || localStorage.getItem(ACCESS_TOKEN_KEY);

    const authReq = !isAuthEndpoint && token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((error: unknown) => {
        if (!(error instanceof HttpErrorResponse)) return throwError(() => error);

        if (error.status !== 401 || isAuthEndpoint) {
          return throwError(() => error);
        }

        if (!this.refreshing) {
          this.refreshing = true;
          this.refreshSubject.next(null);

          return this.authService.refresh().pipe(
            switchMap(newToken => {
              this.refreshing = false;

              if (!newToken) {
                return throwError(() => error);
              }

              this.refreshSubject.next(newToken);

              const retryReq = authReq.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });

              return next.handle(retryReq);
            }),
            catchError(refreshErr => {
              this.refreshing = false;
              return throwError(() => refreshErr);
            }),
          );
        }

        return this.refreshSubject.pipe(
          filter((t): t is string => !!t),
          take(1),
          switchMap(t => {
            const retryReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${t}` } });
            return next.handle(retryReq);
          }),
        );
      }),
    );
  }
}

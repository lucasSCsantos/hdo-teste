import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.authToken();

  if (req.url.includes('/login')) {
    return next(req).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
    );
  }

  if (!token) {
    router.navigate(['/login']);
    return throwError(() => new Error('No authentication token found'));
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => new Error('Session expired. Please login again.'));
      }
      return throwError(() => error);
    }),
  );
};

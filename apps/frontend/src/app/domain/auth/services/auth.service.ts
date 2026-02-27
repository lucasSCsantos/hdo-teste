import { inject, Injectable, signal } from '@angular/core';
import { AuthApi } from '../apis/auth.api';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interfaces';
import { catchError, map, of, tap } from 'rxjs';
import { AuthLoginResponse } from '../interfaces/auth.interfaces';

const ACCESS_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(AuthApi);
  private router = inject(Router);

  user = signal<Partial<User> | null>(null);
  isLoggedIn = signal<boolean>(false);
  authToken = signal<string | null>(null);
  refreshToken = signal<string | null>(null);

  startSession() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (token && refreshToken) {
      this.api
        .me()
        .pipe(
          tap(user => {
            this.setSession({ user, token, refreshToken });
          }),
          catchError(() => {
            this.setSession({ user: null, token: '', refreshToken: '' });
            return of(void 0);
          }),
        )
        .subscribe();

      return;
    }

    this.setSession({ user: null, token: '', refreshToken: '' });
  }

  refresh() {
    const refreshToken = this.refreshToken() || localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      this.setSession({ user: null, token: '', refreshToken: '' });
      return of(null);
    }

    return this.api.refresh(refreshToken).pipe(
      tap(({ token, refreshToken: newRefresh }) => {
        this.authToken.set(token);
        this.refreshToken.set(newRefresh);
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefresh);
        this.isLoggedIn.set(true);
      }),
      map(({ token }) => token),
      catchError(() => {
        this.setSession({ user: null, token: '', refreshToken: '' });
        return of(null);
      }),
    );
  }

  setSession(params: AuthLoginResponse) {
    this.user.set(params.user);
    this.authToken.set(params.token);
    this.refreshToken.set(params.refreshToken);

    if (!params.token) {
      this.user.set(null);
      this.isLoggedIn.set(false);
      this.authToken.set(null);
      this.refreshToken.set(null);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      this.router.navigate(['/auth/login']);
      return;
    }

    this.isLoggedIn.set(true);
    this.router.navigate(['/']);
    localStorage.setItem(ACCESS_TOKEN_KEY, params.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, params.refreshToken);
  }

  login(payload: Partial<User>) {
    return this.api.login(payload).pipe(
      tap(({ token, user, refreshToken }) => {
        this.setSession({ user, token, refreshToken });
      }),
    );
  }

  logout() {
    return this.api.logout().pipe(
      catchError(() => of(void 0)),
      tap(() => {
        this.setSession({ user: null, token: '', refreshToken: '' });
        this.router.navigate(['/auth/login']);
      }),
    );
  }
}

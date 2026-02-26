import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthApi } from '../apis/auth.api';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interfaces';
import { catchError, of, tap } from 'rxjs';
import { AuthLoginResponse } from '../interfaces/auth.interfaces';

const ACCESS_TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(AuthApi);
  private router = inject(Router);

  user = signal<Partial<User> | null>(null);
  isLoggedIn = signal<boolean>(false);
  authToken = signal<string | null>(null);

  // readonly isLoggedIn = computed(() => this.status() === 'authenticated' && !!this.user());
  // readonly roles = computed(() => this.user()?.roles ?? []);

  startSession() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    console.log(token, 'as');
    if (token) {
      this.api
        .me()
        .pipe(
          tap(user => {
            this.setSession({ user, token });
          }),
          catchError(() => {
            this.setSession({ user: null, token: '' });
            return of(void 0);
          }),
        )
        .subscribe();
    }
  }

  setSession(params: AuthLoginResponse) {
    console.log(params, 'as');
    this.user.set(params.user);
    this.authToken.set(params.token);

    if (!params.token) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      this.router.navigate(['/login']);
      return;
    }

    this.isLoggedIn.set(true);
    this.router.navigate(['/']);
    localStorage.setItem(ACCESS_TOKEN_KEY, params.token);
  }

  login(email: string, password: string) {
    return this.api.login(email, password).pipe(
      tap(({ token, user }) => {
        this.setSession({ user, token });
      }),
    );
  }

  logout() {
    return this.api.logout().pipe(
      catchError(() => of(void 0)),
      tap(() => {
        this.setSession({ user: null, token: '' });
        this.router.navigate(['/login']);
      }),
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLoginResponse } from '../interfaces/auth.interfaces';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private httpClient = inject(HttpClient);

  login(email: string, password: string): Observable<AuthLoginResponse> {
    return this.httpClient.post<AuthLoginResponse>('http://localhost:3333/api/login', { email, password });
  }

  refresh(): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`http://localhost:3333/api/refresh`, {});
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`http://localhost:3333/api/logout`, {});
  }

  me(): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:3333/api/me`);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLoginResponse } from '../interfaces/auth.interfaces';
import { User } from '../interfaces/user.interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  login(payload: Partial<User>): Observable<AuthLoginResponse> {
    return this.httpClient.post<AuthLoginResponse>(`${this.baseUrl}/login`, payload);
  }

  refresh(refreshToken: string): Observable<AuthLoginResponse> {
    return this.httpClient.post<AuthLoginResponse>(`${this.baseUrl}/refresh`, { refreshToken });
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/logout`, {});
  }

  me(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/me`);
  }
}

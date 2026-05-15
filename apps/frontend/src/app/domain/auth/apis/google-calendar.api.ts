import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface GoogleAuthUrlResponse {
  authUrl: string;
}

export interface ConnectGoogleCalendarResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarApi {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getAuthUrl(): Observable<GoogleAuthUrlResponse> {
    return this.httpClient.get<GoogleAuthUrlResponse>(`${this.baseUrl}/auth/google/auth-url`);
  }

  connectGoogleCalendar(code: string, timezone?: string): Observable<ConnectGoogleCalendarResponse> {
    return this.httpClient.post<ConnectGoogleCalendarResponse>(`${this.baseUrl}/auth/google/callback`, {
      code,
      timezone,
    });
  }
}

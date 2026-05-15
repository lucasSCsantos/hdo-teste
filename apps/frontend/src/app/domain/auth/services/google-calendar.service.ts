import { inject, Injectable, signal } from '@angular/core';
import { GoogleCalendarApi } from '../apis/google-calendar.api';
import { tap, catchError, of } from 'rxjs';

const GOOGLE_CALENDAR_CONNECTED_KEY = 'google_calendar_connected';
const USER_TIMEZONE_KEY = 'user_timezone';

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private api = inject(GoogleCalendarApi);

  googleCalendarConnected = signal<boolean>(this.getConnectionStatus());
  userTimezone = signal<string>(this.getUserTimezone());
  isConnecting = signal<boolean>(false);
  connectionError = signal<string | null>(null);

  private getConnectionStatus(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem(GOOGLE_CALENDAR_CONNECTED_KEY) === 'true';
  }

  private getUserTimezone(): string {
    if (typeof localStorage === 'undefined') {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return localStorage.getItem(USER_TIMEZONE_KEY) || Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  initiateGoogleOAuth(): void {
    this.isConnecting.set(true);
    this.connectionError.set(null);

    this.api
      .getAuthUrl()
      .pipe(
        tap(response => {
          window.location.href = response.authUrl;
        }),
        catchError(error => {
          this.isConnecting.set(false);
          this.connectionError.set('Failed to initiate Google Calendar connection');
          console.error('Failed to get Google auth URL:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  handleGoogleOAuthCallback(code: string, timezone?: string): void {
    this.isConnecting.set(true);
    this.connectionError.set(null);

    const selectedTimezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.api
      .connectGoogleCalendar(code, selectedTimezone)
      .pipe(
        tap(response => {
          if (response.success) {
            localStorage.setItem(GOOGLE_CALENDAR_CONNECTED_KEY, 'true');
            localStorage.setItem(USER_TIMEZONE_KEY, selectedTimezone);
            this.googleCalendarConnected.set(true);
            this.userTimezone.set(selectedTimezone);
            this.isConnecting.set(false);
            this.connectionError.set(null);
          }
        }),
        catchError(error => {
          this.isConnecting.set(false);
          this.connectionError.set('Failed to connect Google Calendar');
          console.error('Failed to connect Google Calendar:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  disconnectGoogleCalendar(): void {
    localStorage.removeItem(GOOGLE_CALENDAR_CONNECTED_KEY);
    localStorage.removeItem(USER_TIMEZONE_KEY);
    this.googleCalendarConnected.set(false);
    this.userTimezone.set(Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.connectionError.set(null);
  }

  getDetectedTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}

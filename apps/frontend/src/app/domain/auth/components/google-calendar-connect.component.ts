import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButton } from 'ng-zorro-antd/button';
import { NzCard } from 'ng-zorro-antd/card';
import { NzFlex } from 'ng-zorro-antd/flex';
import { NzAlert } from 'ng-zorro-antd/alert';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'app-google-calendar-connect',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButton, NzCard, NzFlex, NzAlert],
  template: `
    <nz-card [nzTitle]="'Google Calendar'" nzBordered>
      <div nz-flex nzFlex="column" [nzGap]="16">
        <!-- Connection Status -->
        <div>
          <span>Status:</span>
          <strong class="ms-2">
            <span *ngIf="googleCalendarService.googleCalendarConnected()" class="text-success"> ✓ Connected </span>
            <span *ngIf="!googleCalendarService.googleCalendarConnected()" class="text-warning"> Not Connected </span>
          </strong>
        </div>

        <!-- Connected State -->
        <div *ngIf="googleCalendarService.googleCalendarConnected()">
          <nz-alert
            nzType="success"
            nzMessage="Google Calendar is connected"
            nzDescription="Your appointments will automatically sync to your Google Calendar"
            [nzShowIcon]="true"
            [nzCloseable]="false"
          ></nz-alert>

          <div nz-flex nzFlex="column" [nzGap]="8" class="mt-3">
            <div>
              <label>Current Timezone:</label>
              <strong class="ms-2">{{ googleCalendarService.userTimezone() }}</strong>
            </div>

            <button nz-button nzType="default" nzDanger (click)="handleDisconnect()" [disabled]="googleCalendarService.isConnecting()">Disconnect Google Calendar</button>
          </div>
        </div>

        <!-- Disconnected State -->
        <div *ngIf="!googleCalendarService.googleCalendarConnected()">
          <div class="mb-3">
            <p>Connect your Google Calendar to automatically sync appointments.</p>
          </div>

          <button nz-button nzType="primary" (click)="handleConnect()" [disabled]="googleCalendarService.isConnecting()" [nzLoading]="googleCalendarService.isConnecting()">
            {{ googleCalendarService.isConnecting() ? 'Connecting...' : 'Connect Google Calendar' }}
          </button>
        </div>

        <!-- Error Message -->
        <div *ngIf="googleCalendarService.connectionError()">
          <nz-alert nzType="error" [nzMessage]="googleCalendarService.connectionError()" [nzShowIcon]="true" [nzCloseable]="false"></nz-alert>
        </div>
      </div>
    </nz-card>
  `,
  styles: [
    `
      :host ::ng-deep {
        .ms-2 {
          margin-left: 0.5rem;
        }

        .mt-3 {
          margin-top: 1rem;
        }

        .mb-3 {
          margin-bottom: 1rem;
        }

        .text-success {
          color: #52c41a;
        }

        .text-warning {
          color: #faad14;
        }
      }
    `,
  ],
})
export class GoogleCalendarConnectComponent implements OnInit {
  googleCalendarService = inject(GoogleCalendarService);
  private route = inject(ActivatedRoute);
  private message = inject(NzMessageService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        const code = params['code'];
        const timezone = this.googleCalendarService.getDetectedTimezone();
        this.googleCalendarService.handleGoogleOAuthCallback(code, timezone);
        this.message.success('Google Calendar connected successfully!');
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    });
  }

  handleConnect(): void {
    this.googleCalendarService.initiateGoogleOAuth();
  }

  handleDisconnect(): void {
    if (confirm('Are you sure you want to disconnect Google Calendar?')) {
      this.googleCalendarService.disconnectGoogleCalendar();
      this.message.success('Google Calendar disconnected');
    }
  }
}

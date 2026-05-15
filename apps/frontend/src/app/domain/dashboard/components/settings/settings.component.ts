import { Component } from '@angular/core';
import { GoogleCalendarConnectComponent } from '../../../auth/components/google-calendar-connect.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [GoogleCalendarConnectComponent, NzFlexModule],
  template: `
    <div nz-flex nzFlex="column" nzVertical nzGap="large">
      <app-google-calendar-connect />
    </div>
  `,
})
export class SettingsComponent {}

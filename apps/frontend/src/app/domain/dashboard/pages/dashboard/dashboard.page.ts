import { Component } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { PatientsComponent } from '../../components/patients/patients.component';
import { eDashboardSegmentedOptions } from '../../enums/eDashboardOptions';

@Component({
  selector: 'app-dashboard',
  imports: [NzTypographyModule, NzFlexModule, NzSegmentedModule, PatientsComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  selectedOption: eDashboardSegmentedOptions = eDashboardSegmentedOptions.Appointments;
  options = [eDashboardSegmentedOptions.Appointments, eDashboardSegmentedOptions.Patients, eDashboardSegmentedOptions.Procedures, eDashboardSegmentedOptions.Audit];

  handleValueChange(e: string | number): void {
    this.selectedOption = e as eDashboardSegmentedOptions;
  }
}

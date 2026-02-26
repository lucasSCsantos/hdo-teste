import { Component } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { PatientsComponent } from '../../components/patients/patients.component';
import { DashboardSegmentedOptions } from '../../enums/dashboard.enum';
import { ProceduresComponent } from '../../components/procedures/procedures.component';

@Component({
  selector: 'app-dashboard',
  imports: [NzTypographyModule, NzFlexModule, NzSegmentedModule, PatientsComponent, ProceduresComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  selectedOption: DashboardSegmentedOptions = DashboardSegmentedOptions.Appointments;
  options = [DashboardSegmentedOptions.Appointments, DashboardSegmentedOptions.Patients, DashboardSegmentedOptions.Procedures, DashboardSegmentedOptions.Audit];

  handleValueChange(e: string | number): void {
    this.selectedOption = e as DashboardSegmentedOptions;
  }
}

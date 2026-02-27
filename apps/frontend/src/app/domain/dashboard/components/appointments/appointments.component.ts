import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { debounceTime, distinctUntilChanged, switchMap, catchError, of, Subject } from 'rxjs';

import { Appointment } from '../../interfaces/appointments.interface';
import { AppointmentsApi } from '../../apis/appointments/appointments.api';
import { PatientsApi } from '../../apis/patients/patients.api';
import { ProceduresApi } from '../../apis/procedures/procedures.api';
import { Procedure } from '../../interfaces/procedures.interface';
import { Patient } from '../../interfaces/patients.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { FormatDatePipe } from '../../../../core/pipes/formatDate.pipe';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzPopconfirmModule,
    NzTagModule,
    NzSpaceModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzFlexModule,
    FormsModule,
    FormatDatePipe,
  ],
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent implements OnInit {
  private api = inject(AppointmentsApi);
  private fb = inject(FormBuilder);
  private notificationService = inject(NzNotificationService);

  private patientsApi = inject(PatientsApi);
  private proceduresApi = inject(ProceduresApi);

  // estados da tabela
  loading = signal(false);
  items = signal<Appointment[]>([]);
  total = signal(0);

  statusFilter = signal<'SCHEDULED' | 'CANCELED' | ''>('');
  patientFilter = signal<string | ''>('');
  patientsFilterOptions = signal<{ id: string; name: string }[] | []>([]);
  rangeFilter = signal<Date[]>([]);

  isCreateOpen = signal(false);
  isCreateSaving = signal(false);

  isCancelOpen = signal(false);
  isCancelSaving = signal(false);
  cancelTarget = signal<Appointment | null>(null);

  // select options
  patientOptions = signal<Patient[]>([]);
  procedureOptions = signal<Procedure[]>([]);

  createTitle = 'Novo agendamento';
  cancelTitle = computed(() => `Cancelar agendamento`);

  createForm = this.fb.nonNullable.group({
    patientId: ['', [Validators.required]],
    procedureId: ['', [Validators.required]],
    startTime: [null as Date | null, [Validators.required]],
  });

  cancelForm = this.fb.nonNullable.group({
    cancellationReason: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.load();

    this.patientsApi.list().subscribe(opts => this.patientOptions.set(opts));

    this.proceduresApi.list().subscribe(opts => this.procedureOptions.set(opts));
  }

  load(): void {
    this.loading.set(true);

    this.api
      .list({
        status: (this.statusFilter() || undefined) as any,
        patientId: (this.patientFilter() || undefined) as any,
        range: (this.rangeFilter() || undefined) as any,
      })
      .subscribe({
        next: res => {
          this.items.set(res);
          this.loadPatientFilterOptions();
          this.loading.set(false);
        },
        error: err => {
          this.loading.set(false);
          this.notificationService.error('Erro', err.error.message);
        },
      });
  }

  onQueryChange(): void {
    this.load();
  }

  loadPatientFilterOptions() {
    if (this.patientsFilterOptions().length > 0) return;

    const names: string[] = [];

    const options = this.items()
      .filter(a => {
        if (!names.includes(a.patientName)) {
          names.push(a.patientName);
          return true;
        }
        return false;
      })
      .map(a => ({ id: a.patientId, name: a.patientName }));

    this.patientsFilterOptions.set(options as unknown as { id: string; name: string }[]);
  }

  openCreate(): void {
    this.createForm.reset({ patientId: '', procedureId: '', startTime: null });
    this.isCreateOpen.set(true);
  }

  closeCreate(): void {
    if (this.isCreateSaving()) return;
    this.isCreateOpen.set(false);
  }

  saveCreate(): void {
    if (this.createForm.invalid) {
      this.notificationService.error('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    const raw = this.createForm.getRawValue();
    const startTimeIso = raw.startTime!.toISOString();

    this.isCreateSaving.set(true);

    this.api
      .create({
        patientId: raw.patientId,
        procedureId: raw.procedureId,
        startTime: startTimeIso,
      })
      .subscribe({
        next: () => {
          this.isCreateSaving.set(false);
          this.isCreateOpen.set(false);
          this.notificationService.success('Sucesso', 'Agendamento criado.');
          this.load();
        },
        error: err => {
          this.isCreateSaving.set(false);
          this.notificationService.error('Erro', err.error.message);
        },
      });
  }

  openCancel(row: Appointment): void {
    this.cancelTarget.set(row);
    this.cancelForm.reset({ cancellationReason: '' });
    this.isCancelOpen.set(true);
  }

  closeCancel(): void {
    if (this.isCancelSaving()) return;
    this.isCancelOpen.set(false);
    this.cancelTarget.set(null);
  }

  confirmCancel(): void {
    const target = this.cancelTarget();
    if (!target) return;

    if (target.status === 'CANCELED') {
      this.notificationService.info('Info', 'Este agendamento já está cancelado.');
      return;
    }

    if (this.cancelForm.invalid) {
      this.notificationService.error('Erro', 'Por favor, informe o motivo do cancelamento.');
      return;
    }

    const { cancellationReason } = this.cancelForm.getRawValue();

    this.isCancelSaving.set(true);

    this.api.cancel(target.id, { cancellationReason }).subscribe({
      next: () => {
        this.isCancelSaving.set(false);
        this.isCancelOpen.set(false);
        this.cancelTarget.set(null);
        this.notificationService.success('Sucesso', 'Agendamento cancelado.');
        this.load();
      },
      error: err => {
        this.isCancelSaving.set(false);
        this.notificationService.error('Erro', err.error.message);
      },
    });
  }

  formatDateTime(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString('pt-BR');
  }
}

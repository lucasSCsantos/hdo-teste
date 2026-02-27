import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PatientsApi } from '../../apis/patients/patients.api';
import { Patient, PatientFormValue } from '../../interfaces/patients.interface';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { FormatPhonePipe } from '../../../../core/pipes/formatPhone/formatPhone.pipe';
import { FormatDocumentPipe } from '../../../../core/pipes/formatDocument/formatDocument.pipe';
@Component({
  selector: 'app-patients',
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
    NzSwitchModule,
    NzFlexModule,
    FormatPhonePipe,
    FormatDocumentPipe,
  ],
  templateUrl: './patients.component.html',
})
export class PatientsComponent implements OnInit {
  private api = inject(PatientsApi);
  private notificationService = inject(NzNotificationService);
  private fb = inject(FormBuilder);

  // estados da tabela
  loading = signal(false);
  items = signal<Patient[]>([]);

  // estados do modal
  isModalOpen = signal(false);
  isSaving = signal(false);
  editing = signal<Patient | null>(null);
  modalTitle = computed(() => (this.editing() ? 'Editar paciente' : 'Novo paciente'));

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    document: [null as string | null, [Validators.minLength(11), Validators.maxLength(11)]],
    phone: [null as string | null, [Validators.minLength(11), Validators.maxLength(14)]],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.api
      .list()

      .subscribe({
        next: res => {
          this.items.set(res);
          this.loading.set(false);
        },
        error: err => {
          this.loading.set(false);
          this.notificationService.error('Erro', err.error.message);
        },
      });
  }

  openCreate(): void {
    this.editing.set(null);
    this.form.reset({ name: '', phone: null, document: '' });
    this.isModalOpen.set(true);
  }

  openEdit(row: Patient): void {
    this.editing.set(row);
    this.form.reset({
      name: row.name,
      document: row.document,
      phone: row.phone ?? null,
    });
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    if (this.isSaving()) return;
    this.isModalOpen.set(false);
  }

  save(): void {
    if (this.form.invalid) {
      this.notificationService.error('Erro', 'Formulário inválido. Verifique os campos e tente novamente.');
      return;
    }
    const payload = this.form.getRawValue() as PatientFormValue;
    const editing = this.editing();
    this.isSaving.set(true);
    const req$ = editing ? this.api.update(editing.id, payload) : this.api.create(payload);
    req$.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isModalOpen.set(false);
        this.notificationService.success('Sucesso', editing ? 'Paciente atualizado.' : 'Paciente criado.');
        this.load();
      },
      error: err => {
        this.isSaving.set(false);
        this.notificationService.error('Erro', err.error.message);
      },
    });
  }

  confirmDelete(row: Patient): void {
    this.api.delete(row.id).subscribe({
      next: () => {
        this.notificationService.success('Sucesso', 'Paciente removido.');
        this.load();
      },
      error: err => this.notificationService.error('Erro', err.error.message),
    });
  }
}

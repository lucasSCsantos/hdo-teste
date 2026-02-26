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
import { PatientsApi } from '../../apis/procedures.api';
import { Patient, PatientFormValue } from '../../interfaces/procedures.interface';
import { NzFlexModule } from 'ng-zorro-antd/flex';
@Component({
  selector: 'app-procedures',
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
  ],
  templateUrl: './procedures.component.html',
})
export class PatientsComponent implements OnInit {
  private api = inject(PatientsApi);
  private notificationService = inject(NzNotificationService);
  private modalService = inject(NzModalService);
  private fb = inject(FormBuilder);

  // table state
  loading = signal(false);
  items = signal<Patient[]>([]);
  total = signal(0);
  pageIndex = signal(1);
  pageSize = signal(10);
  search = signal('');

  // modal state
  isModalOpen = signal(false);
  isSaving = signal(false);
  editing = signal<Patient | null>(null);
  modalTitle = computed(() => (this.editing() ? 'Editar paciente' : 'Novo paciente'));

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    document: [null as string | null],
    phone: [null as string | null],
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
          // this.total.set(res.total);
          this.loading.set(false);
        },
        error: error => {
          console.error(error);
          this.loading.set(false);
          this.notificationService.error('Erro', 'Falha ao carregar pacientes.');
        },
      });
  }
  // onQueryChange(): void {
  //   this.pageIndex.set(1);
  //   this.load();
  // }
  // onPageChange(pi: number): void {
  //   this.pageIndex.set(pi);
  //   this.load();
  // }
  // onPageSizeChange(ps: number): void {
  //   this.pageSize.set(ps);
  //   this.pageIndex.set(1);
  //   this.load();
  // }
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
      this.form.markAllAsTouched();
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
      error: () => {
        this.isSaving.set(false);
        this.notificationService.error('Erro', 'Falha ao salvar paciente.');
      },
    });
  }
  confirmDelete(row: Patient): void {
    this.api.delete(row.id).subscribe({
      next: () => {
        this.notificationService.success('Sucesso', 'Paciente removido.');
        // se ficou página vazia após delete, volta uma
        if (this.items().length === 1 && this.pageIndex() > 1) this.pageIndex.set(this.pageIndex() - 1);
        this.load();
      },
      error: () => this.notificationService.error('Erro', 'Falha ao remover paciente.'),
    });
  }
}

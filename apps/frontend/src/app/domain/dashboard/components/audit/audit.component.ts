import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { AuditLog } from '../../interfaces/audit.interface';
import { AuditApi } from '../../apis/audit/audit.api';
import { AuditAction, AuditEntityType } from '../../enums/audit.enum';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormatDatePipe } from '../../../../core/pipes/formatDate.pipe';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFlexModule,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzSpaceModule,
    NzTagModule,
    NzModalModule,
    NzDatePickerModule,
    FormatDatePipe,
  ],
  templateUrl: './audit.component.html',
})
export class AuditComponent implements OnInit {
  private api = inject(AuditApi);
  private notificationService = inject(NzNotificationService);

  // estados da tabela
  loading = signal(false);
  items = signal<AuditLog[]>([]);

  // modal de metadata
  isMetaOpen = signal(false);
  metaTitle = computed(() => {
    const row = this.metaRow();
    if (!row) return 'Metadata';
    return `Metadata • ${row.action} • ${row.entityType}#${row.entityId}`;
  });
  metaRow = signal<AuditLog | null>(null);
  metaPrettyJson = computed(() => {
    const row = this.metaRow();
    if (!row?.metadata) return '';
    try {
      return JSON.stringify(row.metadata, null, 2);
    } catch {
      return String(row.metadata);
    }
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);

    this.api.list().subscribe({
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

  openMetadata(row: AuditLog): void {
    this.metaRow.set(row);
    this.isMetaOpen.set(true);
  }

  closeMetadata(): void {
    this.isMetaOpen.set(false);
    this.metaRow.set(null);
  }

  rowId(row: AuditLog): string {
    return row.id ?? row._id ?? `${row.action}-${row.createdAt}-${row.actorId}-${row.entityType}-${row.entityId}`;
  }

  actionColor(action: AuditAction): string {
    switch (action) {
      case 'LOGIN':
        return 'blue';
      case 'CREATE_APPOINTMENT':
        return 'green';
      case 'CANCEL_APPOINTMENT':
        return 'red';
      default:
        return 'default';
    }
  }

  entityColor(entity: AuditEntityType): string {
    return entity === 'USER' ? 'gold' : 'purple';
  }
}

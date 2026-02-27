import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../../interfaces/audit.interface';

@Injectable({ providedIn: 'root' })
export class AuditApi {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3333/api/audit-logs';

  list(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.baseUrl);
  }
}

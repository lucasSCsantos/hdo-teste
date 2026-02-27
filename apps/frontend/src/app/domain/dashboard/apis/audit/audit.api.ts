import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../../interfaces/audit.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuditApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/audit-logs`;

  list(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.baseUrl);
  }
}

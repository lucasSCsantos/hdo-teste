import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedure } from '../../interfaces/procedures.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProceduresApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/procedures`;

  list(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(this.baseUrl);
  }

  create(payload: Omit<Procedure, 'id' | 'createdAt'>): Observable<Procedure> {
    return this.http.post<Procedure>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<Omit<Procedure, 'id' | 'createdAt'>>): Observable<Procedure> {
    return this.http.put<Procedure>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

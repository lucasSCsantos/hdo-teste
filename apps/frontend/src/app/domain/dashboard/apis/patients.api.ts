import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patients.interface';

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class PatientsApi {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3333/api/patients';

  list(query: { pageIndex: number; pageSize: number; search?: string }): Observable<PaginatedResult<Patient>> {
    // let params = new HttpParams().set('pageIndex', query.pageIndex).set('pageSize', query.pageSize);

    // if (query.search) params = params.set('search', query.search);

    return this.http.get<PaginatedResult<Patient>>(
      this.baseUrl,
      // , { params }
    );
  }

  create(payload: Omit<Patient, 'id' | 'createdAt'>): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<Omit<Patient, 'id' | 'createdAt'>>): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

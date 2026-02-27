import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../interfaces/patients.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientsApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/patients`;

  list(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
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

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../interfaces/appointments.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentsApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/appointments`;

  list(query?: { status?: 'Scheduled' | 'Canceled'; patientId: string; range: Date[] }): Observable<Appointment[]> {
    let params = new HttpParams();

    if (query?.status) params = params.set('status', query.status);
    if (query?.patientId) params = params.set('patientId', query.patientId);
    if (query?.range?.length === 2) {
      params = params.set('startDate', query.range[0].toISOString());
      params = params.set('endDate', query.range[1].toISOString());
    }

    return this.http.get<Appointment[]>(this.baseUrl, { params });
  }

  create(payload: { patientId: string; procedureId: string; startTime: string }): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, payload);
  }

  cancel(id: string, payload: { cancellationReason: string }): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/${id}/cancel`, payload);
  }
}

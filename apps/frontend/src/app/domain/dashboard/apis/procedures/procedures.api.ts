import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedure } from '../../interfaces/procedures.interface';

// export interface PaginatedResult<T> {
//   items: T[];
//   total: number;
// }

@Injectable({ providedIn: 'root' })
export class ProceduresApi {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3333/api/procedures';

  list(query?: { pageIndex: number; pageSize: number; search?: string }): Observable<Procedure[]> {
    // let params = new HttpParams().set('pageIndex', query.pageIndex).set('pageSize', query.pageSize);

    // if (query.search) params = params.set('search', query.search);

    return this.http.get<Procedure[]>(
      this.baseUrl,
      // , { params }
    );
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

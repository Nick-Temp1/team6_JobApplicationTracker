import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../models/job-application.model';

const API_BASE = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class JobApplicationService {
  private http = inject(HttpClient);

  getAllApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${API_BASE}/job-applications`);
  }

  createApplication(data: any): Observable<any> {
    return this.http.post(`${API_BASE}/job-applications`, data);
  }

  updateApplication(
    id: number,
    body: {
      applicationStatus: string;
      applicationNotes: string | null;
      interviewDate: string | null;
    },
  ): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${API_BASE}/job-applications/${id}`, body);
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/job-applications/${id}`);
  }
}

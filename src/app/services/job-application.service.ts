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
}

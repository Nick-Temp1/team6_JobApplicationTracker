import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { JobApplication } from '../models/job-application.model';

const API_BASE = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class JobApplicationService {
  private http = inject(HttpClient);

  getAllApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${API_BASE}/job-applications`).pipe(
      catchError(() => of(this.getDummyData()))
    );
  }

  seedDummyData(): Observable<JobApplication[]> {
    return this.http.post<JobApplication[]>(`${API_BASE}/job-applications/seed`, {});
  }

//using placeholder data for now when database errors
  private getDummyData(): JobApplication[] {
    return [
      {
        id: 1,
        companyName: 'TechCorp Inc.',
        positionTitle: 'Software Engineer',
        applicationStatus: 'INTERVIEW',
        applicationNotes: 'Reached out via LinkedIn. Technical interview scheduled for next week.',
        applicationDate: '2025-03-10',
        interviewDate: '2025-03-25',
      },
      {
        id: 2,
        companyName: 'DataFlow Solutions',
        positionTitle: 'Full Stack Developer',
        applicationStatus: 'PENDING',
        applicationNotes: 'Applied through company website. Waiting for response.',
        applicationDate: '2025-03-12',
      },
      {
        id: 3,
        companyName: 'CloudNine Systems',
        positionTitle: 'Junior Developer',
        applicationStatus: 'OFFER',
        applicationNotes: 'Received offer! Negotiating salary.',
        applicationDate: '2025-02-28',
        interviewDate: '2025-03-15',
      },
      {
        id: 4,
        companyName: 'StartupXYZ',
        positionTitle: 'Frontend Developer',
        applicationStatus: 'REJECTED',
        applicationNotes: 'Went with another candidate. Will reapply in 6 months.',
        applicationDate: '2025-03-01',
      },
      {
        id: 5,
        companyName: 'Enterprise Co',
        positionTitle: 'Backend Engineer',
        applicationStatus: 'PENDING',
        applicationDate: '2025-03-18',
      },
    ];
  }
}

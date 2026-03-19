import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { JobApplicationService } from '../../services/job-application.service';
import { JobApplication } from '../../models/job-application.model';

@Component({
  selector: 'app-all-applications',
  imports: [DatePipe, NgClass],
  templateUrl: './all-applications.html',
  styleUrl: './all-applications.css',
})
export class AllApplications implements OnInit {
  private jobApplicationService = inject(JobApplicationService);

  applications = signal<JobApplication[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading.set(true);
    this.error.set(null);
    this.jobApplicationService.getAllApplications().subscribe({
      next: (data) => {
        this.applications.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load applications. Please try again.');
        this.loading.set(false);
      },
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      PENDING: 'status-pending',
      INTERVIEW: 'status-interview',
      OFFER: 'status-offer',
      REJECTED: 'status-rejected',
    };
    return map[status] ?? 'status-pending';
  }
}

import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobApplicationService } from '../../services/job-application.service';
import { ApplicationStatus, JobApplication } from '../../models/job-application.model';
import { Navbar } from '../../navbar/navbar';
import { Footer } from '../../footer/footer';

function startOfToday(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function interviewDateOnly(iso: string): Date {
  const dayPart = iso.slice(0, 10);
  const [y, m, d] = dayPart.split('-').map(Number);
  return new Date(y, m - 1, d);
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Navbar, Footer, RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private jobApplicationService = inject(JobApplicationService);

  applications = signal<JobApplication[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  readonly statusOrder: ApplicationStatus[] = ['PENDING', 'INTERVIEW', 'OFFER', 'REJECTED'];

  statusCounts = computed(() => {
    const apps = this.applications();
    const counts: Record<ApplicationStatus, number> = {
      PENDING: 0,
      INTERVIEW: 0,
      OFFER: 0,
      REJECTED: 0,
    };
    for (const a of apps) {
      counts[a.applicationStatus]++;
    }
    return counts;
  });

  totalApplications = computed(() => this.applications().length);

  /**pending or interview*/
  inProgressCount = computed(() => this.statusCounts().PENDING + this.statusCounts().INTERVIEW);

  recentApplications = computed(() =>
    [...this.applications()]
      .sort((a, b) => (b.dateOfApplication ?? '').localeCompare(a.dateOfApplication ?? ''))
      .slice(0, 6),
  );

  upcomingInterviews = computed(() => {
    const today = startOfToday();
    return this.applications()
      .filter(
        (a) => a.interviewDate && interviewDateOnly(a.interviewDate).getTime() >= today.getTime(),
      )
      .sort((a, b) => (a.interviewDate ?? '').localeCompare(b.interviewDate ?? ''));
  });

  percent(status: ApplicationStatus): number {
    const total = this.totalApplications();
    if (total === 0) {
      return 0;
    }
    return Math.round((this.statusCounts()[status] / total) * 100);
  }

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
}

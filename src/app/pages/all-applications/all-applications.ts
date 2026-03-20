import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { JobApplicationService } from '../../services/job-application.service';
import { ApplicationStatus, JobApplication } from '../../models/job-application.model';
import { Navbar } from '../../navbar/navbar';
import { Footer } from '../../footer/footer';

interface EditableRow {
  id: number;
  companyName: string;
  positionTitle: string;
  dateOfApplication: string;
  applicationStatus: ApplicationStatus;
  applicationNotes: string;
  interviewDate: string;
}

@Component({
  selector: 'app-all-applications',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule, Navbar, Footer],
  templateUrl: './all-applications.html',
  styleUrl: './all-applications.css',
})
export class AllApplications implements OnInit {
  private jobApplicationService = inject(JobApplicationService);

  applications = signal<JobApplication[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  editMode = false;
  editRows: EditableRow[] = [];
  saving = false;
  saveMessage = '';
  saveError = '';

  readonly statuses: ApplicationStatus[] = ['PENDING', 'INTERVIEW', 'OFFER', 'REJECTED'];

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
        if (this.editMode) {
          this.syncEditRowsFromApps(data);
        }
      },
      error: () => {
        this.error.set('Failed to load applications. Please try again.');
        this.loading.set(false);
      },
    });
  }

  startEdit(): void {
    this.saveMessage = '';
    this.saveError = '';
    this.syncEditRowsFromApps(this.applications());
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editRows = [];
    this.saveMessage = '';
    this.saveError = '';
  }

  private syncEditRowsFromApps(apps: JobApplication[]): void {
    this.editRows = apps.map((a) => ({
      id: a.id,
      companyName: a.companyName,
      positionTitle: a.positionTitle,
      dateOfApplication: a.dateOfApplication,
      applicationStatus: a.applicationStatus,
      applicationNotes: a.applicationNotes ?? '',
      interviewDate: a.interviewDate ? a.interviewDate.slice(0, 10) : '',
    }));
  }

  private interviewDateForApi(value: string): string | null {
    const v = value.trim();
    return v.length > 0 ? v : null;
  }

  saveChanges(): void {
    this.saveMessage = '';
    this.saveError = '';
    this.saving = true;

    const calls = this.editRows.map((row) =>
      this.jobApplicationService.updateApplication(row.id, {
        applicationStatus: row.applicationStatus,
        applicationNotes: row.applicationNotes.trim() || null,
        interviewDate: this.interviewDateForApi(row.interviewDate),
      }),
    );

    forkJoin(calls).subscribe({
      next: () => {
        this.saving = false;
        this.saveMessage = 'Changes saved.';
        this.editMode = false;
        this.editRows = [];
        this.loadApplications();
      },
      error: () => {
        this.saving = false;
        this.saveError = 'Could not save changes. Please try again.';
      },
    });
  }

  deleteRow(row: EditableRow): void {
    if (!confirm(`Delete application at ${row.companyName}?`)) {
      return;
    }
    this.saveError = '';
    this.saveMessage = '';
    this.jobApplicationService.deleteApplication(row.id).subscribe({
      next: () => {
        this.editRows = this.editRows.filter((r) => r.id !== row.id);
        this.loadApplications();
      },
      error: () => {
        this.saveError = 'Could not delete application.';
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

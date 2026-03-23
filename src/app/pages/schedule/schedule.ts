import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JobApplicationService } from '../../services/job-application.service';
import { JobApplication } from '../../models/job-application.model';
import { Navbar } from '../../navbar/navbar';
import { Footer } from '../../footer/footer';

interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [DatePipe, Navbar, Footer],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule implements OnInit {
  private jobApplicationService = inject(JobApplicationService);

  applications = signal<JobApplication[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  /** First day of the month being viewed (local time). */
  viewMonth = signal<Date>(this.startOfMonth(new Date()));

  modalOpen = signal(false);
  /** Local calendar date for the open modal (title display). */
  modalDate = signal<Date | null>(null);
  modalApps = signal<JobApplication[]>([]);

  readonly weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  interviewByDate = computed(() => {
    const map = new Map<string, JobApplication[]>();
    for (const app of this.applications()) {
      if (!app.interviewDate) {
        continue;
      }
      const key = app.interviewDate.slice(0, 10);
      const list = map.get(key) ?? [];
      list.push(app);
      map.set(key, list);
    }
    return map;
  });

  calendarCells = computed(() => {
    const d = this.viewMonth();
    const year = d.getFullYear();
    const month = d.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: CalendarCell[] = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < startOffset; i++) {
      const day = prevMonthLastDay - startOffset + i + 1;
      cells.push({ date: new Date(year, month - 1, day), isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }

    const total = cells.length;
    const endPadding = (7 - (total % 7)) % 7;
    for (let i = 1; i <= endPadding; i++) {
      cells.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return cells;
  });

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

  prevMonth(): void {
    const d = new Date(this.viewMonth());
    d.setMonth(d.getMonth() - 1);
    this.viewMonth.set(this.startOfMonth(d));
  }

  nextMonth(): void {
    const d = new Date(this.viewMonth());
    d.setMonth(d.getMonth() + 1);
    this.viewMonth.set(this.startOfMonth(d));
  }

  goToToday(): void {
    this.viewMonth.set(this.startOfMonth(new Date()));
  }

  appsForCell(cell: CalendarCell): JobApplication[] {
    const key = toDateKey(cell.date);
    return this.interviewByDate().get(key) ?? [];
  }

  openDay(cell: CalendarCell): void {
    const apps = this.appsForCell(cell);
    if (apps.length === 0) {
      return;
    }
    this.modalDate.set(
      new Date(cell.date.getFullYear(), cell.date.getMonth(), cell.date.getDate()),
    );
    this.modalApps.set(apps);
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
    this.modalDate.set(null);
    this.modalApps.set([]);
  }

  @HostListener('document:keydown.escape')
  onEscapeCloseModal(): void {
    if (this.modalOpen()) {
      this.closeModal();
    }
  }

  trackCell(_index: number, cell: CalendarCell): number {
    return cell.date.getTime();
  }

  private startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
}

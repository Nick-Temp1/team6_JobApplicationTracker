import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../../navbar/navbar';
import { Footer } from '../../footer/footer';
import { JobApplicationService } from '../../services/job-application.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-new-application',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
  templateUrl: './add-new-application.html',
  styleUrl: './add-new-application.css',
})
export class AddNewApplication {
  @ViewChild('appForm') appForm!: NgForm;

  statuses = ['PENDING', 'INTERVIEW', 'OFFER', 'REJECTED'];

  constructor(
    private jobApplicationService: JobApplicationService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formData.userId = this.authService.getCurrentUser()?.id ?? null;
  }

  formData = {
    companyName: '',
    positionTitle: '',
    applicationStatus: '',
    applicationNotes: '',
    dateOfApplication: '',
    interviewDate: '',
    userId: null as number | null,
  };

  successMessage = '';
  errorMessage = '';

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if(this.formData.applicationStatus === 'PENDING') {
      this.formData.interviewDate = '';
    }

    this.jobApplicationService.createApplication(this.formData).subscribe({
      next: () => {
        this.successMessage = 'Application added successfully!';
        this.appForm.reset();
        this.formData.userId = this.authService.getCurrentUser()?.id ?? null;
      },
      error: () => {
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }
}

import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../../navbar/navbar';
import { Footer } from '../../footer/footer';
import { JobApplicationService } from '../../services/job-application.service';

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

  formData = {
    companyName: '',
    positionTitle: '',
    applicationStatus: '',
    applicationNotes: '',
    dateOfApplication: '',
    interviewDate: '',
    userId: 1, // hardcoded for now, will come from auth later
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private jobApplicationService: JobApplicationService,
    private router: Router,
  ) {}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    this.jobApplicationService.createApplication(this.formData).subscribe({
      next: () => {
        this.successMessage = 'Application added successfully!';
        this.appForm.reset();
        this.formData.userId = 1;
      },
      error: () => {
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }
}

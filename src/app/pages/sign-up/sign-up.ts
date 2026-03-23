import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    if (this.authService.isLoggedIn())
    {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.errorMessage = '';
    this.authService.register(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/sign-in']),
      error: () => {
        this.errorMessage = 'Username already taken.';
        this.cdr.detectChanges();
      }
    });
  }
}

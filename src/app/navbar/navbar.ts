import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private authService: AuthService, private router: Router) {}

  signOut()
  {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}

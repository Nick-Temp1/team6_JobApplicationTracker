import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}

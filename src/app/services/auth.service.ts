import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const API_BASE = 'http://localhost:8080/api/users';
const STORAGE_KEY = 'currentUser';

@Injectable({ providedIn: 'root' })
export class AuthService
{
  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any>
  {
    return this.http.post(`${API_BASE}/register`, {username, password});
  }

  login(username: string, password: string): Observable<any>
  {
    return this.http.post(`${API_BASE}/login`, {username, password}).pipe(
      tap((user: any) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  getCurrentUser(): any {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  isLoggedIn(): Boolean {
    return this.getCurrentUser() !== null;
  }
}

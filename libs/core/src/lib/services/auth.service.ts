import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1/auth';

  readonly user = signal<User | null>(null);
  readonly token = signal<string | null>(null);

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.base}/login`, { email, password });
  }

  setSession(res: AuthResponse) {
    localStorage.setItem('token', res.accessToken);
    this.user.set(res.user);
    this.token.set(res.accessToken);
  }

  logout() {
    localStorage.removeItem('token');
    this.user.set(null);
    this.token.set(null);
  }
}

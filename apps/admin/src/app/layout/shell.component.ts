import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'core';
import { HasRoleDirective } from '../shared/directives/has-role.directive';

@Component({
  standalone: true,
  selector: 'admin-shell',
  imports: [RouterLink, RouterOutlet, HasRoleDirective],
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/pages">Pages</a>
      <a routerLink="/categories" *hasRole="['Admin','Editor']">Categories</a>
      <a routerLink="/regions" *hasRole="['Admin','Editor']">Regions</a>
      <a routerLink="/themes" *hasRole="['Admin','Editor']">Themes</a>
      <a routerLink="/contacts" *hasRole="['Admin','Editor']">Contacts</a>
      <a routerLink="/uploads" *hasRole="['Admin','Editor']">Uploads</a>
      <a routerLink="/users" *hasRole="['Admin']">Users</a>
      <button type="button" (click)="logout()">Logout</button>
    </nav>
    <router-outlet />
  `
})
export class ShellComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

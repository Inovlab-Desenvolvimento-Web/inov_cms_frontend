import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'core';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="login()">
      <h1>Login</h1>
      <label>Email<input formControlName="email" type="email" /></label>
      <label>Password<input formControlName="password" type="password" /></label>
      <button>Entrar</button>
    </form>
  `
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });

  login() {
    const { email, password } = this.form.value as { email: string; password: string };
    this.auth.login(email, password).subscribe(res => {
      this.auth.setSession(res);
      this.router.navigateByUrl('/');
    });
  }
}

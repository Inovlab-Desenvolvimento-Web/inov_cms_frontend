import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
      <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <header class="space-y-2 text-center">
          <h1 class="text-2xl font-semibold text-slate-900">InovCMS Admin</h1>
          <p class="text-sm text-slate-500">Acesse com suas credenciais para gerenciar o portal.</p>
        </header>

        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
          <div class="space-y-1">
            <label class="block text-sm font-medium text-slate-600" for="email">E-mail</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
              placeholder="usuario@empresa.com"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-slate-600" for="password">Senha</label>
            <input
              id="password"
              type="password"
              formControlName="password"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            class="w-full rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Entrar
          </button>
        </form>

        <p class="text-xs text-center text-slate-400">Portal de conteúdo inovador.</p>
      </div>
    </div>
  `
})
export class LoginComponent {
  protected readonly form: FormGroup;
  protected readonly submitted = signal(false);

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit(): void {
    this.submitted.set(true);
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.auth.login(email, password).subscribe(res => {
        this.auth.setSession(res);
        this.router.navigateByUrl('/');
      });
    }
  }
}

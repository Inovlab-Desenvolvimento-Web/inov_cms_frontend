import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="mx-auto max-w-3xl px-6 py-12">
      <header class="space-y-2 text-center">
        <p class="text-sm uppercase tracking-wide text-indigo-600">Contato</p>
        <h1 class="text-3xl font-bold text-slate-900">Fale com a equipe</h1>
        <p class="text-sm text-slate-500">Envie sua mensagem e retornaremos em breve.</p>
      </header>

      <form [formGroup]="form" (ngSubmit)="submit()" class="mt-8 space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-1">
            <label class="block text-sm font-medium text-slate-600" for="name">Nome</label>
            <input
              id="name"
              type="text"
              formControlName="name"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div class="space-y-1">
            <label class="block text-sm font-medium text-slate-600" for="email">E-mail</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
        <div class="space-y-1">
          <label class="block text-sm font-medium text-slate-600" for="message">Mensagem</label>
          <textarea
            id="message"
            rows="5"
            formControlName="message"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          ></textarea>
        </div>
        <button type="submit" class="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Enviar mensagem
        </button>
      </form>
    </section>
  `
})
export class ContactComponent {
  protected readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      console.log('Contato enviado', this.form.value);
    }
  }
}

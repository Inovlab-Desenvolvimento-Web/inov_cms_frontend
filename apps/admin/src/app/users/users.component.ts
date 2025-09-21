import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthResponse, User } from '@core/models/auth.models';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-slate-800">Usuários</h2>
          <p class="text-sm text-slate-500">Controle acesso da equipe administrativa.</p>
        </div>
        <button class="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Novo usuário
        </button>
      </header>

      <table class="min-w-full overflow-hidden rounded-lg border border-slate-200 bg-white">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">Nome</th>
            <th class="px-4 py-3">E-mail</th>
            <th class="px-4 py-3">Função</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
          <tr *ngFor="let user of users()" class="hover:bg-slate-50">
            <td class="px-4 py-3 font-medium">{{ user.name }}</td>
            <td class="px-4 py-3">{{ user.email }}</td>
            <td class="px-4 py-3">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  `
})
export class UsersComponent {
  readonly users = signal<User[]>([
    { id: '1', name: 'Ana Souza', email: 'ana@inovcms.com', role: 'Admin' },
    { id: '2', name: 'Marcos Lima', email: 'marcos@inovcms.com', role: 'Editor' }
  ]);

  readonly lastResponse = signal<AuthResponse | null>(null);
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-6">
      <header>
        <h2 class="text-3xl font-semibold text-slate-800">Dashboard</h2>
        <p class="text-sm text-slate-500">Visão geral do conteúdo e métricas rápidas.</p>
      </header>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="text-sm font-medium text-slate-500">Páginas publicadas</h3>
          <p class="mt-2 text-2xl font-semibold text-slate-900">12</p>
        </article>
        <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="text-sm font-medium text-slate-500">Categorias</h3>
          <p class="mt-2 text-2xl font-semibold text-slate-900">5</p>
        </article>
        <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="text-sm font-medium text-slate-500">Temas ativos</h3>
          <p class="mt-2 text-2xl font-semibold text-slate-900">2</p>
        </article>
        <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="text-sm font-medium text-slate-500">Contatos recebidos</h3>
          <p class="mt-2 text-2xl font-semibold text-slate-900">18</p>
        </article>
      </div>
    </section>
  `
})
export class DashboardComponent {}

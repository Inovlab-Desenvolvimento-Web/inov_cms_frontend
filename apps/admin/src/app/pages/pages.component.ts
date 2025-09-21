import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page } from '@core/models/page.models';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-slate-800">Gerenciar Páginas</h2>
          <p class="text-sm text-slate-500">Crie, edite e publique conteúdos do portal.</p>
        </div>
        <button class="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Nova página
        </button>
      </header>

      <table class="min-w-full overflow-hidden rounded-lg border border-slate-200 bg-white">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">Título</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Categoria</th>
            <th class="px-4 py-3">Atualizado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
          <tr *ngFor="let page of publishedPages()" class="hover:bg-slate-50">
            <td class="px-4 py-3 font-medium">{{ page.title }}</td>
            <td class="px-4 py-3">
              <span class="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">{{ page.status }}</span>
            </td>
            <td class="px-4 py-3">{{ page.categoryId || 'Sem categoria' }}</td>
            <td class="px-4 py-3">{{ page.updatedAt | date: 'short' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  `
})
export class PagesComponent {
  private readonly pages = signal<Page[]>([
    {
      id: '1',
      title: 'Página Institucional',
      slug: 'pagina-institucional',
      content: '<p>Conteúdo institucional</p>',
      status: 'published',
      isHome: false,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Página Inicial',
      slug: 'home',
      content: '<p>Bem-vindo!</p>',
      status: 'draft',
      isHome: true,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  ]);

  readonly publishedPages = computed(() => this.pages().filter(page => page.status === 'published'));
}

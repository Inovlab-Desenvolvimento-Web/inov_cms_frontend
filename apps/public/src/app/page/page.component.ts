import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Page } from '@core/models/page.models';

@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="mx-auto max-w-3xl px-6 py-12">
      <header class="space-y-2">
        <p class="text-sm uppercase tracking-wide text-indigo-600">Conteúdo</p>
        <h1 class="text-4xl font-bold text-slate-900">{{ currentPage()?.title }}</h1>
      </header>

      <div class="prose prose-slate mt-6 max-w-none" [innerHTML]="currentPage()?.content"></div>

      <footer class="mt-12 flex justify-between text-sm text-slate-500">
        <span>Atualizado em {{ currentPage()?.updatedAt | date: 'longDate' }}</span>
        <a routerLink="/" class="font-medium text-indigo-600 hover:text-indigo-500">Voltar ao início</a>
      </footer>
    </article>
  `
})
export class PageComponent {
  private readonly pages = signal<Page[]>([
    {
      id: '1',
      title: 'Página Institucional',
      slug: 'pagina-institucional',
      content: '<p>Conteúdo institucional apresentado ao público.</p>',
      status: 'published',
      isHome: false,
      updatedAt: new Date().toISOString()
    }
  ]);

  private readonly slug = signal(this.route.snapshot.paramMap.get('slug'));

  readonly currentPage = computed(() => this.pages().find(page => page.slug === this.slug()) ?? this.pages()[0]);

  constructor(private readonly route: ActivatedRoute) {}
}

import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category, Page } from '@core/models/page.models';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-12">
      <header class="space-y-2">
        <p class="text-sm uppercase tracking-wide text-indigo-600">Categoria</p>
        <h1 class="text-3xl font-bold text-slate-900">{{ category()?.name }}</h1>
        <p class="text-sm text-slate-500">{{ category()?.description }}</p>
      </header>

      <ul class="mt-8 space-y-4">
        <li *ngFor="let page of categoryPages()" class="rounded-lg border border-slate-200 p-4 hover:shadow">
          <h2 class="text-lg font-semibold text-slate-900">{{ page.title }}</h2>
          <p class="text-sm text-slate-600">Atualizado em {{ page.updatedAt | date: 'short' }}</p>
          <a
            [routerLink]="['/page', page.slug]"
            class="mt-2 inline-flex text-sm font-semibold text-indigo-600"
          >
            Ler mais
          </a>
        </li>
      </ul>
    </section>
  `
})
export class CategoryComponent {
  private readonly categories = signal<Category[]>([
    { id: 'noticias', name: 'Notícias', description: 'Atualizações e comunicados importantes.' }
  ]);

  private readonly pages = signal<Page[]>([
    {
      id: '1',
      title: 'Novas iniciativas',
      slug: 'novas-iniciativas',
      content: '<p>Detalhes sobre ações municipais.</p>',
      status: 'published',
      categoryId: 'noticias',
      isHome: false,
      updatedAt: new Date().toISOString()
    }
  ]);

  private readonly id = signal(this.route.snapshot.paramMap.get('id'));

  readonly category = computed(() => this.categories().find(category => category.id === this.id()) ?? this.categories()[0]);

  readonly categoryPages = computed(() => this.pages().filter(page => page.categoryId === this.category()?.id));

  constructor(private readonly route: ActivatedRoute) {}
}

import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PublicApiService } from 'core';
import { Category, Page } from '@core/models/page.models';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-12" *ngIf="category()">
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
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PublicApiService);

  private readonly categorySignal = signal<Category | null>(null);
  private readonly pagesSignal = signal<Page[]>([]);

  readonly category = computed(() => this.categorySignal());
  readonly categoryPages = computed(() => this.pagesSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getPagesByCategory(id).subscribe(pages => {
      this.pagesSignal.set(pages);
      this.categorySignal.set(
        pages.length
          ? { id, name: id, description: undefined }
          : { id, name: id }
      );
    });
  }
}

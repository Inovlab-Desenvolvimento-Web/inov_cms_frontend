import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Page, Region } from '@core/models/page.models';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-12">
      <header class="space-y-2">
        <p class="text-sm uppercase tracking-wide text-indigo-600">Região</p>
        <h1 class="text-3xl font-bold text-slate-900">{{ region()?.city }}</h1>
        <p class="text-sm text-slate-500" *ngIf="region()?.district">Distrito: {{ region()?.district }}</p>
      </header>

      <div class="mt-8 space-y-4">
        <article *ngFor="let page of regionPages()" class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-slate-900">{{ page.title }}</h2>
          <p class="mt-2 text-sm text-slate-600">{{ page.content | slice: 0:120 }}...</p>
        </article>
      </div>
    </section>
  `
})
export class RegionComponent {
  private readonly regions = signal<Region[]>([
    { id: 'central', city: 'Cidade Central', district: 'Distrito 1' }
  ]);

  private readonly pages = signal<Page[]>([
    {
      id: '1',
      title: 'Ações no centro',
      slug: 'acoes-no-centro',
      content: 'Resumo de iniciativas realizadas na região central.',
      status: 'published',
      regionId: 'central',
      isHome: false,
      updatedAt: new Date().toISOString()
    }
  ]);

  private readonly id = signal(this.route.snapshot.paramMap.get('id'));

  readonly region = computed(() => this.regions().find(region => region.id === this.id()) ?? this.regions()[0]);

  readonly regionPages = computed(() => this.pages().filter(page => page.regionId === this.region()?.id));

  constructor(private readonly route: ActivatedRoute) {}
}

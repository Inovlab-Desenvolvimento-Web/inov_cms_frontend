import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Region } from '@core/models/page.models';

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-slate-800">Regiões</h2>
          <p class="text-sm text-slate-500">Cadastre regiões para direcionar conteúdos locais.</p>
        </div>
        <button class="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Nova região
        </button>
      </header>

      <div class="grid gap-4 md:grid-cols-2">
        <article *ngFor="let region of regions()" class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="text-base font-semibold text-slate-800">{{ region.city }}</h3>
          <p class="text-sm text-slate-500" *ngIf="region.district">Distrito: {{ region.district }}</p>
        </article>
      </div>
    </section>
  `
})
export class RegionsComponent {
  readonly regions = signal<Region[]>([
    { id: 'central', city: 'Cidade Central', district: 'Distrito 1' },
    { id: 'north', city: 'Zona Norte', district: 'Distrito 2' }
  ]);
}

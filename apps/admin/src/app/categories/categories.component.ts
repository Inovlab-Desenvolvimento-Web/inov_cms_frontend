import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '@core/models/page.models';
import { AdminApiService } from 'core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-slate-800">Categorias</h2>
          <p class="text-sm text-slate-500">Organize as páginas por assuntos e segmentos.</p>
        </div>
        <button class="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Nova categoria
        </button>
      </header>

      <ul class="space-y-3">
        <li *ngFor="let category of categories()" class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="text-base font-semibold text-slate-800">{{ category.name }}</h3>
          <p class="text-sm text-slate-500" *ngIf="category.description">{{ category.description }}</p>
        </li>
      </ul>
    </section>
  `
})
export class CategoriesComponent implements OnInit {
  private readonly api = inject(AdminApiService);

  readonly categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.api.listCategories().subscribe(categories => this.categories.set(categories));
  }
}

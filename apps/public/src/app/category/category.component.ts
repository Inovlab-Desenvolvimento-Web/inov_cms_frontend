import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PublicApiService } from 'core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DatePipe],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-12">
      <header class="space-y-2" *ngIf="category">
        <p class="text-sm uppercase tracking-wide text-indigo-600">Categoria</p>
        <h1 class="text-3xl font-bold text-slate-900">{{ category.name }}</h1>
        <p class="text-sm text-slate-500">{{ category.description }}</p>
      </header>

      <ul class="mt-8 space-y-4">
        <li *ngFor="let page of pages" class="rounded-lg border border-slate-200 p-4 hover:shadow">
          <h2 class="text-lg font-semibold text-slate-900">{{ page.title }}</h2>
          <p class="text-sm text-slate-600">Atualizado em {{ page.updatedAt | date: 'short' }}</p>
          <a
            [routerLink]="['/', page.slug]"
            class="mt-2 inline-flex text-sm font-semibold text-indigo-600"
          >
            Ler mais
          </a>
        </li>
      </ul>
    </section>
  `
})
export class CategoryComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PublicApiService);

  category: any;
  pages: any[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getPagesByCategory(id).subscribe(pages => {
      this.pages = pages;
      this.category = pages.length ? { id, name: id, description: undefined } : { id, name: id };
    });
  }
}

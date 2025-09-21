import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PublicApiService } from 'core';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [NgIf, NgFor, SlicePipe],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-12">
      <header class="space-y-2" *ngIf="region">
        <p class="text-sm uppercase tracking-wide text-indigo-600">Região</p>
        <h1 class="text-3xl font-bold text-slate-900">{{ region.city }}</h1>
        <p class="text-sm text-slate-500" *ngIf="region.district">Distrito: {{ region.district }}</p>
      </header>

      <div class="mt-8 space-y-4">
        <article *ngFor="let page of pages" class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-slate-900">{{ page.title }}</h2>
          <p class="mt-2 text-sm text-slate-600">{{ page.content | slice: 0:120 }}...</p>
        </article>
      </div>
    </section>
  `
})
export class RegionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PublicApiService);

  region: any;
  pages: any[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getPagesByRegion(id).subscribe(pages => {
      this.pages = pages;
      this.region = { id, city: id };
    });
  }
}

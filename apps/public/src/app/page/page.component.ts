import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PublicApiService } from 'core';
import { Page } from '@core/models/page.models';

@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article *ngIf="page()" class="mx-auto max-w-3xl px-6 py-12">
      <header class="space-y-2">
        <p class="text-sm uppercase tracking-wide text-indigo-600">Conteúdo</p>
        <h1 class="text-4xl font-bold text-slate-900">{{ page()?.title }}</h1>
      </header>

      <div class="prose prose-slate mt-6 max-w-none" [innerHTML]="page()?.content"></div>

      <footer class="mt-12 flex justify-between text-sm text-slate-500">
        <span *ngIf="page()?.updatedAt">Atualizado em {{ page()?.updatedAt | date: 'longDate' }}</span>
        <a routerLink="/" class="font-medium text-indigo-600 hover:text-indigo-500">Voltar ao início</a>
      </footer>
    </article>
  `
})
export class PageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PublicApiService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly pageSignal = signal<Page | null>(null);
  readonly page = computed(() => this.pageSignal());

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.getPageBySlug(slug).subscribe(page => {
      this.pageSignal.set(page);

      // SEO
      this.title.setTitle(page.metaTitle || page.title);
      if (page.metaDescription) {
        this.meta.updateTag({ name: 'description', content: page.metaDescription });
      }
      if (page.keywords?.length) {
        this.meta.updateTag({ name: 'keywords', content: page.keywords.join(', ') });
      }
    });
  }
}

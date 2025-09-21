import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PublicApiService } from 'core';
import { Page } from '@core/models/page.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
      <header class="space-y-4 text-center" *ngIf="page()">
        <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">Portal Municipal</p>
        <h1 class="text-4xl font-bold text-slate-900">{{ page()?.title }}</h1>
        <p class="text-lg text-slate-600" [innerHTML]="page()?.content"></p>
      </header>

      <div class="grid gap-6 md:grid-cols-3">
        <article class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-slate-900">Páginas</h2>
          <p class="mt-2 text-sm text-slate-600">Conteúdo institucional, serviços e notícias.</p>
          <a routerLink="/page/pagina-institucional" class="mt-4 inline-flex text-sm font-semibold text-indigo-600">Ver página</a>
        </article>
        <article class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-slate-900">Categorias</h2>
          <p class="mt-2 text-sm text-slate-600">Filtre os conteúdos por temas relevantes.</p>
          <a routerLink="/category/noticias" class="mt-4 inline-flex text-sm font-semibold text-indigo-600">Explorar</a>
        </article>
        <article class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-slate-900">Fale Conosco</h2>
          <p class="mt-2 text-sm text-slate-600">Entre em contato para solicitações e dúvidas.</p>
          <a routerLink="/contact" class="mt-4 inline-flex text-sm font-semibold text-indigo-600">Contato</a>
        </article>
      </div>
    </section>
  `
})
export class HomeComponent {
  private readonly api = inject(PublicApiService);

  private readonly pageSignal = signal<Page | null>(null);
  readonly page = computed(() => this.pageSignal());

  constructor() {
    this.api.getHome().subscribe(page => this.pageSignal.set(page));
  }
}

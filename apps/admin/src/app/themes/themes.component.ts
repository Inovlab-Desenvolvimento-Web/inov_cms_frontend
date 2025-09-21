import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Theme } from '@core/models/page.models';
import { AdminApiService } from 'core';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-slate-800">Temas</h2>
          <p class="text-sm text-slate-500">Gerencie temas visuais e recursos do portal.</p>
        </div>
        <button class="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Novo tema
        </button>
      </header>

      <div class="space-y-4">
        <article *ngFor="let theme of themes()" class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-semibold text-slate-800">{{ theme.name }}</h3>
              <p class="text-sm text-slate-500">{{ theme.css ? 'Tema personalizado' : 'Tema padrão' }}</p>
            </div>
            <div class="flex gap-2">
              <a [routerLink]="['/themes', 'editor']" class="rounded bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500">
                Editar
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `
})
export class ThemesComponent implements OnInit {
  private readonly api = inject(AdminApiService);

  readonly themes = signal<Theme[]>([]);

  ngOnInit(): void {
    this.api.listThemes().subscribe(themes => this.themes.set(themes));
  }
}

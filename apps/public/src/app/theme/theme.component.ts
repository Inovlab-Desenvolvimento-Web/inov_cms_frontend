import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PublicApiService } from 'core';
import { Theme } from '@core/models/page.models';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-12">
      <header class="space-y-2" *ngIf="theme()">
        <p class="text-sm uppercase tracking-wide text-indigo-600">Tema</p>
        <h1 class="text-3xl font-bold text-slate-900">{{ theme()?.name }}</h1>
      </header>

      <div *ngIf="theme()?.css" class="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6">
        <h2 class="text-lg font-semibold text-slate-900">CSS</h2>
        <pre class="mt-2 overflow-auto rounded bg-slate-900 p-4 text-xs text-slate-100">
{{ theme()?.css }}
        </pre>
      </div>

      <div *ngIf="theme()?.images?.length" class="mt-8 grid gap-4 sm:grid-cols-2">
        <img
          *ngFor="let image of theme()?.images"
          [src]="image"
          [alt]="theme()?.name"
          class="h-40 w-full rounded-lg object-cover"
        />
      </div>
    </section>
  `
})
export class ThemeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PublicApiService);

  private readonly themeSignal = signal<Theme | null>(null);

  readonly theme = computed(() => this.themeSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getTheme(id).subscribe(theme => this.themeSignal.set(theme));
  }
}

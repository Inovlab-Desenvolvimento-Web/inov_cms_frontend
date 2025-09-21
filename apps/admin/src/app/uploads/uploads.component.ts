import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Upload } from '@core/models/page.models';

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-slate-800">Uploads</h2>
          <p class="text-sm text-slate-500">Gerencie arquivos enviados para o CMS.</p>
        </div>
        <button class="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Enviar arquivos
        </button>
      </header>

      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table class="min-w-full text-sm text-slate-700">
          <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-4 py-3">Arquivo</th>
              <th class="px-4 py-3">Tipo</th>
              <th class="px-4 py-3">Tamanho</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr *ngFor="let file of uploads()" class="hover:bg-slate-50">
              <td class="px-4 py-3 font-medium">{{ file.filename }}</td>
              <td class="px-4 py-3">{{ file.mimetype }}</td>
              <td class="px-4 py-3">{{ file.size / 1024 | number: '1.0-0' }} KB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class UploadsComponent {
  readonly uploads = signal<Upload[]>([
    {
      id: 'banner',
      filename: 'banner-home.jpg',
      url: '/assets/banner-home.jpg',
      mimetype: 'image/jpeg',
      size: 256000
    }
  ]);
}

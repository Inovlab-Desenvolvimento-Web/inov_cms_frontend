import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex min-h-screen flex-col bg-white text-slate-900">
      <header class="border-b border-slate-200 bg-slate-50">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a routerLink="/" class="text-xl font-semibold text-indigo-600">InovCMS</a>
          <nav class="flex gap-4 text-sm font-medium">
            <a routerLink="/" class="hover:text-indigo-600">Início</a>
            <a routerLink="/category/noticias" class="hover:text-indigo-600">Categorias</a>
            <a routerLink="/region/central" class="hover:text-indigo-600">Regiões</a>
            <a routerLink="/theme/default" class="hover:text-indigo-600">Temas</a>
            <a routerLink="/contact" class="hover:text-indigo-600">Contato</a>
          </nav>
        </div>
      </header>

      <main class="flex-1">
        <router-outlet />
      </main>

      <footer class="border-t border-slate-200 bg-slate-50">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-slate-500">
          <span>© {{ currentYear }} InovCMS. Conteúdo público.</span>
          <a routerLink="/theme/default" class="hover:text-indigo-600">Tema atual</a>
        </div>
      </footer>
    </div>
  `
})
export class PublicLayoutComponent {
  protected readonly currentYear = new Date().getFullYear();
}

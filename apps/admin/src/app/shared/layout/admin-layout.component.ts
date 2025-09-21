import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-100">
      <div class="flex min-h-screen">
        <aside class="hidden w-64 flex-shrink-0 flex-col justify-between bg-slate-900 p-6 text-slate-100 lg:flex">
          <div class="space-y-6">
            <div>
              <h1 class="text-xl font-semibold">InovCMS</h1>
              <p class="text-sm text-slate-400">Painel administrativo</p>
            </div>
            <nav class="flex flex-col gap-2 text-sm font-medium">
              <a routerLink="/dashboard" class="rounded px-3 py-2 hover:bg-slate-800">Dashboard</a>
              <a routerLink="/pages" class="rounded px-3 py-2 hover:bg-slate-800">Páginas</a>
              <a routerLink="/categories" class="rounded px-3 py-2 hover:bg-slate-800">Categorias</a>
              <a routerLink="/regions" class="rounded px-3 py-2 hover:bg-slate-800">Regiões</a>
              <a routerLink="/themes" class="rounded px-3 py-2 hover:bg-slate-800">Temas</a>
              <a routerLink="/contacts" class="rounded px-3 py-2 hover:bg-slate-800">Contatos</a>
              <a routerLink="/uploads" class="rounded px-3 py-2 hover:bg-slate-800">Uploads</a>
              <a routerLink="/users" class="rounded px-3 py-2 hover:bg-slate-800">Usuários</a>
            </nav>
          </div>
          <footer class="text-xs text-slate-500">© {{ currentYear }} InovCMS</footer>
        </aside>

        <main class="flex-1">
          <header class="flex items-center justify-between bg-white px-6 py-4 shadow">
            <div>
              <p class="text-sm font-medium text-slate-500">Bem-vindo(a)</p>
              <h2 class="text-lg font-semibold text-slate-800">Gestor de Conteúdo</h2>
            </div>
            <a routerLink="/auth" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Sair</a>
          </header>

          <section class="p-6">
            <router-outlet />
          </section>
        </main>
      </div>
    </div>
  `
})
export class AdminLayoutComponent {
  protected readonly currentYear = new Date().getFullYear();
}

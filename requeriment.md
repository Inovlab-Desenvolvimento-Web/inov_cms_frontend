# InovCMS Frontend (Angular) — Admin + Public

> **Stack**: Angular 18, Angular Router, Standalone Components, Signals/Store, RxJS, TailwindCSS, Angular Material, ngx-quill (editor), ngx-dropzone (upload), ngx-toastr, ESLint, Prettier.

> **Módulos em inglês** (conforme pedido). O descritivo permanece em português.

---

## 1) Estrutura de Projeto

Monorepo opcional com duas apps (Admin + Public) e uma lib compartilhada com modelos/serviços.

```bash
# Com Angular CLI
npm create @angular@latest inovcms-frontend
cd inovcms-frontend

# Apps
ng g application admin --routing --style=scss --ssr=false
ng g application public --routing --style=scss --ssr=false

# Biblioteca compartilhada
ng g library core

# Instalações úteis
npm i @angular/material @angular/cdk @angular/animations tailwindcss postcss autoprefixer
npm i ngx-quill quill ngx-dropzone ngx-toastr
npm i jwt-decode
```

Tailwind (opcional) — `tailwind.config.js` e import no `styles.scss` das apps.

Estrutura sugerida:
```
apps/
  admin/
    src/
      app/
        auth/          (Auth pages)
        dashboard/
        pages/         (CRUD Page)
        categories/    (CRUD Category)
        regions/       (CRUD Region)
        themes/        (CRUD Theme)
        contacts/      (CRUD Contact)
        uploads/       (upload manager)
        users/         (Admin only)
        shared/
          components/
          guards/
          interceptors/
          layout/
  public/
    src/
      app/
        home/
        page/
        category/
        region/
        theme/
        contact/
        shared/
libs/
  core/
    src/
      lib/
        models/
        services/
        tokens/
```

---

## 2) Modelos (libs/core/models)

```ts
// libs/core/src/lib/models/auth.models.ts
export type UserRole = 'Admin' | 'Editor' | 'Viewer';
export interface AuthResponse { accessToken: string; user: User; }
export interface User { id: string; name: string; email: string; role: UserRole; }

// libs/core/src/lib/models/page.models.ts
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;           // HTML do editor
  status: 'draft' | 'published';
  categoryId?: string;
  regionId?: string;
  themeId?: string;
  isHome: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  updatedAt?: string;
  createdAt?: string;
}

export interface Category { id: string; name: string; description?: string; }
export interface Region { id: string; city: string; district?: string; }
export interface Theme { id: string; name: string; css?: string; images?: string[]; }
export interface Contact { id: string; phone?: string; email?: string; whatsapp?: string; address?: string; }
export interface Upload { id: string; url: string; filename: string; mimetype: string; size: number; }
```

---

## 3) Serviços de API (libs/core/services)

> **Base URLS**: Admin: `/api/v1/...` (JWT). Público: `/api/public/...` (sem token).

### 3.1) HttpClient com Interceptor JWT (Admin)

```ts
// apps/admin/src/app/shared/interceptors/jwt.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};
```

Registro no `main.ts` do Admin:

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './app/shared/interceptors/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
});
```

### 3.2) AuthService

```ts
// libs/core/src/lib/services/auth.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = '/api/v1/auth';

  user = signal<User | null>(null);
  token = signal<string | null>(null);

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.base}/login`, { email, password });
  }

  setSession(res: AuthResponse) {
    localStorage.setItem('token', res.accessToken);
    this.user.set(res.user);
    this.token.set(res.accessToken);
  }

  logout() {
    localStorage.removeItem('token');
    this.user.set(null);
    this.token.set(null);
  }
}
```

### 3.3) Admin APIs

```ts
// libs/core/src/lib/services/admin-api.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page, Category, Region, Theme, Contact, Upload } from '../models/page.models';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private http = inject(HttpClient);
  private base = '/api/v1';

  // Pages
  listPages(params?: any) { return this.http.get<Page[]>(`${this.base}/pages`, { params }); }
  getPage(id: string) { return this.http.get<Page>(`${this.base}/pages/${id}`); }
  createPage(dto: Partial<Page>) { return this.http.post<Page>(`${this.base}/pages`, dto); }
  updatePage(id: string, dto: Partial<Page>) { return this.http.put<Page>(`${this.base}/pages/${id}`, dto); }
  deletePage(id: string) { return this.http.delete<void>(`${this.base}/pages/${id}`); }
  publishPage(id: string) { return this.http.post<Page>(`${this.base}/pages/${id}/publish`, {}); }

  // Categories
  listCategories() { return this.http.get<Category[]>(`${this.base}/categories`); }

  // Regions
  listRegions() { return this.http.get<Region[]>(`${this.base}/regions`); }

  // Themes
  listThemes() { return this.http.get<Theme[]>(`${this.base}/themes`); }
  getTheme(id: string) { return this.http.get<Theme>(`${this.base}/themes/${id}`); }
  updateTheme(id: string, dto: Partial<Theme>) { return this.http.put<Theme>(`${this.base}/themes/${id}`, dto); }

  // Contacts
  listContacts() { return this.http.get<Contact[]>(`${this.base}/contacts`); }

  // Uploads
  upload(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<Upload>(`${this.base}/uploads`, form);
  }
}
```

### 3.4) Public API

```ts
// libs/core/src/lib/services/public-api.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page, Theme, Contact } from '../models/page.models';

@Injectable({ providedIn: 'root' })
export class PublicApiService {
  private http = inject(HttpClient);
  private base = '/api/public';

  getHome() { return this.http.get<Page>(`${this.base}/home`); }
  getPageBySlug(slug: string) { return this.http.get<Page>(`${this.base}/pages/${slug}`); }
  getPagesByCategory(id: string) { return this.http.get<Page[]>(`${this.base}/categories/${id}/pages`); }
  getPagesByRegion(id: string) { return this.http.get<Page[]>(`${this.base}/regions/${id}/pages`); }
  getTheme(id: string) { return this.http.get<Theme>(`${this.base}/themes/${id}`); }
  getContact(id: string) { return this.http.get<Contact>(`${this.base}/contacts/${id}`); }
}
```

---

## 4) Guards & Directives de Permissão (Admin)

### 4.1) RoleGuard

```ts
// apps/admin/src/app/shared/guards/role.guard.ts
import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'core';

export const roleGuard = (roles: ('Admin'|'Editor'|'Viewer')[]): CanMatchFn => {
  return () => {
    const user = inject(AuthService).user();
    return !!user && roles.includes(user.role);
  };
};
```

### 4.2) Structural directive `hasRole`

```ts
// apps/admin/src/app/shared/directives/has-role.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from 'core';

@Directive({ selector: '[hasRole]', standalone: true })
export class HasRoleDirective {
  private vc = inject(ViewContainerRef);
  private tpl = inject(TemplateRef<any>);
  private auth = inject(AuthService);

  @Input('hasRole') set roles(value: string[]) {
    const user = this.auth.user();
    if (user && value.includes(user.role)) {
      this.vc.clear();
      this.vc.createEmbeddedView(this.tpl);
    } else {
      this.vc.clear();
    }
  }
}
```

---

## 5) Routing (Admin)

```ts
// apps/admin/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { roleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    loadComponent: () => import('./layout/shell.component').then(m => m.ShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'pages', loadChildren: () => import('./pages/pages.routes').then(m => m.PAGES_ROUTES), canMatch: [roleGuard(['Admin','Editor','Viewer'])] },
      { path: 'categories', loadChildren: () => import('./categories/categories.routes').then(m => m.CATEGORIES_ROUTES), canMatch: [roleGuard(['Admin','Editor'])] },
      { path: 'regions', loadChildren: () => import('./regions/regions.routes').then(m => m.REGIONS_ROUTES), canMatch: [roleGuard(['Admin','Editor'])] },
      { path: 'themes', loadChildren: () => import('./themes/themes.routes').then(m => m.THEMES_ROUTES), canMatch: [roleGuard(['Admin','Editor'])] },
      { path: 'contacts', loadChildren: () => import('./contacts/contacts.routes').then(m => m.CONTACTS_ROUTES), canMatch: [roleGuard(['Admin','Editor'])] },
      { path: 'uploads', loadChildren: () => import('./uploads/uploads.routes').then(m => m.UPLOADS_ROUTES), canMatch: [roleGuard(['Admin','Editor'])] },
      { path: 'users', loadChildren: () => import('./users/users.routes').then(m => m.USERS_ROUTES), canMatch: [roleGuard(['Admin'])] },
    ]
  }
];
```

---

## 6) Exemplo de CRUD de Page (Admin)

### 6.1) Listagem

```ts
// apps/admin/src/app/pages/page-list.component.ts
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { AdminApiService } from 'core';

@Component({
  standalone: true,
  selector: 'admin-page-list',
  template: `
    <h1>Pages</h1>
    <button routerLink="/pages/new">New Page</button>
    <table>
      <thead>
        <tr>
          <th>Title</th><th>Slug</th><th>Status</th><th>Home</th><th>Updated</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of pages()">
          <td>{{p.title}}</td>
          <td>{{p.slug}}</td>
          <td>{{p.status}}</td>
          <td>{{p.isHome ? '✔' : ''}}</td>
          <td>{{p.updatedAt | date:'short'}}</td>
          <td>
            <a [routerLink]="['/pages', p.id]">Edit</a>
            <button (click)="publish(p.id)">Publish</button>
            <button (click)="remove(p.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class PageListComponent implements OnInit {
  private api = inject(AdminApiService);
  pages = signal([] as any[]);
  ngOnInit() { this.api.listPages().subscribe(d => this.pages.set(d)); }
  publish(id: string) { this.api.publishPage(id).subscribe(() => this.api.listPages().subscribe(d => this.pages.set(d))); }
  remove(id: string) { this.api.deletePage(id).subscribe(() => this.api.listPages().subscribe(d => this.pages.set(d))); }
}
```

### 6.2) Formulário com Editor, SEO e isHome

```ts
// apps/admin/src/app/pages/page-form.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminApiService } from 'core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule],
  template: `
    <h2>{{isEdit() ? 'Edit Page' : 'New Page'}}</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Title<input formControlName="title" /></label>
      <label>Slug<input formControlName="slug" /></label>
      <label>Status
        <select formControlName="status">
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </label>
      <label>Category<select formControlName="categoryId"></select></label>
      <label>Region<select formControlName="regionId"></select></label>
      <label>Theme<select formControlName="themeId"></select></label>

      <label><input type="checkbox" formControlName="isHome" /> Definir como Home</label>

      <quill-editor formControlName="content"></quill-editor>

      <fieldset>
        <legend>SEO</legend>
        <label>Meta Title<input formControlName="metaTitle" /></label>
        <label>Meta Description<textarea formControlName="metaDescription"></textarea></label>
        <label>Keywords (separadas por vírgula)<input formControlName="keywords" /></label>
      </fieldset>

      <button type="submit">Salvar</button>
    </form>
  `
})
export class PageFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(AdminApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id?: string;
  isEdit = signal(false);

  form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    status: ['draft', Validators.required],
    categoryId: [''],
    regionId: [''],
    themeId: [''],
    isHome: [false],
    content: [''],
    metaTitle: [''],
    metaDescription: [''],
    keywords: [''],
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.id) {
      this.isEdit.set(true);
      this.api.getPage(this.id).subscribe(p => {
        this.form.patchValue({ ...p, keywords: (p.keywords ?? []).join(', ') });
      });
    }
  }

  save() {
    const val = { ...this.form.value, keywords: (this.form.value.keywords || '').split(',').map((k: string) => k.trim()).filter(Boolean) };
    const obs = this.id ? this.api.updatePage(this.id, val) : this.api.createPage(val);
    obs.subscribe(() => this.router.navigate(['/pages']));
  }
}
```

---

## 7) Uploads (Admin)

```ts
// apps/admin/src/app/uploads/uploader.component.ts
import { Component, inject } from '@angular/core';
import { AdminApiService } from 'core';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  standalone: true,
  imports: [NgxDropzoneModule],
  template: `
    <h2>Uploads</h2>
    <ngx-dropzone (change)="onSelect($event)">
      <ngx-dropzone-label>Arraste arquivos aqui</ngx-dropzone-label>
    </ngx-dropzone>
    <div *ngFor="let f of files">{{f.name}}</div>
  `
})
export class UploaderComponent {
  private api = inject(AdminApiService);
  files: File[] = [];
  onSelect(ev: any) {
    for (const file of ev.addedFiles) {
      this.api.upload(file).subscribe();
    }
  }
}
```

---

## 8) Gestão de Temas (CSS + Imagens)

Página para editar CSS custom e associar imagens.

```ts
// apps/admin/src/app/themes/theme-editor.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdminApiService } from 'core';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Theme Editor</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Theme<select formControlName="id" (change)="loadTheme()"></select></label>
      <label>Custom CSS<textarea rows="10" formControlName="css"></textarea></label>
      <button>Salvar</button>
    </form>
  `
})
export class ThemeEditorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(AdminApiService);
  form = this.fb.group({ id: [''], css: [''] });
  themes: any[] = [];

  ngOnInit() { this.api.listThemes().subscribe(t => this.themes = t); }
  loadTheme() { const id = this.form.value.id as string; if (id) this.api.getTheme(id).subscribe(t => this.form.patchValue(t)); }
  save() { const { id, css } = this.form.value; if(id) this.api.updateTheme(id!, { css: css || '' }).subscribe(); }
}
```

---

## 9) App Pública (consome Public API) + Preview

### 9.1) Rotas públicas

```ts
// apps/public/src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'category/:id', loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent) },
  { path: 'region/:id', loadComponent: () => import('./region/region.component').then(m => m.RegionComponent) },
  { path: ':slug', loadComponent: () => import('./page/page.component').then(m => m.PageComponent) },
];
```

### 9.2) Home

```ts
// apps/public/src/app/home/home.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { PublicApiService } from 'core';

@Component({
  standalone: true,
  selector: 'public-home',
  template: `
    <style>
      /* CSS do tema aplicado dinamicamente (carregado do Theme.css) */
      :host { display:block; }
    </style>
    <section *ngIf="page">
      <h1>{{page.title}}</h1>
      <div [innerHTML]="page.content"></div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  private api = inject(PublicApiService);
  page: any;
  ngOnInit() { this.api.getHome().subscribe(p => this.page = p); }
}
```

### 9.3) Página por slug

```ts
// apps/public/src/app/page/page.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Title, Meta } from '@angular/platform-browser';
import { PublicApiService } from 'core';

@Component({
  standalone: true,
  template: `
    <article *ngIf="page">
      <h1>{{page.title}}</h1>
      <div [innerHTML]="page.content"></div>
    </article>
  `
})
export class PageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(PublicApiService);
  private title = inject(Title);
  private meta = inject(Meta);

  page: any;
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.getPageBySlug(slug).subscribe(p => {
      this.page = p;
      this.title.setTitle(p.metaTitle || p.title);
      if (p.metaDescription) this.meta.updateTag({ name: 'description', content: p.metaDescription });
      if (p.keywords?.length) this.meta.updateTag({ name: 'keywords', content: p.keywords.join(', ') });
    });
  }
}
```

> **Observação**: O cache com Redis é transparente para o frontend. Use cabeçalhos HTTP (e.g. `Cache-Control`) no backend; o browser aproveitará automaticamente.

---

## 10) Login e Sessão (Admin)

```ts
// apps/admin/src/app/auth/login.component.ts
import { Component, inject } from '@angular/core';
import { AuthService } from 'core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="login()">
      <h1>Login</h1>
      <label>Email<input formControlName="email" type="email" /></label>
      <label>Password<input formControlName="password" type="password" /></label>
      <button>Entrar</button>
    </form>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });

  login() {
    const { email, password } = this.form.value as any;
    this.auth.login(email, password).subscribe(res => {
      this.auth.setSession(res);
      this.router.navigateByUrl('/');
    });
  }
}
```

---

## 11) Layout & Navegação (Admin)

Shell com menu condicionado a `role`:

```ts
// apps/admin/src/app/layout/shell.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'core';

@Component({
  standalone: true,
  selector: 'admin-shell',
  imports: [RouterLink, RouterOutlet],
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/pages">Pages</a>
      <a routerLink="/categories" *ngIf="isEditorOrAdmin()">Categories</a>
      <a routerLink="/regions" *ngIf="isEditorOrAdmin()">Regions</a>
      <a routerLink="/themes" *ngIf="isEditorOrAdmin()">Themes</a>
      <a routerLink="/contacts" *ngIf="isEditorOrAdmin()">Contacts</a>
      <a routerLink="/uploads" *ngIf="isEditorOrAdmin()">Uploads</a>
      <a routerLink="/users" *ngIf="isAdmin()">Users</a>
      <button (click)="logout()">Logout</button>
    </nav>
    <router-outlet />
  `
})
export class ShellComponent {
  private auth = inject(AuthService);
  user() { return this.auth.user(); }
  isAdmin() { return this.user()?.role === 'Admin'; }
  isEditorOrAdmin() { return ['Admin','Editor'].includes(this.user()?.role ?? ''); }
  logout() { this.auth.logout(); }
}
```

---

## 12) Boas Práticas de Segurança (Frontend)

- Sanitização de HTML: confiar no editor, mas **nunca** renderizar HTML arbitrário sem sanitização no Admin.
- CSRF não se aplica por JWT em headers, mas aplicar `SameSite` se usar cookies.
- Validações de formulário (`Validators`) + máscaras (opcional).
- Não armazenar dados sensíveis no `localStorage` além do JWT. Considerar `sessionStorage` conforme o caso.

---

## 13) Observabilidade UX

- `ngx-toastr` para feedback de sucesso/erro.
- `HttpErrorResponse` interceptor para exibir mensagens padrões e tratar 401/403 com redirect para login.

```ts
// apps/admin/src/app/shared/interceptors/error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => next(req).pipe(
);
```
*(implementar conforme necessidade; disparar toast e redirecionar em 401)*

---

## 14) Variáveis de Ambiente

Criar `environment.ts` por app:

```ts
export const environment = {
  production: false,
  adminApi: '/api/v1',
  publicApi: '/api/public'
};
```

---

## 15) Scripts de Build & Deploy

- Admin e Public podem ser servidos pelo mesmo domínio do backend (reverse proxy) ou via CDN.
- Ajustar `baseHref`/`deployUrl` se necessário.

```json
// package.json (trecho)
{
  "scripts": {
    "start:admin": "ng serve admin -o",
    "start:public": "ng serve public -o",
    "build:admin": "ng build admin",
    "build:public": "ng build public"
  }
}
```

---

## 16) Roadmap de Incrementos

- **Preview** de página draft com token de preview (query param), evitando indexação.
- **SSR** (Angular Universal) na app `public` para SEO forte (usar metas já previstas).
- **Theme switch** per page.
- **Design system** com Angular Material/Tailwind (botões, tabelas, modais).
- **Form arrays** para imagens por tema e componentes dinâmicos na construção da landing.

---

## 17) Mapeamento com Back-end (cheat sheet)

- Admin CRUD → `/api/v1/pages|categories|regions|themes|contacts|uploads|users` (JWT + role).
- Public → `/api/public/home`, `/api/public/pages/:slug`, `/api/public/categories/:id/pages`, `/api/public/regions/:id/pages`, `/api/public/themes/:id`, `/api/public/contacts/:id`.
- Campos de `Page`: `isHome`, `metaTitle`, `metaDescription`, `keywords[]` implementados no form e no SEO da app pública.

---

## 18) Testes Rápidos

- Unit: serviços (mock HttpTestingController).
- E2E: fluir login → criar página draft → publicar → ver pública por slug → alternar `isHome` e validar `/` na app pública.

---

### Observações finais

- Com esta base, você consegue rodar o **Admin** para gestão e a **Public** para consumo do conteúdo servido pela **Public API** com cache Redis no backend.
- Os nomes dos módulos/rotas/classes estão em **inglês**, enquanto a documentação (este arquivo) permanece em **português** conforme solicitado.


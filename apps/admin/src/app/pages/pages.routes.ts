import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./page-list.component').then(m => m.PageListComponent) },
  { path: 'new', loadComponent: () => import('./page-form.component').then(m => m.PageFormComponent) },
  { path: ':id', loadComponent: () => import('./page-form.component').then(m => m.PageFormComponent) }
];

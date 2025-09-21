import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'category/:id', loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent) },
  { path: 'region/:id', loadComponent: () => import('./region/region.component').then(m => m.RegionComponent) },
  { path: ':slug', loadComponent: () => import('./page/page.component').then(m => m.PageComponent) }
];

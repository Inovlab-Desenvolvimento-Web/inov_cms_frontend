import { Routes } from '@angular/router';

export const REGIONS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./regions.component').then(m => m.RegionsComponent) }
];

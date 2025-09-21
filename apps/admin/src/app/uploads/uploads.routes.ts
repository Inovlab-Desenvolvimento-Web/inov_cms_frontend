import { Routes } from '@angular/router';

export const UPLOADS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./uploader.component').then(m => m.UploaderComponent) }
];

import { Routes } from '@angular/router';

export const THEMES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./themes.component').then(m => m.ThemesComponent) },
  { path: 'editor', loadComponent: () => import('./theme-editor.component').then(m => m.ThemeEditorComponent) }
];

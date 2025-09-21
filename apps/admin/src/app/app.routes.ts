import { Routes } from '@angular/router';
import { roleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layout/shell.component').then(m => m.ShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canMatch: [roleGuard(['Admin', 'Editor', 'Viewer'])]
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.routes').then(m => m.PAGES_ROUTES),
        canMatch: [roleGuard(['Admin', 'Editor', 'Viewer'])]
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.routes').then(m => m.CATEGORIES_ROUTES),
        canMatch: [roleGuard(['Admin', 'Editor'])]
      },
      {
        path: 'regions',
        loadChildren: () =>
          import('./regions/regions.routes').then(m => m.REGIONS_ROUTES),
        canMatch: [roleGuard(['Admin', 'Editor'])]
      },
      {
        path: 'themes',
        loadChildren: () =>
          import('./themes/themes.routes').then(m => m.THEMES_ROUTES),
        canMatch: [roleGuard(['Admin', 'Editor'])]
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./contacts/contacts.routes').then(m => m.CONTACTS_ROUTES),
        canMatch: [roleGuard(['Admin', 'Editor'])]
      },
      {
        path: 'uploads',
        loadChildren: () =>
          import('./uploads/uploads.routes').then(m => m.UPLOADS_ROUTES),
        canMatch: [roleGuard(['Admin', 'Editor'])]
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.routes').then(m => m.USERS_ROUTES),
        canMatch: [roleGuard(['Admin'])]
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

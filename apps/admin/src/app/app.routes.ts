import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { CategoriesComponent } from './categories/categories.component';
import { RegionsComponent } from './regions/regions.component';
import { ThemesComponent } from './themes/themes.component';
import { ContactsComponent } from './contacts/contacts.component';
import { UploadsComponent } from './uploads/uploads.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pages', component: PagesComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'regions', component: RegionsComponent },
      { path: 'themes', component: ThemesComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'uploads', component: UploadsComponent },
      { path: 'users', component: UsersComponent }
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
  },
  { path: '**', redirectTo: '' }
];

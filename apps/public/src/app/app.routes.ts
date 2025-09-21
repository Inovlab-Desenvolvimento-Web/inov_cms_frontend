import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './shared/layout/public-layout.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { CategoryComponent } from './category/category.component';
import { RegionComponent } from './region/region.component';
import { ThemeComponent } from './theme/theme.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'page/:slug', component: PageComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'region/:id', component: RegionComponent },
      { path: 'theme/:id', component: ThemeComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

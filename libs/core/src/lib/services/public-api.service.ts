import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact, Page, Theme } from '../models/page.models';

@Injectable({ providedIn: 'root' })
export class PublicApiService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/public';

  getHome() {
    return this.http.get<Page>(`${this.base}/home`);
  }

  getPageBySlug(slug: string) {
    return this.http.get<Page>(`${this.base}/pages/${slug}`);
  }

  getPagesByCategory(id: string) {
    return this.http.get<Page[]>(`${this.base}/categories/${id}/pages`);
  }

  getPagesByRegion(id: string) {
    return this.http.get<Page[]>(`${this.base}/regions/${id}/pages`);
  }

  getTheme(id: string) {
    return this.http.get<Theme>(`${this.base}/themes/${id}`);
  }

  getContact(id: string) {
    return this.http.get<Contact>(`${this.base}/contacts/${id}`);
  }
}

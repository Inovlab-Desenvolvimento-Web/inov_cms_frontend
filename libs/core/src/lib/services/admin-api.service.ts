import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Contact, Page, Region, Theme, Upload } from '../models/page.models';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1';

  listPages(params?: Record<string, any>) {
    return this.http.get<Page[]>(`${this.base}/pages`, { params });
  }

  getPage(id: string) {
    return this.http.get<Page>(`${this.base}/pages/${id}`);
  }

  createPage(dto: Partial<Page>) {
    return this.http.post<Page>(`${this.base}/pages`, dto);
  }

  updatePage(id: string, dto: Partial<Page>) {
    return this.http.put<Page>(`${this.base}/pages/${id}`, dto);
  }

  deletePage(id: string) {
    return this.http.delete<void>(`${this.base}/pages/${id}`);
  }

  publishPage(id: string) {
    return this.http.post<Page>(`${this.base}/pages/${id}/publish`, {});
  }

  listCategories() {
    return this.http.get<Category[]>(`${this.base}/categories`);
  }

  listRegions() {
    return this.http.get<Region[]>(`${this.base}/regions`);
  }

  listThemes() {
    return this.http.get<Theme[]>(`${this.base}/themes`);
  }

  getTheme(id: string) {
    return this.http.get<Theme>(`${this.base}/themes/${id}`);
  }

  updateTheme(id: string, dto: Partial<Theme>) {
    return this.http.put<Theme>(`${this.base}/themes/${id}`, dto);
  }

  listContacts() {
    return this.http.get<Contact[]>(`${this.base}/contacts`);
  }

  upload(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<Upload>(`${this.base}/uploads`, form);
  }
}

import { Injectable, Signal, computed, signal } from '@angular/core';
import { Page, Category, Region, Theme, Contact, Upload } from '../models/page.models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly pages = signal<Page[]>([]);
  private readonly categories = signal<Category[]>([]);
  private readonly regions = signal<Region[]>([]);
  private readonly themes = signal<Theme[]>([]);
  private readonly contacts = signal<Contact[]>([]);
  private readonly uploads = signal<Upload[]>([]);

  readonly publishedPages: Signal<Page[]> = computed(() =>
    this.pages().filter(page => page.status === 'published')
  );

  setPages(pages: Page[]): void {
    this.pages.set(pages);
  }

  setCategories(categories: Category[]): void {
    this.categories.set(categories);
  }

  setRegions(regions: Region[]): void {
    this.regions.set(regions);
  }

  setThemes(themes: Theme[]): void {
    this.themes.set(themes);
  }

  setContacts(contacts: Contact[]): void {
    this.contacts.set(contacts);
  }

  setUploads(uploads: Upload[]): void {
    this.uploads.set(uploads);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories().find(category => category.id === id);
  }

  getRegionById(id: string): Region | undefined {
    return this.regions().find(region => region.id === id);
  }

  getThemeById(id: string): Theme | undefined {
    return this.themes().find(theme => theme.id === id);
  }

  getContactById(id: string): Contact | undefined {
    return this.contacts().find(contact => contact.id === id);
  }

  getUploadById(id: string): Upload | undefined {
    return this.uploads().find(upload => upload.id === id);
  }
}

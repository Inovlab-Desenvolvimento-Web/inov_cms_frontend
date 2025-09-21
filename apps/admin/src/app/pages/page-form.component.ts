import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { AdminApiService, Category, Region, Theme } from 'core';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule, NgFor],
  template: `
    <h2>{{ isEdit() ? 'Edit Page' : 'New Page' }}</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Title<input formControlName="title" /></label>
      <label>Slug<input formControlName="slug" /></label>
      <label>Status
        <select formControlName="status">
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </label>
      <label>Category
        <select formControlName="categoryId">
          <option value="">Selecione</option>
          <option *ngFor="let category of categories()" [value]="category.id">{{ category.name }}</option>
        </select>
      </label>
      <label>Region
        <select formControlName="regionId">
          <option value="">Selecione</option>
          <option *ngFor="let region of regions()" [value]="region.id">{{ region.city }}</option>
        </select>
      </label>
      <label>Theme
        <select formControlName="themeId">
          <option value="">Selecione</option>
          <option *ngFor="let theme of themes()" [value]="theme.id">{{ theme.name }}</option>
        </select>
      </label>

      <label><input type="checkbox" formControlName="isHome" /> Definir como Home</label>

      <quill-editor formControlName="content"></quill-editor>

      <fieldset>
        <legend>SEO</legend>
        <label>Meta Title<input formControlName="metaTitle" /></label>
        <label>Meta Description<textarea formControlName="metaDescription"></textarea></label>
        <label>Keywords (separadas por vírgula)<input formControlName="keywords" /></label>
      </fieldset>

      <button type="submit">Salvar</button>
    </form>
  `
})
export class PageFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AdminApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  id?: string;
  readonly isEdit = signal(false);

  readonly categories = signal<Category[]>([]);
  readonly regions = signal<Region[]>([]);
  readonly themes = signal<Theme[]>([]);

  readonly form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    status: ['draft', Validators.required],
    categoryId: [''],
    regionId: [''],
    themeId: [''],
    isHome: [false],
    content: [''],
    metaTitle: [''],
    metaDescription: [''],
    keywords: ['']
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.api.listCategories().subscribe(categories => this.categories.set(categories));
    this.api.listRegions().subscribe(regions => this.regions.set(regions));
    this.api.listThemes().subscribe(themes => this.themes.set(themes));

    if (this.id) {
      this.isEdit.set(true);
      this.api.getPage(this.id).subscribe(page => {
        this.form.patchValue({ ...page, keywords: (page.keywords ?? []).join(', ') });
      });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = {
      ...this.form.value,
      keywords: (this.form.value.keywords || '')
        .split(',')
        .map((keyword: string) => keyword.trim())
        .filter(Boolean)
    };

    const request = this.id ? this.api.updatePage(this.id, value) : this.api.createPage(value);
    request.subscribe(() => this.router.navigate(['/pages']));
  }
}

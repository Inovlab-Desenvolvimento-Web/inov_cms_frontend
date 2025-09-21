import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AdminApiService } from 'core';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  template: `
    <h2>Theme Editor</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Theme
        <select formControlName="id" (change)="loadTheme()">
          <option value="">Selecione um tema</option>
          <option *ngFor="let theme of themes" [value]="theme.id">{{ theme.name }}</option>
        </select>
      </label>
      <label>Custom CSS<textarea rows="10" formControlName="css"></textarea></label>
      <button type="submit">Salvar</button>
    </form>
  `
})
export class ThemeEditorComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AdminApiService);

  readonly form = this.fb.group({ id: [''], css: [''] });
  themes: any[] = [];

  ngOnInit(): void {
    this.api.listThemes().subscribe(themes => (this.themes = themes));
  }

  loadTheme() {
    const id = this.form.value.id as string;
    if (id) {
      this.api.getTheme(id).subscribe(theme => this.form.patchValue(theme));
    }
  }

  save() {
    const { id, css } = this.form.value;
    if (id) {
      this.api.updateTheme(id, { css: css || '' }).subscribe();
    }
  }
}

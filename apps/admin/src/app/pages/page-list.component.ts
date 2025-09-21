import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, NgFor } from '@angular/common';
import { AdminApiService, Page } from 'core';

@Component({
  standalone: true,
  selector: 'admin-page-list',
  imports: [RouterLink, NgFor, DatePipe],
  template: `
    <h1>Pages</h1>
    <button routerLink="/pages/new">New Page</button>
    <table>
      <thead>
        <tr>
          <th>Title</th><th>Slug</th><th>Status</th><th>Home</th><th>Updated</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of pages()">
          <td>{{ p.title }}</td>
          <td>{{ p.slug }}</td>
          <td>{{ p.status }}</td>
          <td>{{ p.isHome ? '✔' : '' }}</td>
          <td>{{ p.updatedAt | date: 'short' }}</td>
          <td>
            <a [routerLink]="['/pages', p.id]">Edit</a>
            <button type="button" (click)="publish(p.id)">Publish</button>
            <button type="button" (click)="remove(p.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class PageListComponent implements OnInit {
  private readonly api = inject(AdminApiService);

  readonly pages = signal<Page[]>([]);

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.api.listPages().subscribe(pages => this.pages.set(pages));
  }

  publish(id: string) {
    this.api.publishPage(id).subscribe(() => this.load());
  }

  remove(id: string) {
    this.api.deletePage(id).subscribe(() => this.load());
  }
}

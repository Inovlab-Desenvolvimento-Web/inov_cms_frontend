import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { PublicApiService } from 'core';

@Component({
  standalone: true,
  selector: 'public-home',
  imports: [NgIf],
  template: `
    <style>
      /* CSS do tema aplicado dinamicamente (carregado do Theme.css) */
      :host { display:block; }
    </style>
    <section *ngIf="page">
      <h1>{{ page.title }}</h1>
      <div [innerHTML]="page.content"></div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  private readonly api = inject(PublicApiService);

  page: any;

  ngOnInit(): void {
    this.api.getHome().subscribe(page => (this.page = page));
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PublicApiService } from 'core';

@Component({
  standalone: true,
  template: `
    <article *ngIf="page">
      <h1>{{ page.title }}</h1>
      <div [innerHTML]="page.content"></div>
    </article>
  `,
  imports: [NgIf]
})
export class PageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PublicApiService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  page: any;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.getPageBySlug(slug).subscribe(page => {
      this.page = page;
      this.title.setTitle(page.metaTitle || page.title);
      if (page.metaDescription) {
        this.meta.updateTag({ name: 'description', content: page.metaDescription });
      }
      if (page.keywords?.length) {
        this.meta.updateTag({ name: 'keywords', content: page.keywords.join(', ') });
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { AdminApiService } from 'core';

@Component({
  standalone: true,
  imports: [NgxDropzoneModule, NgFor],
  template: `
    <h2>Uploads</h2>
    <ngx-dropzone (change)="onSelect($event)">
      <ngx-dropzone-label>Arraste arquivos aqui</ngx-dropzone-label>
    </ngx-dropzone>
    <div *ngFor="let f of files">{{ f.name }}</div>
  `
})
export class UploaderComponent {
  private readonly api = inject(AdminApiService);

  files: File[] = [];

  onSelect(event: NgxDropzoneChangeEvent) {
    for (const file of event.addedFiles) {
      this.files.push(file);
      this.api.upload(file).subscribe();
    }
  }
}

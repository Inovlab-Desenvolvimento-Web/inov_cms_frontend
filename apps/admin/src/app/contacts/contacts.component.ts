import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '@core/models/page.models';
import { AdminApiService } from 'core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-slate-800">Contatos</h2>
          <p class="text-sm text-slate-500">Gerencie informações de contato visíveis ao público.</p>
        </div>
        <button class="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Novo contato
        </button>
      </header>

      <div class="grid gap-4 md:grid-cols-2">
        <article *ngFor="let contact of contacts()" class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="text-base font-semibold text-slate-800">{{ contact.email || contact.phone }}</h3>
          <ul class="mt-2 space-y-1 text-sm text-slate-500">
            <li *ngIf="contact.phone">Telefone: {{ contact.phone }}</li>
            <li *ngIf="contact.whatsapp">WhatsApp: {{ contact.whatsapp }}</li>
            <li *ngIf="contact.email">E-mail: {{ contact.email }}</li>
            <li *ngIf="contact.address">Endereço: {{ contact.address }}</li>
          </ul>
        </article>
      </div>
    </section>
  `
})
export class ContactsComponent implements OnInit {
  private readonly api = inject(AdminApiService);

  readonly contacts = signal<Contact[]>([]);

  ngOnInit(): void {
    this.api.listContacts().subscribe(contacts => this.contacts.set(contacts));
  }
}

# InovCMS Frontend

Monorepo Angular 18 com duas aplicações (Admin e Public) e biblioteca compartilhada (`core`). O projeto utiliza componentes standalone, Angular Router, Signals e integrações com TailwindCSS, Angular Material, ngx-quill, ngx-dropzone e ngx-toastr.

## Estrutura

```
apps/
  admin/      # Painel administrativo
  public/     # Portal público
libs/
  core/       # Modelos, serviços e tokens compartilhados
```

## Scripts principais

- `npm run start:admin` – inicia o painel administrativo.
- `npm run start:public` – inicia o portal público.
- `npm run build` – compila as aplicações.
- `npm run lint` – executa o ESLint.
- `npm run test` – executa os testes unitários.
- `npm run format` – formata o código com Prettier.

## TailwindCSS

Tailwind está configurado via `tailwind.config.js` e aplicado nos arquivos `styles.scss` de cada aplicação. A biblioteca `@tailwindcss/typography` está habilitada para melhorar a renderização de conteúdo HTML.

## Biblioteca Core

A biblioteca `core` expõe modelos de autenticação e páginas, além de um serviço de conteúdo reativo e token de configuração para URL de API.

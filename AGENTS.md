# AGENTS.md

Panduan operasional untuk coding agents di repository `services/portfolio`.

## Objective

Bangun perubahan yang aman untuk production, kecil cakupannya, dan mudah direview.

## Engineering Guardrails

- Gunakan `bun` untuk semua command.
- Hindari refactor besar jika tidak diminta.
- Hindari perubahan visual lintas halaman kecuali task memang desain/UI.
- Jangan commit atau menulis ulang file env sensitif.
- Jangan melakukan aksi destruktif git tanpa instruksi eksplisit.

## Runtime & Security Rules

- Auth dan env hardening terpusat di:
  - `src/lib/server-env.ts`
  - `src/lib/auth.ts`
  - `src/db/index.ts`
- Jangan bypass `validateServerRuntimeEnv()` untuk production.
- Untuk fitur baru yang butuh env, tambahkan:
  1. validasi di helper env
  2. entri di `.env.example`
  3. dokumentasi di `docs/technical-guides`

## Code Areas

- Public site (SEO/content):
  - `src/pages/index.astro`
  - `src/pages/blog/*`
- Community app:
  - `src/pages/app/*`
  - `src/components/app/*`
- API:
  - `src/pages/api/*`

## Testing & Validation Protocol

Minimal setelah perubahan:

```bash
bun run validate
```

Jika perubahan menyentuh build/runtime/auth/env:

```bash
bun run build
```

Jika perubahan menyentuh schema/database:

```bash
bun run db:generate
bun run db:migrate
```

## Documentation Protocol

- Update docs jika ada perubahan behavior, bukan hanya perubahan implementasi.
- Gunakan dokumen ini sebagai rujukan hardening:
  - `docs/technical-guides/ENV_HARDENING_CHECKLIST.md`

## Done Criteria

Perubahan dianggap selesai jika:

1. Scope task tercapai.
2. Tidak merusak validasi (`bun run validate` lolos).
3. Tidak menurunkan posture security (khususnya auth/env).
4. Dokumentasi relevan ikut diperbarui.

# CLAUDE.md

Panduan singkat untuk agent Claude/Coding Assistant saat bekerja di repository ini.

## Project Snapshot

- Stack utama: Astro 5, Tailwind CSS v4, Qwik islands.
- Auth: Better Auth + Drizzle adapter.
- Database: LibSQL/Turso (`@libsql/client`) dengan fallback lokal `file:local.db` untuk development.
- Package manager utama: `pnpm`.

## Struktur Penting

- `src/pages`: routing Astro (public site + app + API endpoints).
- `src/components`: komponen UI dan feature modules.
- `src/lib/auth.ts`: konfigurasi Better Auth.
- `src/lib/server-env.ts`: env loader + runtime validation (fail-fast production).
- `src/db/index.ts`: inisialisasi Drizzle client.
- `src/db/schema.ts`: definisi tabel Drizzle.
- `src/content`: konten markdown (blog, contributors).
- `docs/technical-guides/ENV_HARDENING_CHECKLIST.md`: checklist hardening env production.

## Perintah Kerja

```bash
pnpm install
pnpm dev
pnpm run validate
pnpm run build
```

## Aturan Environment

- Jangan hardcode secret/token.
- Production wajib punya:
  - `BETTER_AUTH_BASE_URL` (HTTPS URL absolut)
  - `BETTER_AUTH_SECRET` (entropy tinggi, >=32 chars)
  - `TURSO_DATABASE_URL`
  - `TURSO_AUTH_TOKEN` (wajib jika URL `libsql://`)
- OAuth harus berpasangan:
  - `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET`
  - `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET`

## Aturan Perubahan Kode

- Prioritaskan perubahan minimal dan terfokus.
- Jaga kompatibilitas SSR + client islands.
- Untuk endpoint API, pastikan response shape konsisten dan error handling eksplisit.
- Jangan ubah perilaku auth/session tanpa validasi `pnpm run validate`.
- Jangan menambah dependensi baru kecuali benar-benar diperlukan.

## Checklist Sebelum Selesai

1. Jalankan `pnpm run validate`.
2. Jika menyentuh route/runtime, jalankan `pnpm run build`.
3. Pastikan tidak ada secret di file tracked git.
4. Update dokumentasi jika mengubah perilaku auth/env/deploy.

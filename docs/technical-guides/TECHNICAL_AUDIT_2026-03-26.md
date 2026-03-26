# Technical Audit + Refactor Priorities (2026-03-26)

## Ringkasan Eksekutif

Codebase sudah punya fondasi baik (Astro + content architecture rapi, auth middleware aktif), tetapi ada area kritis pada konsistensi runtime, kompleksitas frontend, dan kualitas API layer yang perlu diprioritaskan.

Temuan utama:
- Risk tinggi: mocking/data placeholder pada endpoint dan komponen inti.
- Risk menengah: kompleksitas styling global yang besar, duplikasi komponen/layout, dan route app yang bercampur antara konsep demo dan production.
- Risk menengah-rendah: observability, pengujian API, dan konsistensi UX state.

## Prioritas Refactor

## P0 (Segera)

1. Real data path untuk komunitas (feed/comments/auth-bound actions).
- Status: mulai ditangani di update ini (posts + comments + like pakai DB).
- Dampak: menghapus gap antara UI dan state server.

2. Standarisasi contract API.
- Terapkan response envelope konsisten (`{ success, data, error }`).
- Hindari endpoint yang behavior-nya overlap (`PUT /api/comments` vs `POST /api/comments/like`).

3. Production env hardening.
- Status: sudah diterapkan fail-fast validation.
- Tindak lanjut: integrasi ke checklist deploy CI/CD.

## P1 (1 Sprint)

1. Refactor `CommentsSystem.astro` menjadi island komponen typed (Qwik/Svelte tunggal).
- Saat ini script DOM imperative masih besar.
- Target: state-driven render + typed DTO + testable logic.

2. Pisahkan domain API:
- `api/blog/*` untuk komentar/analytics blog
- `api/app/*` untuk social feed
- kurangi endpoint generik yang ambigu.

3. Konsolidasi state management feed.
- Tambah pagination/cursor.
- Tambah optimistic update dengan rollback terstandar.

## P2 (2-3 Sprint)

1. Rationalisasi CSS token dan utility layer.
- `src/styles/global.css` sangat besar dan campur concern design system + component-level override.
- Pisah menjadi token, base, components, utilities.

2. Kurangi duplikasi komponen/layout.
- Header/footer/layout variants sangat banyak, rawan drift.
- Tetapkan satu baseline layout public + extension pattern.

3. Data model enrichment komunitas.
- Tambah table untuk `app_post_shares`, `app_post_bookmarks`, `app_post_media`.
- Gunakan migration workflow tunggal (tanpa drift snapshot).

## P3 (Backlog Terarah)

1. Observability:
- structured logging untuk API errors.
- request tracing untuk route `/api/*`.

2. Test coverage:
- integration test API auth/posts/comments.
- e2e untuk feed create/like dan blog comment flow.

3. Performance:
- audit hydrasi island di halaman app.
- cek bundle cost untuk markdown renderer dependency chain.

## Temuan Detail

1. Endpoint mock masih jadi jalur utama di beberapa fitur.
- Lokasi: `src/pages/api/analytics.ts`, sebagian behavior komentar lama.
- Risiko: mismatch perilaku production vs ekspektasi bisnis.

2. Komponen komentar sebelumnya render mock di server lalu fetch di client tanpa re-render penuh.
- Lokasi: `src/components/blog/CommentsSystem.astro`.
- Risiko: stale UI dan ilusi sukses submit.

3. Feed sebelumnya sepenuhnya in-memory demo.
- Lokasi: `src/components/app/Feed.tsx`.
- Risiko: data hilang saat refresh dan tidak terikat user session.

4. Kompleksitas style global tinggi.
- Lokasi: `src/styles/global.css`.
- Risiko: regressions visual saat perubahan kecil.

5. API contract belum seragam.
- Lokasi: `src/pages/api/*`.
- Risiko: frontend handling error tidak konsisten.

## Rencana Eksekusi Refactor

1. Sprint 1:
- Finalisasi contract API & typed DTO.
- Lengkapi test integration untuk posts/comments.

2. Sprint 2:
- Modularisasi `CommentsSystem` menjadi island typed.
- Implement pagination/cursor di feed API.

3. Sprint 3:
- CSS architecture split + cleanup layout variants.
- Tambah observability baseline.

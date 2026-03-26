# Environment Hardening Checklist (Production)

## Tujuan
Dokumen ini memastikan konfigurasi environment untuk auth dan database aman saat deploy production.

## Variabel Wajib

1. `BETTER_AUTH_BASE_URL`
Contoh: `https://www.konxc.space`
Aturan: wajib URL absolut dan harus `https://` di production.

2. `BETTER_AUTH_SECRET`
Aturan:
- minimal 32 karakter
- entropy tinggi (random)
- jangan gunakan placeholder (`your_secret_here`, `change_me`, dll)

3. `TURSO_DATABASE_URL`
Contoh: `libsql://your-db.turso.io`
Aturan: wajib di production.

4. `TURSO_AUTH_TOKEN`
Aturan: wajib jika `TURSO_DATABASE_URL` memakai `libsql://`.

## Variabel Opsional yang Direkomendasikan

1. `BETTER_AUTH_TRUSTED_ORIGINS`
Format: comma-separated URL absolut.
Contoh:
`https://www.konxc.space,https://konxc.space,https://admin.konxc.space`

2. OAuth providers
- `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET`

Aturan: harus berpasangan. Jika hanya salah satu terisi, startup akan gagal di production.

## Startup Guard (Fail-Fast)

Runtime akan melakukan validasi env saat server boot melalui:
- `src/lib/server-env.ts` (`validateServerRuntimeEnv`)
- dipanggil oleh `src/lib/auth.ts` dan `src/db/index.ts`

Jika ada masalah env di production:
- server log akan mencetak JSON terstruktur berisi daftar issue
- aplikasi akan gagal startup dengan error ringkas

Contoh log:

```json
{
  "environment": "production",
  "issueCount": 2,
  "issues": [
    {
      "name": "BETTER_AUTH_SECRET",
      "reason": "weak or placeholder secret",
      "expected": "high-entropy secret (min 32 chars)"
    },
    {
      "name": "TURSO_AUTH_TOKEN",
      "reason": "missing token for libsql database URL",
      "expected": "valid Turso auth token"
    }
  ]
}
```

## Checklist Pra-Deploy

1. Konfirmasi semua variabel wajib tersedia di environment target.
2. Jalankan validasi lokal:
`NODE_ENV=production pnpm run validate`
3. Jalankan build:
`NODE_ENV=production pnpm run build`
4. Verifikasi tidak ada secret sensitif di repository atau artifact.

## Rotasi Secret (Wajib Saat Insiden)

1. Rotate `BETTER_AUTH_SECRET`.
2. Rotate `TURSO_AUTH_TOKEN`.
3. Rotate OAuth client secret (`GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_SECRET`) jika terpapar.
4. Redeploy service.
5. Verifikasi login, session, dan akses database berjalan normal.

## Catatan Operasional

- Jangan commit `.env`, `.env.production`, atau secret ke git.
- Simpan secret di secret manager platform deploy.
- Gunakan value berbeda untuk `development`, `staging`, dan `production`.

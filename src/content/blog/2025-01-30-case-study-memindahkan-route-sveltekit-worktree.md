---
title: "Case Study: Memindahkan Route SvelteKit dengan Git Worktree"
description: "Tutorial praktis berdasarkan kasus nyata: memindahkan route waiting-list dari group (public) ke (auth) di SvelteKit menggunakan Git worktree. Pelajari step-by-step proses, error yang muncul, solusinya, dan lessons learned dari implementasi real-world."
publishDate: 2025-01-30
author: "Tim Koneksi"
category: "case-study"
tags: ["git-worktree", "sveltekit", "refactoring-case-study", "engineering-workflow"]
featured: true
readingTime: 18
coverImage: "/images/blog/git-worktree-sveltekit-case.png"
---

# Case Study: Memindahkan Route SvelteKit dengan Git Worktree

_Tutorial praktis berdasarkan kasus nyata: bagaimana kami memindahkan route `waiting-list` dari group `(public)` ke `(auth)` di SvelteKit menggunakan Git worktree, mengatasi error yang muncul, dan berhasil merge ke main dengan clean history._

---

## Konteks dan Latar Belakang

### Masalah yang Dihadapi

Di project **Naik Kelas by Koneksi** (platform learning berbasis SvelteKit), kami memiliki route `/waiting-list` yang awalnya berada di group `(public)`.

**Masalah:**

- Route ini perlu menggunakan layout dari group `(auth)` (sama seperti signin/signup)
- Route sudah memiliki server actions (`join` action untuk form submission)
- Perlu refactoring tanpa mengganggu development aktif di main

### Struktur Route Sebelumnya

```
src/routes/
├── (public)/
│   ├── waiting-list/
│   │   ├── +page.server.ts  # Server actions
│   │   └── +page.svelte     # UI component
│   └── marketplace/
└── (auth)/
    └── auth/
        ├── signin/
        └── signup/
```

### Tujuan Refactoring

```
src/routes/
├── (public)/
│   └── marketplace/
└── (auth)/
    ├── waiting-list/          # ← Dipindahkan ke sini
    │   ├── +page.server.ts
    │   └── +page.svelte
    └── auth/
        ├── signin/
        └── signup/
```

**Mengapa menggunakan worktree?**

- Isolasi perubahan dari main branch
- Bisa test dan develop tanpa mengganggu work aktif
- Easy cleanup jika ada masalah
- Clear history dengan merge commit

---

## Step 1: Setup Worktree

### 1.1: Buat Worktree untuk Branch Baru

```bash
# Di main repository
cd /home/dev/web/koneksi/learning.konxc.space

# Buat worktree dengan branch baru
git worktree add ../learning-route-refactor -b refactor/move-waiting-list-to-auth

# Verifikasi
git worktree list
```

**Output:**

```
/home/dev/web/koneksi/learning.konxc.space         abc123 [main]
/home/dev/web/koneksi/learning-route-refactor      def456 [refactor/move-waiting-list-to-auth]
```

### 1.2: Pindah ke Worktree

```bash
cd ../learning-route-refactor
git branch
# Output: * refactor/move-waiting-list-to-auth
```

---

## Step 2: Memindahkan Route

### 2.1: Buat Direktori Baru

```bash
# Buat direktori baru di (auth) group
mkdir -p src/routes/\(auth\)/waiting-list
```

### 2.2: Pindahkan File

```bash
# Copy file dari lokasi lama ke baru
cp src/routes/\(public\)/waiting-list/+page.server.ts src/routes/\(auth\)/waiting-list/
cp src/routes/\(public\)/waiting-list/+page.svelte src/routes/\(auth\)/waiting-list/

# Verifikasi file sudah ada
ls -la src/routes/\(auth\)/waiting-list/
```

### 2.3: Hapus File Lama

```bash
# Hapus file dari lokasi lama
rm src/routes/\(public\)/waiting-list/+page.server.ts
rm src/routes/\(public\)/waiting-list/+page.svelte

# Hapus direktori kosong
rmdir src/routes/\(public\)/waiting-list
```

### 2.4: Update File jika Diperlukan

File `+page.server.ts` perlu update untuk disable prerendering (karena memiliki server actions):

```typescript
// src/routes/(auth)/waiting-list/+page.server.ts
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
// ... other imports

// Disable prerendering because this page has server actions
export const prerender = false;

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  join: async ({ request }) => {
    // ... existing code
  },
};
```

---

## Step 3: Testing Perubahan

### 3.1: Test Build

```bash
# Di worktree
cd /home/dev/web/koneksi/learning-route-refactor

# Test build
pnpm run build

# Test dev server
pnpm run dev
```

### 3.2: Test Route

```bash
# Akses route baru
curl http://localhost:5173/waiting-list

# Test form submission
curl -X POST http://localhost:5173/waiting-list?/join \
  -d "fullName=Test&email=test@example.com"
```

### 3.3: Verifikasi Layout

Pastikan route menggunakan layout dari group `(auth)`:

- Layout header/footer dari auth group
- Styling consistent dengan signin/signup
- Form components bekerja dengan baik

---

## Step 4: Error yang Muncul dan Solusinya

### Error 1: "Cannot prerender pages with actions"

**Error:**

```
[500] GET /waiting-list
Error: Cannot prerender pages with actions
```

**Penyebab:**

- SvelteKit mencoba prerender halaman dengan server actions
- Server actions tidak bisa di-prerender (perlu runtime server)

**Solusi:**
Tambahkan `export const prerender = false` di `+page.server.ts`:

```typescript
// src/routes/(auth)/waiting-list/+page.server.ts
export const prerender = false;
```

**Verifikasi:**

```bash
pnpm run dev
# Route sekarang bisa diakses tanpa error
```

### Error 2: Cursor/IDE Error "Unable to read file"

**Error:**

```
Failed to apply worktree to current branch:
Unable to read file '.../src/routes/(public)/waiting-list/+page.server.ts'
```

**Penyebab:**

- Cursor masih memiliki referensi ke file lama di lokasi `(public)`
- File sudah dipindahkan tapi Cursor cache belum update

**Solusi:**

**Option 1: Reload Window**

```
Ctrl+Shift+P → "Reload Window"
```

**Option 2: Reset Worktree**

```bash
# Di main repository
cd /home/dev/web/koneksi/learning.konxc.space

# Reset worktree untuk sync dengan Git state
cd ../learning-route-refactor
git reset --hard HEAD
git clean -fd
```

**Option 3: Repair Worktree**

```bash
# Di main repository
git worktree repair
```

**Verifikasi:**

```bash
git worktree list
# Harus show worktree dengan benar
```

### Error 3: Git Tidak Mengenali Rename

**Masalah:**
Git mungkin tidak otomatis mengenali file move sebagai rename.

**Solusi:**

```bash
# Gunakan git mv untuk explicit rename tracking
# Atau gunakan git add untuk stage perubahan

# Di worktree
cd /home/dev/web/koneksi/learning-route-refactor

# Git akan mengenali sebagai rename jika similarity tinggi
git add -A
git status
# Output: renamed: src/routes/(public)/... → src/routes/(auth)/...
```

---

## Step 5: Commit Perubahan

### 5.1: Stage Perubahan

```bash
# Di worktree
cd /home/dev/web/koneksi/learning-route-refactor

# Add semua perubahan
git add -A

# Check status
git status
```

**Expected output:**

```
renamed:    src/routes/(public)/waiting-list/+page.server.ts
            -> src/routes/(auth)/waiting-list/+page.server.ts
renamed:    src/routes/(public)/waiting-list/+page.svelte
            -> src/routes/(auth)/waiting-list/+page.svelte
```

### 5.2: Commit dengan Pesan yang Jelas

```bash
git commit -m "refactor: move waiting-list route from (public) to (auth) group

- Move route untuk konsistensi layout dengan auth pages
- Add prerender = false untuk server actions
- Update route structure untuk better organization"
```

### 5.3: Push ke Remote

```bash
git push -u origin refactor/move-waiting-list-to-auth
```

---

## Step 6: Merge ke Main

### 6.1: Kembali ke Main Repository

```bash
cd /home/dev/web/koneksi/learning.konxc.space
git checkout main
git pull origin main
```

### 6.2: Merge Branch

```bash
git merge refactor/move-waiting-list-to-auth --no-ff
```

**Jika merge berhasil:**

```
Merge made by the 'ort' strategy.
 renamed:    src/routes/(public)/waiting-list/+page.server.ts
             -> src/routes/(auth)/waiting-list/+page.server.ts
 renamed:    src/routes/(public)/waiting-list/+page.svelte
             -> src/routes/(auth)/waiting-list/+page.svelte
```

**Jika ada conflict:**
Resolve conflict seperti biasa:

```bash
# Edit file yang conflict
code src/routes/(auth)/waiting-list/+page.server.ts

# Setelah resolve
git add src/routes/(auth)/waiting-list/+page.server.ts
git commit
```

### 6.3: Verifikasi Merge

```bash
# Pastikan file ada di lokasi baru
ls -la src/routes/\(auth\)/waiting-list/

# Pastikan file lama sudah tidak ada
test -d src/routes/\(public\)/waiting-list && echo "DIR MASIH ADA" || echo "DIR SUDAH DIHAPUS"

# Test build
pnpm run build
```

### 6.4: Push Main yang Sudah Di-merge

```bash
git push origin main
```

---

## Step 7: Cleanup

### 7.1: Hapus Worktree

```bash
# Di main repository
cd /home/dev/web/koneksi/learning.konxc.space

# Hapus worktree
git worktree remove ../learning-route-refactor

# Verifikasi
git worktree list
# Should only show main repository
```

### 7.2: Hapus Branch Lokal

```bash
# Hapus branch lokal yang sudah di-merge
git branch -d refactor/move-waiting-list-to-auth
```

### 7.3: Hapus Branch Remote (Opsional)

```bash
# Hapus remote branch jika tidak diperlukan lagi
git push origin --delete refactor/move-waiting-list-to-auth
```

---

<!-- INTERACTIVE_DEMO:route-migration-process -->

```
┌─────────────────────────────────────────────────────┐
│ ROUTE MIGRATION PROCESS FLOW                       │
└─────────────────────────────────────────────────────┘

BEFORE:
src/routes/(public)/waiting-list/
├── +page.server.ts
└── +page.svelte

AFTER:
src/routes/(auth)/waiting-list/
├── +page.server.ts  (+ prerender = false)
└── +page.svelte

PROCESS:
┌─────────────┐
│ 1. Setup    │
│ Worktree    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 2. Move     │
│ Files       │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐
│ 3. Fix      │────►│ Error        │
│ Code        │     │ Solutions    │
└──────┬──────┘     └──────────────┘
       │
       ▼
┌─────────────┐
│ 4. Test     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 5. Commit   │
│ & Push      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 6. Merge to │
│ Main        │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 7. Cleanup  │
└─────────────┘

TIME ESTIMATE:
1. Setup:      2 min
2. Move:       5 min
3. Fix:        10 min (error handling)
4. Test:       5 min
5. Commit:     2 min
6. Merge:      3 min
7. Cleanup:   2 min
───────────────────
TOTAL:         29 min

WITHOUT WORKTREE:
- Switch branch: 1 min
- Risk conflict with active work
- Need stash/commit current work
- More risky!
```

<!-- END_INTERACTIVE_DEMO -->

---

<!-- INTERACTIVE_DEMO:error-solutions -->

```bash
# ============================================
# ERROR SOLUTIONS FROM CASE STUDY
# ============================================

# ERROR 1: Cannot prerender pages with actions
# Solution:
echo "export const prerender = false;" >> \
  src/routes/\(auth\)/waiting-list/+page.server.ts

# ERROR 2: IDE cannot read file (old location)
# Solution 1: Reload IDE
# Ctrl+Shift+P → "Reload Window"

# Solution 2: Reset worktree
cd /home/dev/web/koneksi/learning-route-refactor
git reset --hard HEAD
git clean -fd

# Solution 3: Repair worktree
cd /home/dev/web/koneksi/learning.konxc.space
git worktree repair

# ERROR 3: Git not recognizing rename
# Solution: Use git add -A
cd /home/dev/web/koneksi/learning-route-refactor
git add -A  # Git will detect rename automatically
git status  # Should show "renamed: ..."

# ERROR 4: Merge conflict
# Solution: Standard conflict resolution
git merge refactor/move-waiting-list-to-auth
# If conflict:
code src/routes/\(auth\)/waiting-list/+page.server.ts
# Edit to resolve
git add src/routes/\(auth\)/waiting-list/+page.server.ts
git commit

# ERROR 5: Cannot remove worktree (uncommitted changes)
# Solution:
cd ../learning-route-refactor
git add .
git commit -m "WIP: save changes"
cd /home/dev/web/koneksi/learning.konxc.space
git worktree remove ../learning-route-refactor

# ERROR 6: Directory still exists after move
# Solution:
# Check for empty directory
test -d src/routes/\(public\)/waiting-list && \
  rmdir src/routes/\(public\)/waiting-list || \
  echo "Directory already removed"

# ERROR 7: Route not found after move
# Solution:
# 1. Check if file in correct location
ls -la src/routes/\(auth\)/waiting-list/

# 2. Restart dev server
pkill -f "vite dev"
pnpm run dev

# 3. Check SvelteKit route configuration
# Route should work automatically with new structure
```

<!-- END_INTERACTIVE_DEMO -->

---

## Lessons Learned

### 1. **Prerender False untuk Server Actions**

**Lesson:**

- Routes dengan server actions **tidak bisa di-prerender**
- Harus explicit set `prerender = false`
- Error hanya muncul saat runtime, bukan build time

**Best Practice:**

```typescript
// Always add this for routes with server actions
export const prerender = false;
```

### 2. **IDE Cache dan Worktree**

**Lesson:**

- IDE (Cursor/VS Code) cache file references
- Worktree changes butuh refresh IDE state
- Reload window biasanya cukup untuk fix

**Best Practice:**

```bash
# After major file moves in worktree:
# 1. Reload IDE window
# 2. Or restart IDE if needed
# 3. Or reset worktree for clean state
```

### 3. **Git Rename Detection**

**Lesson:**

- Git otomatis detect rename jika similarity > 50%
- `git add -A` biasanya cukup
- `git mv` explicit untuk complex cases

**Best Practice:**

```bash
# Use git add -A for simple moves
# Git will detect rename automatically

# Use git mv for explicit control if needed
git mv old/path new/path
```

### 4. **Worktree Isolation**

**Lesson:**

- Worktree memberikan isolation sempurna
- Bisa test changes tanpa risk ke main
- Easy rollback dengan hapus worktree

**Best Practice:**

```bash
# Use worktree for:
# - Major refactoring
# - Route restructuring
# - Experimental changes
# - Isolated feature development
```

### 5. **Progressive Cleanup**

**Lesson:**

- Cleanup secara bertahap lebih aman
- Verify setiap step sebelum next
- Don't rush cleanup process

**Best Practice:**

```
1. Verify merge success
2. Test in production (if applicable)
3. Wait 1-2 weeks
4. Delete local branch
5. Delete remote branch (if safe)
```

---

## Key Takeaways

### ✅ Benefits dari Menggunakan Worktree

1. **Isolation**: Changes terisolasi dari main work
2. **Safety**: Bisa rollback dengan mudah
3. **Testing**: Test changes tanpa impact ke main
4. **History**: Clean merge history dengan merge commit
5. **Cleanup**: Easy cleanup setelah selesai

### ⚠️ Common Pitfalls

1. **Lupa set prerender = false** untuk server actions
2. **IDE cache** yang belum update setelah file move
3. **Rush cleanup** sebelum verify merge success
4. **Lupa test** setelah merge di main
5. **Uncommitted changes** yang hilang saat cleanup

### 🎯 Best Practices

1. **Always test** di worktree sebelum merge
2. **Set prerender = false** untuk routes dengan actions
3. **Reload IDE** setelah major file moves
4. **Use git add -A** untuk auto-detect rename
5. **Progressive cleanup** dengan verify setiap step
6. **Document purpose** worktree untuk easier decision

---

## Alternative Approaches

### Approach 1: Direct Edit di Main (Tidak Disarankan)

```bash
# ❌ BAD: Direct edit di main
cd /home/dev/web/koneksi/learning.konxc.space
# Edit files directly
# Risk: Conflict dengan active work
# Risk: Break main branch
```

**Masalah:**

- Risk conflict dengan active development
- Tidak bisa test isolasi
- Break main branch jika error
- Sulit rollback

### Approach 2: Stash dan Switch (Traditional)

```bash
# ⚠️ OK but cumbersome
cd /home/dev/web/koneksi/learning.konxc.space
git stash
git checkout -b refactor/move-route
# Edit files...
git commit
git checkout main
git merge refactor/move-route
git stash pop  # Risk: Conflicts!
```

**Masalah:**

- Perlu stash/unstash
- Risk conflicts saat stash pop
- Context switching overhead
- Tidak bisa parallel work

### Approach 3: Worktree (Recommended ✅)

```bash
# ✅ BEST: Worktree approach
git worktree add ../refactor -b refactor/move-route
cd ../refactor
# Edit files...
git commit
cd /home/project
git merge refactor/move-route
git worktree remove ../refactor
```

**Keuntungan:**

- No stash needed
- Parallel work possible
- Easy rollback
- Clean history

---

## Conclusion

Case study ini menunjukkan bagaimana Git worktree digunakan untuk refactoring route di SvelteKit dengan sukses:

1. ✅ **Isolation**: Changes terisolasi dengan worktree
2. ✅ **Error Handling**: Identify dan solve errors tanpa impact ke main
3. ✅ **Clean Merge**: Successfully merge dengan clean history
4. ✅ **Easy Cleanup**: Remove worktree setelah selesai

**Key Success Factors:**

- Understanding SvelteKit routing dan prerendering
- Proper error handling dan solutions
- Clean Git workflow dengan worktree
- Progressive cleanup dengan verification

**Next Steps untuk Anda:**

1. Try worktree untuk refactoring di project Anda
2. Document errors dan solutions yang ditemukan
3. Share knowledge dengan tim
4. Build SOP untuk tim dari lessons learned

---

## Referensi Tambahan

- [SvelteKit Routing Documentation](https://kit.svelte.dev/docs/routing)
- [SvelteKit Server Actions](https://kit.svelte.dev/docs/form-actions)
- Artikel Koneksi: [Workflow Lengkap Git Worktree](./2025-01-30-git-worktree-workflow-lengkap-merge-ke-main.md)
- Artikel Koneksi: [Git Worktree: Tingkatkan Produktivitas](./2025-01-29-git-worktree-tingkatkan-produktivitas-development.md)

---

**Ditulis oleh:** Tim Development Koneksi  
**Tags:** Git, Worktree, SvelteKit, Case Study, Routing, Refactoring  
**Category:** Case Study

_Belajar dari kasus nyata membantu kita menghindari pitfalls dan mengadopsi best practices. Untuk diskusi lebih lanjut tentang SvelteKit atau Git workflows, hubungi tim di developers@konxc.space._

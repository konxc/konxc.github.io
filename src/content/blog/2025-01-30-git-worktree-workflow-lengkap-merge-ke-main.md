---
title: "Workflow Lengkap Git Worktree: Dari Create Hingga Merge ke Main"
description: "Panduan step-by-step lengkap untuk menggunakan Git worktree mulai dari membuat worktree, bekerja di worktree, commit, push, merge ke main branch, hingga cleanup. Tutorial praktis untuk developer yang ingin menguasai workflow worktree secara menyeluruh."
publishDate: 2025-01-30
author: "Tim Koneksi"
category: "tutorial"
tags:
  [
    "git",
    "worktree",
    "workflow",
    "merge",
    "best-practices",
    "version-control",
    "tutorial",
  ]
featured: false
readingTime: 15
interactiveDemos:
  [
    {
      id: "workflow-complete",
      type: "code",
      title: "Complete Worktree Workflow Script",
      description: "Script lengkap untuk semua langkah dalam workflow worktree",
      icon: "💻",
      featured: true,
      metadata: { tags: ["workflow", "script"], language: "bash" },
    },
    {
      id: "merge-workflow",
      type: "visual",
      title: "Merge Workflow Visualization",
      description: "Visualisasi alur merge dari worktree branch ke main",
      icon: "📊",
      featured: true,
      metadata: { tags: ["merge", "visualization"] },
    },
  ]
---

# Workflow Lengkap Git Worktree: Dari Create Hingga Merge ke Main

_Panduan komprehensif step-by-step untuk menguasai Git worktree dari awal hingga akhir, termasuk cara menggabungkan perubahan dari worktree ke branch utama dengan aman dan efisien._

---

## Pendahuluan

Setelah memahami konsep Git worktree dan manfaatnya, langkah selanjutnya adalah menguasai **workflow lengkap** dari pembuatan worktree hingga merge ke main branch. Artikel ini akan memandu Anda melalui setiap langkah secara detail dengan contoh-contoh praktis.

**Apa yang akan Anda pelajari:**

1. ✅ Membuat worktree untuk branch baru atau existing
2. ✅ Bekerja di worktree dengan aman
3. ✅ Commit dan push perubahan dari worktree
4. ✅ Merge worktree branch ke main dengan benar
5. ✅ Cleanup worktree setelah merge selesai
6. ✅ Troubleshooting common issues

## Prerequisites

Sebelum memulai, pastikan Anda sudah:

- Memahami dasar Git (clone, commit, push, pull)
- Memiliki akses ke repository Git
- Mengerti konsep branch dan merge
- Sudah membaca artikel dasar tentang Git worktree (opsional tapi disarankan)

---

## Step 1: Membuat Worktree untuk Branch Baru

### Skenario: Feature Development

Anggaplah Anda ingin membuat feature baru untuk login system. Daripada mengganggu work aktif di main, buat worktree terpisah.

### Langkah 1.1: Checkout ke Repository Utama

```bash
# Pastikan berada di repository utama
cd /home/dev/web/koneksi/learning.konxc.space

# Pastikan working directory clean atau commit perubahan yang ada
git status
```

### Langkah 1.2: Buat Worktree dengan Branch Baru

```bash
# Format: git worktree add <path> -b <branch-name>
git worktree add ../learning-login-feature -b feature/new-login
```

**Apa yang terjadi:**

- Git membuat folder baru `../learning-login-feature`
- Membuat branch baru `feature/new-login`
- Checkout branch tersebut di folder baru
- Semua siap untuk development

### Langkah 1.3: Verifikasi Worktree

```bash
# Lihat daftar worktree yang aktif
git worktree list
```

**Output yang diharapkan:**

```
/home/dev/web/koneksi/learning.konxc.space      abc123 [main]
/home/dev/web/koneksi/learning-login-feature    def456 [feature/new-login]
```

### Langkah 1.4: Pindah ke Worktree

```bash
# Masuk ke worktree baru
cd ../learning-login-feature

# Verifikasi branch yang aktif
git branch

# Output: * feature/new-login
```

---

## Step 2: Bekerja di Worktree

### Development Normal

Setelah masuk ke worktree, semua operasi Git bekerja normal seperti biasa.

```bash
# Edit file, buat komponen baru, dll
code src/components/LoginForm.svelte

# Add perubahan
git add src/components/LoginForm.svelte

# Commit dengan pesan yang jelas
git commit -m "feat: add login form component with validation"
```

### Multiple Commits

Anda bisa melakukan banyak commit di worktree:

```bash
# Commit 1: Add component
git commit -m "feat: add login form component"

# Commit 2: Add validation
git commit -m "feat: add form validation logic"

# Commit 3: Add error handling
git commit -m "feat: add error handling for login"
```

**Keuntungan:** Semua perubahan terisolasi di worktree, tidak mengganggu main worktree.

### Status Check

Untuk melihat status di worktree:

```bash
# Di dalam worktree
cd /home/dev/web/koneksi/learning-login-feature
git status

# Output normal seperti biasa
# On branch feature/new-login
# Changes to be committed: ...
```

---

## Step 3: Push Perubahan ke Remote

Setelah commit, push branch ke remote untuk backup dan kolaborasi.

### Langkah 3.1: Push Branch ke Remote

```bash
# Masih di worktree
cd /home/dev/web/koneksi/learning-login-feature

# Push branch ke remote (pertama kali)
git push -u origin feature/new-login

# Atau jika sudah pernah push sebelumnya
git push
```

**Mengapa push ke remote penting:**

- ✅ Backup code Anda
- ✅ Memungkinkan kolaborasi dengan tim
- ✅ Bisa di-review via Pull Request
- ✅ Recovery jika local worktree terhapus

### Langkah 3.2: Verifikasi di Remote

```bash
# Cek di GitHub/GitLab
# Branch harus muncul di remote

# Atau via command
git branch -r | grep feature/new-login
# Output: origin/feature/new-login
```

---

## Step 4: Merge Worktree Branch ke Main

Ini adalah bagian paling penting. Ada beberapa strategi merge yang bisa digunakan.

### Strategi 1: Merge di Main Repository (Recommended)

**Langkah 4.1: Kembali ke Main Repository**

```bash
# Keluar dari worktree, kembali ke main
cd /home/dev/web/koneksi/learning.konxc.space

# Pastikan di branch main dan up-to-date
git checkout main
git pull origin main
```

**Langkah 4.2: Merge Branch dari Worktree**

```bash
# Merge branch dari worktree ke main
git merge feature/new-login
```

**Jika merge berhasil (no conflict):**

```
Merge made by the 'ort' strategy.
 src/components/LoginForm.svelte | 150 +++++++++++++++++++++++
 1 file changed, 150 insertions(+)
```

**Jika ada conflict:**

Git akan memberi tahu file mana yang conflict. Resolve conflict seperti biasa:

```bash
# Edit file yang conflict
code src/components/LoginForm.svelte

# Setelah resolve, add dan commit
git add src/components/LoginForm.svelte
git commit -m "Merge feature/new-login into main"

# Atau gunakan merge commit yang sudah ada
git commit --no-edit
```

**Langkah 4.3: Push Main yang Sudah Di-merge**

```bash
# Push main yang sudah include merge
git push origin main
```

### Strategi 2: Merge via Pull Request (Tim Collaboration)

Jika bekerja dalam tim, lebih baik gunakan Pull Request:

1. **Push branch dari worktree** (sudah dilakukan di Step 3)
2. **Create Pull Request** di GitHub/GitLab
3. **Review dan diskusi** dengan tim
4. **Approve dan merge** via web interface
5. **Pull main terbaru** di local:

```bash
cd /home/dev/web/koneksi/learning.konxc.space
git checkout main
git pull origin main
```

**Keuntungan Pull Request:**

- ✅ Code review sebelum merge
- ✅ Diskusi dengan tim
- ✅ CI/CD testing otomatis
- ✅ History yang lebih jelas

---

## Step 5: Cleanup Worktree Setelah Merge

Setelah merge selesai dan sudah di-push, hapus worktree yang tidak diperlukan lagi.

### Langkah 5.1: Verifikasi Merge

Pastikan merge sudah benar-benar selesai:

```bash
# Di main repository
cd /home/dev/web/koneksi/learning.konxc.space

# Pastikan branch sudah di-merge
git branch --merged main | grep feature/new-login
# Output: feature/new-login (jika sudah merged)
```

### Langkah 5.2: Hapus Worktree

```bash
# Hapus worktree (ini akan menghapus folder juga)
git worktree remove ../learning-login-feature

# Atau jika folder sudah dihapus manual
git worktree prune
```

**Verifikasi:**

```bash
git worktree list
# Output: Hanya main repository yang tersisa
```

### Langkah 5.3: Hapus Branch Lokal (Opsional)

```bash
# Hapus branch lokal yang sudah di-merge
git branch -d feature/new-login

# Atau force delete jika belum fully merged
git branch -D feature/new-login
```

**Catatan:** Hapus branch lokal hanya jika:

- ✅ Sudah di-merge ke main
- ✅ Tidak diperlukan lagi untuk reference
- ✅ Sudah di-push ke remote (untuk backup)

### Langkah 5.4: Hapus Branch Remote (Pilihan)

Setelah merge dan yakin tidak diperlukan lagi:

```bash
# Hapus branch remote
git push origin --delete feature/new-login

# Atau jika menggunakan GitHub
# Hapus via web interface setelah PR merged
```

**Kapan menghapus remote branch:**

- ✅ Sudah di-merge dan di-deploy ke production
- ✅ Tidak ada yang masih bekerja di branch tersebut
- ✅ Tidak diperlukan untuk reference historis
- ✅ Sudah ada di main untuk recovery jika perlu

---

<!-- INTERACTIVE_DEMO:workflow-complete -->

```bash
# ============================================
# COMPLETE GIT WORKTREE WORKFLOW SCRIPT
# ============================================

# STEP 1: CREATE WORKTREE
cd /home/dev/web/koneksi/learning.konxc.space
git worktree add ../learning-feature-xyz -b feature/xyz
cd ../learning-feature-xyz

# STEP 2: WORK IN WORKTREE
# Edit files, make changes...
git add .
git commit -m "feat: implement feature xyz"
git commit -m "feat: add validation for xyz"
git commit -m "docs: update documentation"

# STEP 3: PUSH TO REMOTE
git push -u origin feature/xyz

# STEP 4: MERGE TO MAIN
cd /home/dev/web/koneksi/learning.konxc.space
git checkout main
git pull origin main
git merge feature/xyz
git push origin main

# STEP 5: CLEANUP
git worktree remove ../learning-feature-xyz
git branch -d feature/xyz
git push origin --delete feature/xyz

# VERIFY
git worktree list
# Should only show main repository
```

<!-- END_INTERACTIVE_DEMO -->

---

## Workflow Visualization

<!-- INTERACTIVE_DEMO:merge-workflow -->

```
┌─────────────────────────────────────────────────────┐
│ WORKTREE WORKFLOW VISUALIZATION                     │
└─────────────────────────────────────────────────────┘

[Main Repository]                  [Feature Worktree]
     main                              feature/xyz
       │                                    │
       │                                    │
       ├─ Create worktree ────────────────►│
       │                                    │
       │                                    ├─ Work & Commit
       │                                    ├─ Work & Commit
       │                                    ├─ Work & Commit
       │                                    │
       │                                    ├─ Push to Remote
       │                                    │
       ├─ Merge feature/xyz ────────────────┤
       │                                    │
       ├─ Push merged main                  │
       │                                    │
       ├─ Remove worktree ──────────────────┤
       │                                    │
       └─ Clean up branches ────────────────┘

Timeline:
1. Create:    0 min
2. Development: 2-4 hours
3. Push:      1 min
4. Merge:     5 min
5. Cleanup:   1 min
```

<!-- END_INTERACTIVE_DEMO -->

---

## Troubleshooting Common Issues

### Issue 1: "Cannot remove worktree, it contains modified or untracked files"

**Error:**

```
fatal: 'worktree' contains modified or untracked files
```

**Solution:**

Pilih salah satu:

**Opsi A: Commit perubahan**

```bash
cd ../learning-feature-xyz
git add .
git commit -m "WIP: save work before cleanup"
cd /home/dev/web/koneksi/learning.konxc.space
git worktree remove ../learning-feature-xyz
```

**Opsi B: Force remove (hati-hati, akan kehilangan uncommitted changes!)**

```bash
git worktree remove --force ../learning-feature-xyz
```

**Opsi C: Stash perubahan**

```bash
cd ../learning-feature-xyz
git stash
cd /home/dev/web/koneksi/learning.konxc.space
git worktree remove ../learning-feature-xyz
```

### Issue 2: "Branch is already checked out at..."

**Error:**

```
fatal: 'feature/xyz' is already checked out at '/path/to/worktree'
```

**Solution:**

Branch hanya bisa di-checkout di satu worktree pada satu waktu. Solusinya:

```bash
# Option 1: Hapus worktree yang menggunakan branch tersebut
git worktree remove /path/to/existing-worktree

# Option 2: Checkout ke branch lain di worktree tersebut
cd /path/to/existing-worktree
git checkout main

# Baru buat worktree baru
cd /home/dev/web/koneksi/learning.konxc.space
git worktree add ../new-worktree feature/xyz
```

### Issue 3: Merge Conflict saat Merge ke Main

**Gejala:** Conflict saat `git merge feature/xyz`

**Solution:**

1. **Lihat file yang conflict:**

```bash
git status
# Lists files with conflicts
```

2. **Edit file untuk resolve conflict:**

```bash
code src/components/LoginForm.svelte
# Edit untuk resolve conflicts
```

3. **Mark conflict sebagai resolved:**

```bash
git add src/components/LoginForm.svelte
```

4. **Complete merge:**

```bash
git commit -m "Merge feature/xyz into main, resolve conflicts"
```

### Issue 4: Worktree Folder Terhapus Manual

**Gejala:** Folder worktree terhapus tapi Git masih tracking

**Solution:**

```bash
# Clean up worktree references
git worktree prune

# Verifikasi
git worktree list
```

### Issue 5: Branch Remote Tidak Update

**Gejala:** Push gagal atau branch tidak muncul di remote

**Solution:**

```bash
# Check remote configuration
git remote -v

# Set upstream jika belum
cd ../learning-feature-xyz
git push -u origin feature/xyz

# Atau force push jika perlu (hati-hati!)
git push --force origin feature/xyz
```

---

## Best Practices

### 1. **Naming Convention yang Konsisten**

```bash
# ✅ GOOD: Nama jelas dan deskriptif
git worktree add ../learning-feature-login -b feature/login
git worktree add ../learning-hotfix-auth -b hotfix/auth-bug
git worktree add ../learning-review-pr123 -b review/pr123

# ❌ BAD: Nama tidak jelas
git worktree add ../temp1 -b temp
git worktree add ../x -b y
```

### 2. **Regular Cleanup**

Jangan biarkan worktree menumpuk. Buat jadwal cleanup:

```bash
# Weekly cleanup script
git worktree list

# Remove completed worktrees
git worktree remove ../learning-feature-completed

# Prune deleted worktrees
git worktree prune
```

### 3. **Commit dengan Pesan yang Jelas**

```bash
# ✅ GOOD: Descriptive commit messages
git commit -m "feat: add login form with email validation"
git commit -m "fix: resolve authentication token refresh issue"

# ❌ BAD: Vague commit messages
git commit -m "update"
git commit -m "fix bug"
```

### 4. **Push Sebelum Merge**

Selalu push worktree branch ke remote sebelum merge:

- Backup code Anda
- Enable code review via PR
- Recovery jika terjadi masalah

### 5. **Verify Merge sebelum Cleanup**

```bash
# Pastikan merge berhasil
git branch --merged main

# Pastikan semua test pass
pnpm test

# Pastikan build berhasil
pnpm build
```

### 6. **Use Pull Request untuk Team Work**

Untuk kolaborasi tim, gunakan Pull Request:

- Code review sebelum merge
- Diskusi dan feedback
- CI/CD testing otomatis
- Better history tracking

---

## Checklist Workflow Lengkap

Gunakan checklist ini setiap kali menggunakan worktree:

### ✅ Setup Phase

- [ ] Repository utama dalam kondisi clean atau committed
- [ ] Buat worktree dengan nama yang jelas
- [ ] Verifikasi worktree dibuat dengan benar
- [ ] Pindah ke worktree dan verifikasi branch

### ✅ Development Phase

- [ ] Bekerja di worktree tanpa mengganggu main
- [ ] Commit dengan pesan yang jelas dan meaningful
- [ ] Multiple commits untuk progress tracking
- [ ] Test perubahan sebelum push

### ✅ Push Phase

- [ ] Push branch ke remote untuk backup
- [ ] Verifikasi branch muncul di remote
- [ ] Tag commit jika perlu (untuk release)

### ✅ Merge Phase

- [ ] Kembali ke main repository
- [ ] Pull latest main dari remote
- [ ] Merge worktree branch ke main
- [ ] Resolve conflicts jika ada
- [ ] Test setelah merge
- [ ] Push merged main ke remote

### ✅ Cleanup Phase

- [ ] Verifikasi merge berhasil
- [ ] Hapus worktree yang sudah tidak diperlukan
- [ ] Hapus branch lokal jika sudah merged
- [ ] Hapus branch remote (opsional, setelah yakin)
- [ ] Verify cleanup dengan `git worktree list`

---

## Kesimpulan

Workflow lengkap Git worktree dari create hingga merge ke main meliputi:

1. **Create**: Buat worktree dengan branch baru atau existing
2. **Work**: Develop normal di worktree yang terisolasi
3. **Push**: Push branch ke remote untuk backup dan kolaborasi
4. **Merge**: Gabungkan perubahan ke main (direct merge atau via PR)
5. **Cleanup**: Hapus worktree dan branch yang tidak diperlukan

**Key Takeaways:**

- ✅ Worktree memungkinkan parallel work tanpa gangguan
- ✅ Push ke remote penting untuk backup dan kolaborasi
- ✅ Merge bisa dilakukan langsung atau via Pull Request
- ✅ Cleanup teratur menjaga repository tetap rapi
- ✅ Troubleshooting common issues membantu menghindari blok

**Next Steps:**

1. **Practice**: Coba workflow lengkap dengan project kecil
2. **Integrate**: Terapkan workflow ini di daily development
3. **Share**: Diskusikan dengan tim untuk standardisasi
4. **Optimize**: Sesuaikan dengan kebutuhan tim Anda

---

## Referensi Tambahan

- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Git Merge Strategies](https://git-scm.com/docs/git-merge)
- [Pull Request Best Practices](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/)
- Artikel Koneksi: [Git Worktree: Tingkatkan Produktivitas Development](./2025-01-29-git-worktree-tingkatkan-produktivitas-development.md)

---

**Ditulis oleh:** Tim Development Koneksi  
**Tags:** Git, Worktree, Workflow, Merge, Best Practices  
**Category:** Tutorial

_Mari tingkatkan produktivitas development dengan workflow Git worktree yang efisien dan terstruktur. Untuk diskusi lebih lanjut tentang Git workflows, hubungi tim di developers@konxc.space._

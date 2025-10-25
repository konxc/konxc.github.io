# Git Workflow Guide - Koneksi Project

## 🎯 Overview

This guide provides **best practices** for collaborative development, ensuring **clean commits**, **conflict-free merges**, and **consistent code quality** across the Koneksi project.

## 🚀 Available Scripts

### **Formatting Scripts**

```bash
# Format all files
pnpm run format

# Check formatting without changes
pnpm run format:check

# Format only Astro files
pnpm run format:astro

# Format only staged files
pnpm run format:staged
```

### **Workflow Scripts**

```bash
# Pre-commit checks (format + TypeScript)
pnpm run pre-commit

# Pre-push checks (sync + format + TypeScript)
pnpm run pre-push

# Pre-push with build verification
pnpm run pre-push:build

# Safe push with confirmation
pnpm run safe-push
```

## 📋 Recommended Workflows

### **1. 🔄 Daily Development Workflow**

#### **Starting Work**

```bash
# 1. Switch to main and pull latest
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Check code formatting
pnpm run format:check
```

#### **During Development**

```bash
# Auto-format on save in IDE (recommended)
# Or manually format specific files
pnpm run format:astro
```

#### **Before Each Commit**

```bash
# 1. Run pre-commit checks
pnpm run pre-commit

# 2. Commit with descriptive message
git commit -m "feat: add new feature description"
```

#### **Before Pushing**

```bash
# 1. Run pre-push checks (recommended)
pnpm run pre-push

# 2. Push to remote
git push origin feature/your-feature-name

# OR use safe-push for extra verification
pnpm run safe-push
```

### **2. 🛡️ Conflict Prevention Workflow**

#### **Before Starting Work**

```bash
# Always start with latest main
git checkout main
git pull origin main
git checkout -b feature/new-feature
```

#### **Regular Sync (Daily)**

```bash
# Fetch latest changes
git fetch origin

# Check if main has updates
git log --oneline main..origin/main

# If main has updates, rebase your branch
git checkout main
git pull origin main
git checkout feature/your-branch
git rebase main
```

#### **Before Creating PR**

```bash
# 1. Sync with latest main
git checkout main
git pull origin main
git checkout feature/your-branch
git rebase main

# 2. Run comprehensive checks
pnpm run pre-push:build

# 3. Push and create PR
git push origin feature/your-branch
```

### **3. 🚨 Emergency/Hotfix Workflow**

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix

# 2. Make minimal changes
# ... fix the issue ...

# 3. Quick verification
pnpm run pre-commit

# 4. Commit and push
git commit -m "fix: critical issue description"
pnpm run pre-push
git push origin hotfix/critical-fix

# 5. Create PR for immediate review
```

## 🔧 Script Details

### **Pre-Commit Script (`./scripts/pre-commit.sh`)**

**What it does:**

- ✅ Formats staged files with Prettier
- ✅ Runs TypeScript checks
- ✅ Checks for console.log statements (warning)
- ✅ Identifies TODO/FIXME comments
- ✅ Handles unstaged changes safely

**Usage:**

```bash
pnpm run pre-commit
```

### **Pre-Push Script (`./scripts/pre-push.sh`)**

**What it does:**

- ✅ Fetches latest remote changes
- ✅ Checks for conflicts with remote
- ✅ Auto-rebases if possible
- ✅ Verifies code formatting
- ✅ Runs TypeScript checks
- ✅ Detects large files (>10MB)
- ✅ Optional build verification

**Usage:**

```bash
# Basic pre-push checks
pnpm run pre-push

# With build verification (slower but safer)
pnpm run pre-push:build

# Interactive mode with confirmation
pnpm run safe-push
```

## 🎨 Code Quality Standards

### **Commit Message Format**

```bash
# Format: type(scope): description
feat: add dark mode toggle
fix: resolve TypeScript errors in Header component
style: update Tailwind class ordering
docs: add Git workflow guide
refactor: extract newsletter component
test: add unit tests for blog pagination
```

### **Branch Naming Convention**

```bash
feature/feature-name       # New features
fix/bug-description       # Bug fixes
hotfix/critical-issue     # Emergency fixes
refactor/component-name   # Code refactoring
docs/documentation-topic  # Documentation updates
```

### **File Organization**

```bash
src/
├── components/           # Reusable components
├── layouts/             # Page layouts
├── pages/               # Route pages
├── styles/              # Global styles
└── utils/               # Utility functions

docs/                    # Project documentation
scripts/                 # Development scripts
```

## 🤝 Collaboration Best Practices

### **1. Pull Request Guidelines**

#### **Before Creating PR**

```bash
# 1. Ensure branch is up-to-date
git checkout main && git pull origin main
git checkout your-branch && git rebase main

# 2. Run full checks
pnpm run pre-push:build

# 3. Test locally
pnpm run dev  # Verify everything works
```

#### **PR Description Template**

```markdown
## 🎯 What does this PR do?

Brief description of changes

## 🔧 Changes Made

- [ ] Feature A implemented
- [ ] Bug B fixed
- [ ] Component C refactored

## 🧪 Testing

- [ ] Local testing completed
- [ ] TypeScript checks pass
- [ ] Build successful

## 📸 Screenshots (if applicable)

[Add screenshots for UI changes]

## 📋 Checklist

- [ ] Code formatted with Prettier
- [ ] TypeScript errors resolved
- [ ] No console.log statements
- [ ] Documentation updated (if needed)
```

### **2. Code Review Process**

#### **For Reviewers**

```bash
# 1. Pull the PR branch
git fetch origin
git checkout pr-branch-name

# 2. Run checks locally
pnpm run pre-push:build

# 3. Test functionality
pnpm run dev
```

#### **For Authors**

```bash
# After receiving feedback
# 1. Make requested changes
# 2. Run pre-commit checks
pnpm run pre-commit

# 3. Push updates
git push origin your-branch
```

### **3. Merge Strategy**

#### **Recommended: Squash and Merge**

- ✅ Clean commit history
- ✅ Single commit per feature
- ✅ Easy to revert if needed

#### **When to use Rebase and Merge**

- ✅ Multiple logical commits
- ✅ Want to preserve commit history
- ✅ Complex features with clear stages

## 🚨 Troubleshooting

### **Common Issues & Solutions**

#### **1. Merge Conflicts**

```bash
# During rebase
git status                    # See conflicted files
# Fix conflicts in files
git add resolved-file.astro
git rebase --continue

# If rebase gets too complex
git rebase --abort
git merge main               # Use merge instead
```

#### **2. Formatting Issues**

```bash
# Fix all formatting
pnpm run format

# Check what needs formatting
pnpm run format:check

# Format specific file types
pnpm run format:astro
```

#### **3. TypeScript Errors**

```bash
# Check TypeScript issues
pnpm astro check

# Common fixes
# - Add explicit type annotations
# - Fix import paths
# - Update interface definitions
```

#### **4. Large File Warnings**

```bash
# Check file sizes
ls -lah $(git ls-files)

# Remove large files from git history
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch large-file.zip' \
  --prune-empty --tag-name-filter cat -- --all
```

#### **5. Script Permission Issues**

```bash
# Make scripts executable
chmod +x scripts/pre-commit.sh
chmod +x scripts/pre-push.sh
```

## 📊 Workflow Summary

### **Quick Reference**

| Command                 | Purpose           | When to Use         |
| ----------------------- | ----------------- | ------------------- |
| `pnpm run format`       | Format all files  | Before committing   |
| `pnpm run format:check` | Check formatting  | CI/CD, verification |
| `pnpm run pre-commit`   | Pre-commit checks | Before every commit |
| `pnpm run pre-push`     | Pre-push checks   | Before pushing      |
| `pnpm run safe-push`    | Interactive push  | Important changes   |

### **Daily Checklist**

#### **Morning Routine**

- [ ] `git checkout main && git pull origin main`
- [ ] `pnpm run format:check`
- [ ] Create feature branch

#### **Before Each Commit**

- [ ] `pnpm run pre-commit`
- [ ] Write descriptive commit message
- [ ] `git commit -m "type: description"`

#### **Before Pushing**

- [ ] `pnpm run pre-push`
- [ ] `git push origin branch-name`

#### **End of Day**

- [ ] Push all work to remote
- [ ] Update PR if exists
- [ ] Sync with main if needed

---

**Following this workflow ensures clean, conflict-free, and professional code collaboration! 🎉**

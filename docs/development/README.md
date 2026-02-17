# ⚙️ Development Documentation

## 📋 Overview

This section contains all development-related documentation including coding standards, setup guides, TypeScript configurations, and development workflows for the Koneksi project.

## 📁 Documentation Categories

### **📏 Coding Standards & Guidelines**

Established standards for consistent, maintainable code across the project.

| Document                                                               | Purpose                                                | Status    |
| ---------------------------------------------------------------------- | ------------------------------------------------------ | --------- |
| [CODING_STANDARDS_PRETTIER.md](./CODING_STANDARDS_PRETTIER.md)         | Prettier configuration and code formatting standards   | ✅ Active |
| [DEVELOPMENT_STANDARDS.md](./DEVELOPMENT_STANDARDS.md)                 | General development guidelines and best practices      | ✅ Active |
| [PATH_ALIASES_BEST_PRACTICES.md](./PATH_ALIASES_BEST_PRACTICES.md)     | Import path conventions and alias usage                | ✅ Active |
| [UNDERSCORE_STRATEGY_GUIDE.md](./UNDERSCORE_STRATEGY_GUIDE.md)         | Strategy for managing unused variables with underscore | ✅ Active |
| [CLEAN_DEVELOPMENT_ENVIRONMENT.md](./CLEAN_DEVELOPMENT_ENVIRONMENT.md) | Clean development environment standards and practices  | ✅ Active |

### **🔄 Workflow & Collaboration**

Git workflows and collaboration procedures for team development.

| Document                                         | Purpose                                       | Status    |
| ------------------------------------------------ | --------------------------------------------- | --------- |
| [GIT_WORKFLOW_GUIDE.md](./GIT_WORKFLOW_GUIDE.md) | Git collaboration best practices and workflow | ✅ Active |

### **🛠️ Technical Setup & Configuration**

Setup guides and configuration documentation for development environment.

| Document                                                     | Purpose                             | Status       |
| ------------------------------------------------------------ | ----------------------------------- | ------------ |
| [ASTRO_CONFIG_RESTORATION.md](./ASTRO_CONFIG_RESTORATION.md) | Astro framework configuration guide | 📋 Reference |
| [CSS_LINTER_GUIDE.md](./CSS_LINTER_GUIDE.md)                 | CSS linting setup and configuration | 📋 Reference |

### **🔧 Advanced Development Tools**

Advanced development tools, code quality systems, and testing frameworks.

| Document                                                                         | Purpose                                                    | Status    |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------- |
| [ADVANCED_DEVELOPMENT_TOOLS_SETUP.md](./ADVANCED_DEVELOPMENT_TOOLS_SETUP.md)     | Advanced development tools configuration                   | ✅ Active |
| [CODE_QUALITY_SYSTEM.md](./CODE_QUALITY_SYSTEM.md)                               | Comprehensive code quality system                          | ✅ Active |
| [ESLINT_VS_PRETTIER_GUIDE.md](./ESLINT_VS_PRETTIER_GUIDE.md)                     | ESLint and Prettier integration guide                      | ✅ Active |
| [TEAM_DEVELOPMENT_ENVIRONMENT_SETUP.md](./TEAM_DEVELOPMENT_ENVIRONMENT_SETUP.md) | Team development environment setup                         | ✅ Active |
| [TOOLCHAIN_ALIGNMENT_GUIDE.md](./TOOLCHAIN_ALIGNMENT_GUIDE.md)                   | Understanding TypeScript, ESLint, Prettier alignment       | ✅ Active |
| [LANGUAGE_COMPARISON.md](./LANGUAGE_COMPARISON.md)                               | Rust vs OCaml/ReScript vs JavaScript/TypeScript comparison | ✅ Active |

### **🔧 TypeScript & Error Resolution**

TypeScript configuration, troubleshooting, and error resolution guides.

| Document                                                                      | Purpose                                | Status       |
| ----------------------------------------------------------------------------- | -------------------------------------- | ------------ |
| [TYPESCRIPT_ERROR_FIX.md](./typescript/TYPESCRIPT_ERROR_FIX.md)               | TypeScript error troubleshooting guide | ✅ Active    |
| [TYPESCRIPT_CACHE_RESOLUTION.md](./typescript/TYPESCRIPT_CACHE_RESOLUTION.md) | TypeScript cache and resolution issues | 📋 Reference |

## 🚀 Quick Start Guide

### **For New Developers**

1. **Setup Environment**: Follow [DEVELOPMENT_STANDARDS.md](./DEVELOPMENT_STANDARDS.md)
2. **Code Formatting**: Configure [CODING_STANDARDS_PRETTIER.md](./CODING_STANDARDS_PRETTIER.md)
3. **Git Workflow**: Learn [GIT_WORKFLOW_GUIDE.md](./GIT_WORKFLOW_GUIDE.md)
4. **Import Paths**: Use [PATH_ALIASES_BEST_PRACTICES.md](./PATH_ALIASES_BEST_PRACTICES.md)
5. **Underscore Strategy**: Learn [UNDERSCORE_STRATEGY_GUIDE.md](./UNDERSCORE_STRATEGY_GUIDE.md)
6. **Clean Environment**: Follow [CLEAN_DEVELOPMENT_ENVIRONMENT.md](./CLEAN_DEVELOPMENT_ENVIRONMENT.md)

### **For Existing Developers**

1. **Daily Workflow**: Use Git workflow from [GIT_WORKFLOW_GUIDE.md](./GIT_WORKFLOW_GUIDE.md)
2. **Code Quality**: Follow [CODING_STANDARDS_PRETTIER.md](./CODING_STANDARDS_PRETTIER.md)
3. **TypeScript Issues**: Check [TYPESCRIPT_ERROR_FIX.md](./typescript/TYPESCRIPT_ERROR_FIX.md)

## 🎯 Development Standards Summary

### **Code Formatting (Prettier)**

```json
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    {
      "files": "*.astro",
      "options": { "parser": "astro" }
    }
  ]
}
```

### **Import Path Conventions**

```typescript
// ✅ Preferred - Use @components alias
import Header from "@components/ui/Header.astro";

// ❌ Avoid - Relative paths for components
import Header from "../../components/ui/Header.astro";
```

### **Underscore Strategy for Unused Variables**

```typescript
// ✅ Correct - Preserve with underscore
const {
  postSlug,
  variant = "default",
  postTitle: _postTitle = "", // Unused but preserved
  showReadingTime: _showReadingTime = true, // Unused but preserved
} = Astro.props;

// ❌ Incorrect - Causes ESLint errors
const {
  postSlug,
  variant = "default",
  postTitle = "", // Unused - ESLint error
  showReadingTime = true, // Unused - ESLint error
} = Astro.props;
```

### **Git Workflow**

```bash
# Daily workflow
git checkout main && git pull origin main
git checkout -b feature/new-feature
pnpm run pre-commit  # Before each commit
pnpm run pre-push    # Before pushing
```

## 🔧 Development Tools & Scripts

### **Available Scripts**

```bash
# Code formatting
pnpm run format              # Format all files
pnpm run format:check        # Check formatting
pnpm run format:astro        # Format Astro files only

# Git workflow
pnpm run pre-commit          # Pre-commit checks
pnpm run pre-push            # Pre-push checks
pnpm run safe-push           # Interactive safe push

# Development
pnpm run dev                 # Start development server
pnpm run build               # Build for production
pnpm run preview             # Preview production build
```

### **IDE Configuration**

```json
// VS Code settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 🧪 Quality Assurance

### **Code Quality Checklist**

- [ ] **Formatting**: Code formatted with Prettier
- [ ] **TypeScript**: No TypeScript errors
- [ ] **Linting**: All linting rules pass
- [ ] **Imports**: Consistent path aliases used
- [ ] **Git**: Proper commit messages and workflow

### **Pre-Commit Requirements**

- [ ] Run `pnpm run pre-commit`
- [ ] All TypeScript errors resolved
- [ ] Code properly formatted
- [ ] No console.log statements (warnings only)
- [ ] Descriptive commit message

### **Pre-Push Requirements**

- [ ] Run `pnpm run pre-push`
- [ ] Synced with remote branch
- [ ] All tests passing
- [ ] Build successful (if using --with-build)
- [ ] No merge conflicts

## 🐛 Common Issues & Solutions

### **TypeScript Errors**

```bash
# Check TypeScript issues
pnpm astro check

# Common fixes
- Add explicit type annotations
- Fix import paths
- Update interface definitions
```

### **Formatting Issues**

```bash
# Fix all formatting
pnpm run format

# Check what needs formatting
pnpm run format:check
```

### **Git Conflicts**

```bash
# During rebase
git status                    # See conflicted files
# Fix conflicts in files
git add resolved-file.astro
git rebase --continue
```

## 📊 Development Metrics

### **Code Quality KPIs**

- **TypeScript Errors**: 0 errors in production code
- **Formatting Consistency**: 100% Prettier compliance
- **Import Standards**: 95%+ using path aliases
- **Git Workflow**: 100% following established workflow

### **Performance Standards**

- **Build Time**: < 30 seconds for full build
- **Development Server**: < 5 seconds startup
- **Hot Reload**: < 1 second for changes
- **Bundle Size**: Optimized for production

## 🔍 Related Documentation

### **Project Management**

- [Project Roadmap](../project-management/PROJECT_ROADMAP.md) - Development timeline
- [Daily Schedule](../project-management/DAILY_SCHEDULE_TEMPLATE.md) - Daily workflow

### **Technical Guides**

- [Deployment Manual](../technical-guides/DEPLOY_MANUAL.md) - Deployment procedures
- [Troubleshooting Guide](../technical-guides/TROUBLESHOOTING_GUIDE.md) - Issue resolution

### **Design System**

- [Design Tokens](../design-system/DESIGN_TOKENS_SYSTEM.md) - Design system integration
- [Component Guidelines](../design-system/README.md) - UI component standards

### **Testing & QA**

- [Testing Suite](../testing-qa/BLOG_TESTING_SUITE.md) - Testing procedures
- [Bug Reports](../testing-qa/BUG_FIXES_REPORT.md) - Issue tracking

---

**⚙️ This development documentation ensures consistent, high-quality code development with clear standards and efficient workflows!**

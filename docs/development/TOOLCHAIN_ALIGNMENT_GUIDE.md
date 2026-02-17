# Toolchain Alignment Guide

## 📋 **Overview**

Panduan komprehensif untuk memahami keselarasan ESLint, Prettier, dan TypeScript dalam proyek Koneksi, serta bagaimana error ditampilkan di VS Code.

---

## 🎯 **Toolchain Architecture**

### **1. Three-Tier Quality System**

```
┌───────────────────────────────────────────────────────────┐
│                    VS Code Problems Tab                   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ TypeScript   │  │   ESLint     │  │   Prettier   │     │
│  │  (ts)        │  │  (eslint)    │  │ (prettier)   │     │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤     │
│  │ Type Safety  │  │ Code Quality │  │ Formatting   │     │
│  │ Null Safety  │  │ Best Practice│  │ Consistency  │     │
│  │ Type Checking│  │ Bug Prevent  │  │ Style Rules  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 🔍 **Error Source Analysis**

### **1. TypeScript Errors (ts)**

#### **Error Types:**

- **18047**: Possibility of 'null'
- **2304**: Cannot find name (undefined variable)
- **2322**: Type mismatch
- **2339**: Property does not exist on type

#### **Example:**

```typescript
// Error: 'likeButton' is possibly 'null'
const likeButton = document.querySelector('.like-button');
likeButton.addEventListener('click', ...);  // ❌ TypeScript error

// ✅ Fixed with null check
if (likeButton) {
  likeButton.addEventListener('click', ...);
}
```

#### **Configuration:**

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict", // ✅ Strict type checking
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### **2. ESLint Errors (eslint)**

#### **Error Types:**

- **no-unused-vars**: Undefined variable usage
- **@typescript-eslint/no-explicit-any**: Using 'any' type
- **import/order**: Incorrect import ordering

#### **Example:**

```typescript
// Error: Variable is defined but never used
const unusedVar = "value"; // ❌ ESLint error

// ✅ Fixed with underscore
const _unusedVar = "value"; // ✅ Ignored by ESLint
```

#### **Configuration:**

```javascript
// eslint.config.js
rules: {
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_"
    }
  ],
}
```

### **3. Prettier Errors (prettier)**

#### **Error Types:**

- **Insert ','**: Missing comma
- **Unexpected token**: Syntax error
- **Spacing issues**: Incorrect formatting

#### **Example:**

```typescript
// Error: Insert ','
const obj = { name: "John" age: 30 }  // ❌ Prettier error

// ✅ Fixed
const obj = { name: "John", age: 30 }  // ✅ Formatted
```

#### **Configuration:**

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

---

## 🎯 **Alignment Strategy**

### **1. TypeScript First (Strict Type Safety)**

```typescript
// ✅ Correct: Add type guards
const likeButton = document.querySelector(".like-button");
if (likeButton) {
  likeButton.addEventListener("click", handler);
}

// ✅ Correct: Add type assertions
const element = button as HTMLButtonElement;
element.dataset.value = "123";

// ✅ Correct: Add proper scoping
const postSlug = props.postSlug;
console.log(postSlug);
```

### **2. ESLint Integration (Code Quality)**

```typescript
// ✅ Correct: Use underscore for unused variables
const _postTitle = props.postTitle;
const _showReadingTime = props.showReadingTime;

// ✅ Correct: Import organization
import React from "react";
import Component from "./Component";
import { util } from "@utils/util";
```

### **3. Prettier Formatting (Consistency)**

```typescript
// ✅ Correct: Prettier formatted
const obj = {
  name: "John",
  age: 30,
};

// ✅ Correct: Proper comma placement
function fn(a: string, b: number) {
  return a + b;
}
```

---

## 🔧 **Configuration Alignment**

### **1. ESLint + TypeScript Integration**

```javascript
// eslint.config.js
export default [
  // TypeScript support
  ...tseslint.configs.recommended.map((config) => ({
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // ✅ References TypeScript config
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  })),
];
```

### **2. Prettier + ESLint Integration**

```javascript
// eslint.config.js
export default [
  // Prettier integration
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": ["warn"], // ✅ ESLint runs Prettier
    },
  },

  // Prettier config (disable conflicting rules)
  prettier, // ✅ Disables ESLint rules that conflict with Prettier
];
```

### **3. TypeScript + Prettier Alignment**

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,  // ✅ TypeScript strict checking
  }
}

// .prettierrc
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

---

## 📊 **Error Categories**

### **TypeScript Errors (ts)**

| Error Code | Description            | Source     |
| ---------- | ---------------------- | ---------- |
| **18047**  | Possibly 'null'        | TypeScript |
| **2304**   | Cannot find name       | TypeScript |
| **2322**   | Type mismatch          | TypeScript |
| **2339**   | Property doesn't exist | TypeScript |

### **ESLint Errors (eslint)**

| Rule                                   | Description     | Source |
| -------------------------------------- | --------------- | ------ |
| **no-unused-vars**                     | Unused variable | ESLint |
| **@typescript-eslint/no-explicit-any** | Any type usage  | ESLint |
| **import/order**                       | Import ordering | ESLint |
| **astro/no-unused-css-selector**       | Unused CSS      | ESLint |

### **Prettier Warnings (prettier)**

| Warning              | Description   | Source   |
| -------------------- | ------------- | -------- |
| **Insert ','**       | Missing comma | Prettier |
| **Unexpected token** | Syntax error  | Prettier |
| **Parsing error**    | Parse issue   | Prettier |

---

## 🎯 **Verification Process**

### **1. Check ESLint Alignment**

```bash
# Run ESLint to see what it catches
pnpm run lint

# Fix ESLint errors
pnpm run lint:fix
```

### **2. Check Prettier Alignment**

```bash
# Check formatting
pnpm run format:check

# Fix formatting
pnpm run format
```

### **3. Check TypeScript Alignment**

```bash
# Type check
pnpm run astro check

# Full quality check
pnpm run check:all
```

### **4. Check VS Code Integration**

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.enable": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 🚀 **Best Practices**

### **1. Error Resolution Priority**

```
1. TypeScript Errors → Fix type safety issues first
2. ESLint Errors → Fix code quality issues second
3. Prettier Warnings → Fix formatting last
```

### **2. Configuration Order**

```
TypeScript (tsconfig.json)
    ↓
ESLint (eslint.config.js)
    ↓
Prettier (.prettierrc)
```

### **3. Tool Integration**

```
VS Code
    ↓
TypeScript Language Server
    ↓
ESLint Server
    ↓
Prettier Server
```

---

## 📚 **Related Documentation**

- [Code Quality System](./CODE_QUALITY_SYSTEM.md)
- [ESLint vs Prettier Guide](./ESLINT_VS_PRETTIER_GUIDE.md)
- [Underscore Strategy](./UNDERSCORE_STRATEGY_GUIDE.md)
- [Clean Development Environment](./CLEAN_DEVELOPMENT_ENVIRONMENT.md)

---

**This guide ensures proper alignment between TypeScript, ESLint, and Prettier for a clean, type-safe, and well-formatted codebase.**

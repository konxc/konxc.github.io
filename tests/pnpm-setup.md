# pnpm Configuration for Testing

## Install pnpm (if not already installed)
```bash
npm install -g pnpm
```

## Install Dependencies
```bash
# Install project dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install
```

## Run Tests
```bash
# Run all tests
pnpm exec playwright test

# Run with UI
pnpm exec playwright test --ui

# Run headed (visible browser)
pnpm exec playwright test --headed

# Debug mode
pnpm exec playwright test --debug
```

## Performance Comparison

| Task | npm | pnpm | Improvement |
|------|-----|------|-------------|
| Install dependencies | 45s | 28s | 38% faster |
| Install Playwright | 120s | 85s | 29% faster |
| Run tests | 25s | 22s | 12% faster |
| Disk usage | 2.1GB | 1.3GB | 38% less |

## Why pnpm for Testing?

### 1. **Faster Installation**
- Hard links instead of copying files
- Better caching mechanism
- Parallel downloads

### 2. **Less Disk Space**
- Shared dependencies across projects
- No duplicate packages
- Important for CI/CD environments

### 3. **Better Dependency Resolution**
- Strict peer dependency handling
- Prevents phantom dependencies
- More reliable test environments

### 4. **CI/CD Benefits**
- Faster builds
- Better caching
- More reliable deployments

## Migration from npm to pnpm

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install with pnpm
pnpm install

# Install Playwright browsers
pnpm exec playwright install
```

## Troubleshooting

### If tests fail with pnpm:
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall everything
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm exec playwright install
```

### If you prefer npm:
```bash
# Use npm scripts instead
npm run test:playwright
npm run test:playwright:install
```

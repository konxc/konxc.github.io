// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

// Custom types declarations for KonXC project
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace App {
  interface Locals {
    // Add any custom locals types here
    [key: string]: unknown;
  }
}

// Extend global types if needed
declare global {
  // Google Analytics gtag (loaded via external script)
  function gtag(...args: unknown[]): void;
  interface Window {
    gtag?: (...args: unknown[]) => void;
    // Fuse.js may be loaded via CDN in some pages/components
    Fuse?: unknown;
    toggleDarkMode?: () => void;
    initializeDarkMode?: () => void;
  }

  // Fuse.js global constructor (when loaded via CDN)
  const Fuse: unknown;
}

export {};

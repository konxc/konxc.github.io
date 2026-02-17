// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

// Custom types declarations for KonXC project
declare namespace App {
  interface Locals {
    // Add any custom locals types here
    [key: string]: unknown;
  }
}

// Extend global types if needed
declare global {
  // Google Analytics gtag (loaded via external script)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void;
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // Fuse.js may be loaded via CDN in some pages/components
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Fuse?: any;
  }

  // Fuse.js global constructor (when loaded via CDN)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Fuse: any;
}

export {};

/// <reference types="astro/client" />

declare global {
  namespace App {
    interface Locals {
      session:
        | {
            session: import("better-auth").Session;
            user: import("better-auth").User;
          }
        | undefined
        | null;
      user: import("better-auth").User | undefined | null;
      [key: string]: unknown;
    }
  }

  function gtag(...args: unknown[]): void;

  interface Window {
    gtag?: (...args: unknown[]) => void;
    Fuse?: unknown;
    closeSearchModal?: () => void;
    toggleDarkMode?: () => void;
    initializeDarkMode?: () => void;
  }
}

export {};

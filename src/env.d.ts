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
      [key: string]: any;
    }
  }

  function gtag(...args: any[]): void;

  interface Window {
    gtag?: (...args: any[]) => void;
    Fuse?: any;
    closeSearchModal?: () => void;
    toggleDarkMode?: () => void;
    initializeDarkMode?: () => void;
  }
}

export {};

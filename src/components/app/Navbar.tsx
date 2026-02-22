import { component$ } from "@builder.io/qwik";

import { authClient } from "../../lib/auth-client";

export const Navbar = component$(() => {
  const navItems = [
    {
      label: "Beranda",
      href: "/app/feed",
      icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    },
    {
      label: "Jaringan",
      href: "/app/network",
      icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2",
    },
    {
      label: "E-Commerce",
      href: "/app/showcase",
      icon: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z",
    },
    {
      label: "Literasi",
      href: "/app/literacy",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
  ];

  return (
    <header class="sticky top-0 z-50 w-full border-b border-[var(--app-border)] bg-[var(--app-card)]/80 backdrop-blur-md transition-colors duration-300">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-8">
          <a
            href="/app/feed"
            class="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent select-none"
            style="font-size: var(--text-display); font-weight: 900; letter-spacing: var(--tracking-display);"
          >
            KonXC
          </a>

          <div class="hidden items-center border-l border-[var(--app-border)] pl-8 md:flex">
            <div class="group relative">
              <span class="group-focus-within:text-app-500 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari UMKM, Literasi..."
                class="app-input h-9 w-64 pr-4 pl-10"
                style="font-size: var(--text-label); font-weight: 500;"
              />
            </div>
          </div>
        </div>

        <nav class="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              class={`flex h-16 flex-col items-center justify-center border-b-2 px-5 transition-all ${
                item.label === "Beranda"
                  ? "border-app-600 text-app-700 dark:text-app-400"
                  : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-900/50 dark:hover:text-slate-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d={item.icon} />
              </svg>
              <span
                class="app-action-label mt-1 hidden sm:block"
                style="letter-spacing: var(--tracking-label);"
              >
                {item.label}
              </span>
            </a>
          ))}

          <div class="ml-4 flex items-center gap-2 border-l border-[var(--app-border)] pl-4">
            {/* Theme Toggle */}
            <button
              onClick$={() => {
                const isDark =
                  document.documentElement.classList.contains("dark");
                const newTheme = isDark ? "light" : "dark";
                const ld = document.getElementById(
                  "hljs-light",
                ) as HTMLLinkElement | null;
                const dd = document.getElementById(
                  "hljs-dark",
                ) as HTMLLinkElement | null;
                if (newTheme === "dark") {
                  document.documentElement.classList.add("dark");
                  if (ld) ld.media = "not all";
                  if (dd) dd.media = "all";
                } else {
                  document.documentElement.classList.remove("dark");
                  if (ld) ld.media = "all";
                  if (dd) dd.media = "not all";
                }
                localStorage.setItem("app-theme", newTheme);
              }}
              class="hover:text-app-600 p-2 transition-colors"
              style="color: var(--app-text-muted);"
              title="Ganti Tema"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="hidden dark:block"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="block dark:hidden"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </button>

            {/* Notifications */}
            <button
              class="hover:text-app-600 relative p-2 transition-colors"
              style="color: var(--app-text-muted);"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span class="absolute top-1.5 right-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[7px] font-bold text-white dark:border-gray-950">
                2
              </span>
            </button>

            <button
              onClick$={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      window.location.href = "/login";
                    },
                  },
                });
              }}
              class="ml-1 h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5"
            >
              <div
                class="h-full w-full overflow-hidden rounded-full border-2 border-white"
                style="background-color: var(--app-surface);"
              >
                <svg
                  class="h-full w-full text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
});

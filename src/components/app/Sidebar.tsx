import { component$, $ } from "@builder.io/qwik";

import { authClient } from "../../lib/auth-client";

export const Sidebar = component$(() => {
  return (
    <aside
      class="fixed top-0 left-0 z-50 hidden h-full w-64 flex-col border-r md:flex"
      style="border-color: var(--app-border); background-color: var(--app-card);"
    >
      <div class="flex items-center p-7 pb-6">
        <a
          href="/app"
          class="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-black tracking-tight text-transparent select-none"
        >
          KonXC
        </a>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        <a
          href="/app"
          class="flex items-center gap-3 rounded-xl bg-blue-50/50 px-4 py-2.5 text-blue-600 transition-colors dark:bg-blue-900/20"
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span class="text-sm font-bold">Beranda</span>
        </a>

        <a
          href="/app/network"
          class="hover:text-app-600 flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors"
          style="color: var(--app-text-muted);"
          onMouseOver$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--app-hover)")
          }
          onMouseOut$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "")
          }
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span class="text-sm font-medium">Jaringan</span>
        </a>

        <a
          href="/app/literacy"
          class="hover:text-app-600 flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors"
          style="color: var(--app-text-muted);"
          onMouseOver$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--app-hover)")
          }
          onMouseOut$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "")
          }
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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span class="text-sm font-medium">Literasi Digital</span>
        </a>

        <a
          href="/app/groups"
          class="hover:text-app-600 flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors"
          style="color: var(--app-text-muted);"
          onMouseOver$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--app-hover)")
          }
          onMouseOut$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "")
          }
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
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15 18.1H3" />
          </svg>
          <span class="text-sm font-medium">Grup Diskusi</span>
        </a>

        <a
          href="/app/cloud"
          class="hover:text-app-600 flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors"
          style="color: var(--app-text-muted);"
          onMouseOver$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--app-hover)")
          }
          onMouseOut$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "")
          }
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
            <path d="M17.5 19c.6 0 1.1-.4 1.3-.9 1.2-2.8.5-6.2-1.8-8.2-.3-.3-.7-.5-1.1-.6C14.5 5.2 10 5 10 5s-4 .2-5.9 4.3c-.4.1-.8.3-1.1.6-2.3 2-3 5.3-1.8 8.2.2.5.7.9 1.3.9h15Z" />
          </svg>
          <span class="text-sm font-medium">Koneksi Cloud</span>
        </a>

        <div
          class="mx-4 my-3 border-t"
          style="border-color: var(--app-border);"
        ></div>

        <div
          class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase"
          style="color: var(--app-text-dim);"
        >
          E-Commerce
        </div>

        <a
          href="/app/showcase"
          class="hover:text-app-600 flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors"
          style="color: var(--app-text-muted);"
          onMouseOver$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--app-hover)")
          }
          onMouseOut$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "")
          }
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
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span class="text-sm font-medium">Etalase UMKM</span>
        </a>

        <div
          class="mx-4 my-3 border-t"
          style="border-color: var(--app-border);"
        ></div>

        <div
          class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase"
          style="color: var(--app-text-dim);"
        >
          Akun
        </div>

        <a
          href="/app/in/me"
          class="hover:text-app-600 flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors"
          style="color: var(--app-text-muted);"
          onMouseOver$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--app-hover)")
          }
          onMouseOut$={(e: MouseEvent) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "")
          }
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span class="text-sm font-medium">Profil & Bisnis Saya</span>
        </a>
      </nav>

      <div class="border-t p-4" style="border-color: var(--app-border);">
        <button
          onClick$={$(async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  window.location.href = "/login";
                },
              },
            });
          })}
          class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
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
            class="lucide lucide-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span class="font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
});

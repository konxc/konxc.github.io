import { component$, useStore, $ } from "@builder.io/qwik";

import { PostContent } from "./PostContent";

interface Post {
  id: string;
  author: string;
  handle: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
}

const DEMO_POSTS: Post[] = [
  {
    id: "1",
    author: "Warung Kopi Senja",
    handle: "Bisnis Owner & Penggiat Literasi",
    time: "2 jam lalu",
    likes: 12,
    comments: 3,
    shares: 4,
    content: `Baru saja mulai mengadopsi sistem **POS berbasis SaaS** untuk kelola stok. Jauh lebih praktis daripada manual!

Kami kalkulasi penghematan waktu operasional menggunakan rumus sederhana:

$$T_{saved} = \\frac{N_{items} \\times t_{manual}}{t_{pos}} - 1$$

Di mana $N_{items}$ adalah jumlah SKU, $t_{manual}$ waktu input manual, dan $t_{pos}$ waktu pakai POS.

> "Digitalisasi bukan pilihan — ini keharusan bagi UMKM yang ingin bertahan di era ini."

Ada rekomendasi plugin untuk tracking **loyalty member**? ☕ #DigitalTransformasi #UMKM #SaaS`,
  },
  {
    id: "2",
    author: "Tech Enthusiast @ Koneksi",
    handle: "Praktisi Web3 & Educator",
    time: "4 jam lalu",
    likes: 28,
    comments: 7,
    shares: 11,
    content: `Workshop hari ini: Bagaimana UMKM masuk ke ekosistem **Web3** via smart contract sederhana. 🚀

Contoh kontrak loyalitas di Solidity:

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoyaltyPoints {
    mapping(address => uint256) public points;
    address public owner;

    constructor() { owner = msg.sender; }

    function reward(address customer, uint256 pts) external {
        require(msg.sender == owner, "Unauthorized");
        points[customer] += pts;
    }
}
\`\`\`

Alur onboarding member baru:

\`\`\`mermaid
flowchart LR
    A[Customer Beli] --> B{Punya Wallet}
    B -->|Ya| C[Tambah Poin]
    B -->|Tidak| D[Buat Wallet]
    D --> C
    C --> E[Redeem Reward]
\`\`\`

#Web3 #Blockchain #KoneksiCloud #UMKM`,
  },
  {
    id: "3",
    author: "Investasi Maju",
    handle: "Analis Investasi Digital",
    time: "6 jam lalu",
    likes: 15,
    comments: 5,
    shares: 2,
    content: `Pentingnya **diversifikasi aset** bagi pemilik usaha. Mari bandingkan instrumen:

| Aset | Risiko | Return | Likuiditas |
|------|--------|--------|-----------|
| Deposito | Rendah | 4–5% | Rendah |
| Reksa Dana | Sedang | 8–12% | Sedang |
| Saham | Tinggi | 15–20% | Tinggi |
| Kripto | Sangat Tinggi | >20% | Sangat Tinggi |

Formula **Sharpe Ratio** untuk evaluasi portofolio:

$$S = \\frac{R_p - R_f}{\\sigma_p}$$

Di mana $R_p$ = return portofolio, $R_f$ = risk-free rate, $\\sigma_p$ = standar deviasi.

Proporsi ideal untuk UMKM pemula:

\`\`\`mermaid
pie showData title Alokasi Aset UMKM
    "Deposito" : 40
    "Reksa Dana" : 35
    "Saham" : 20
    "Kripto" : 5
\`\`\`

📈 #Investasi #FinancialFreedom #LiterasiKeuangan`,
  },
];

export const Feed = component$(() => {
  const store = useStore<{ posts: Post[] }>({ posts: DEMO_POSTS });

  const handleLike = $((id: string) => {
    const post = store.posts.find((p) => p.id === id);
    if (post) post.likes++;
  });

  return (
    <div class="space-y-5">
      {/* Create Post Input */}
      <div class="app-card shadow-sm">
        <div class="flex gap-3 p-4">
          <div
            class="h-10 w-10 flex-shrink-0 rounded-full shadow-inner"
            style="background-color: var(--app-surface);"
          ></div>
          <button
            class="app-input flex-1 px-4 py-2.5 text-left"
            style="font-size: var(--text-label); font-weight: 500;"
          >
            Bagikan insight, rumus, kode, atau diagram bisnis Anda…
          </button>
        </div>
        <div
          class="flex items-center justify-between border-t px-4 pt-2.5 pb-3"
          style="border-color: var(--app-border);"
        >
          <div class="hide-scrollbar flex min-w-0 gap-0.5 overflow-x-auto">
            <button
              class="hover:text-app-600 app-action-label flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all"
              style="color: var(--app-text-muted);"
              onMouseOver$={(e: MouseEvent) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--app-hover)")
              }
              onMouseOut$={(e: MouseEvent) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "")
              }
            >
              <span class="text-base">🖼️</span>
              Media
            </button>
            <button
              class="hover:text-app-600 app-action-label flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all"
              style="color: var(--app-text-muted);"
              onMouseOver$={(e: MouseEvent) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--app-hover)")
              }
              onMouseOut$={(e: MouseEvent) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "")
              }
            >
              <span class="text-base">💡</span>
              Literasi
            </button>
            <button
              class="hover:text-app-600 app-action-label flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all"
              style="color: var(--app-text-muted);"
              onMouseOver$={(e: MouseEvent) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--app-hover)")
              }
              onMouseOut$={(e: MouseEvent) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "")
              }
            >
              <span class="text-base">📈</span> Peluang
            </button>
            <button
              class="hover:text-app-600 app-action-label flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all"
              style="color: var(--app-text-muted);"
              onMouseOver$={(e: MouseEvent) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--app-hover)")
              }
              onMouseOut$={(e: MouseEvent) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "")
              }
            >
              <span class="text-base">📐</span> Rumus
            </button>
          </div>
          <button class="bg-app-600 shadow-app-200/50 hover:bg-app-700 app-action-label rounded-full px-5 py-2 text-white shadow-md transition-all active:scale-95 dark:shadow-none">
            Posting
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div class="space-y-4">
        {store.posts.map((post) => (
          <div
            key={post.id}
            class="app-card app-card-hover overflow-hidden shadow-xs transition-all"
          >
            {/* Post Header */}
            <div class="flex items-start justify-between px-5 pt-5 pb-3">
              <div class="flex items-center gap-3.5">
                <div class="h-11 w-11 flex-shrink-0 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-indigo-500 shadow-sm dark:border-slate-800"></div>
                <div>
                  <div class="mb-0.5 flex items-center gap-2">
                    <h3
                      class="app-title hover:text-app-600 cursor-pointer transition-colors"
                      style="color: var(--app-text);"
                    >
                      {post.author}
                    </h3>
                    <span
                      class="app-badge-text rounded-md px-1.5 py-0.5"
                      style="background-color: var(--app-surface); color: var(--app-text-muted); border: 1px solid var(--app-border);"
                    >
                      Lvl 2
                    </span>
                  </div>
                  <p class="app-meta">
                    {post.handle} · {post.time}
                  </p>
                </div>
              </div>
              <button
                class="hover:text-app-600 rounded-lg p-1 transition-colors"
                style="color: var(--app-text-dim);"
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>

            {/* Post Content – Rich Renderer */}
            <div class="px-5 pb-4">
              <PostContent content={post.content} id={post.id} />
            </div>

            {/* Post Stats */}
            <div
              class="flex items-center justify-between border-t border-b px-5 py-2"
              style="border-color: var(--app-border);"
            >
              <div class="app-meta flex items-center gap-2">
                <span class="flex -space-x-1">
                  <span class="flex h-4 w-4 items-center justify-center rounded-full border border-white bg-blue-500 text-[8px] text-white shadow-xs dark:border-slate-900">
                    👍
                  </span>
                  <span class="flex h-4 w-4 items-center justify-center rounded-full border border-white bg-amber-500 text-[8px] text-white shadow-xs dark:border-slate-900">
                    💡
                  </span>
                </span>
                <span>{post.likes} terinspirasi</span>
              </div>
              <div class="app-meta flex gap-3">
                <span>{post.comments} komentar</span>
                <span>{post.shares} bagikan</span>
              </div>
            </div>

            {/* Interaction Bar */}
            <div class="grid grid-cols-3 divide-x divide-[var(--app-border)] border-t border-[var(--app-border)]">
              <button
                onClick$={() => handleLike(post.id)}
                class="hover:text-app-600 app-action-label flex items-center justify-center gap-2 py-3.5 transition-all"
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
                Suka
              </button>
              <button
                class="hover:text-app-600 app-action-label flex items-center justify-center gap-2 py-3.5 transition-all"
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Komentar
              </button>
              <button
                class="hover:text-app-600 app-action-label flex items-center justify-center gap-2 py-3.5 transition-all"
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" x2="12" y1="2" y2="15" />
                </svg>
                Bagikan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

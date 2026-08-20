import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";

import { PostContent } from "./PostContent";

interface FeedPost {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  createdAt: string;
}

function formatRelativeTime(timestamp: string) {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = then - now;
  const diffMin = Math.round(diffMs / (1000 * 60));

  const rtf = new Intl.RelativeTimeFormat("id-ID", { numeric: "auto" });
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");

  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, "hour");

  const diffDay = Math.round(diffHour / 24);
  return rtf.format(diffDay, "day");
}

export const Feed = component$(() => {
  const store = useStore({
    posts: [] as FeedPost[],
    loading: true,
    error: "",
    newPost: "",
    submitting: false,
  });

  const loadPosts = $(async () => {
    store.loading = true;
    store.error = "";
    try {
      const response = await fetch("/api/app/posts", {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error("Gagal mengambil data feed.");
      }
      const data = (await response.json()) as FeedPost[];
      store.posts = data;
    } catch (error) {
      console.error(error);
      store.error = "Feed belum bisa dimuat. Silakan refresh halaman.";
    } finally {
      store.loading = false;
    }
  });

  const createPost = $(async () => {
    const content = store.newPost.trim();
    if (content.length < 3 || store.submitting) return;

    store.submitting = true;
    store.error = "";

    try {
      const response = await fetch("/api/app/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "Gagal membuat posting.",
        );
      }

      store.posts = [result as FeedPost, ...store.posts];
      store.newPost = "";
    } catch (error) {
      store.error =
        error instanceof Error
          ? error.message
          : "Gagal membuat posting. Coba lagi.";
    } finally {
      store.submitting = false;
    }
  });

  const toggleLike = $(async (id: string) => {
    const target = store.posts.find((post) => post.id === id);
    if (!target) return;

    const prevLiked = target.liked;
    const prevLikes = target.likes;

    // Optimistic Update
    target.liked = !prevLiked;
    target.likes = prevLiked ? Math.max(0, prevLikes - 1) : prevLikes + 1;

    try {
      const response = await fetch("/api/app/posts/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error("Gagal memproses like.");

      // Sync with server results
      target.likes = Number(result.likes ?? target.likes);
      target.liked = Boolean(result.liked);
    } catch (error) {
      console.error(error);
      // Rollback on error
      target.liked = prevLiked;
      target.likes = prevLikes;
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    await loadPosts();
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
          <textarea
            class="app-input min-h-[96px] flex-1 resize-none px-4 py-3"
            style="font-size: var(--text-label); font-weight: 500;"
            placeholder="Bagikan insight, rumus, kode, atau diagram bisnis Anda..."
            value={store.newPost}
            onInput$={(_, el) => (store.newPost = el.value)}
          />
        </div>
        <div
          class="flex items-center justify-between border-t px-4 pt-2.5 pb-3"
          style="border-color: var(--app-border);"
        >
          <div class="hide-scrollbar flex min-w-0 gap-0.5 overflow-x-auto">
            <div class="app-meta px-2">
              {store.newPost.trim().length}/5000 karakter
            </div>
          </div>
          <button
            class="app-action-label rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40 active:translate-y-0 active:scale-95 disabled:opacity-50"
            disabled={store.submitting || store.newPost.trim().length < 3}
            onClick$={createPost}
          >
            {store.submitting ? "Menyimpan..." : "Posting"}
          </button>
        </div>
      </div>

      {store.error && (
        <div class="app-card border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-300">
          {store.error}
        </div>
      )}

      {store.loading && (
        <div class="app-card p-6 text-sm" style="color: var(--app-text-muted);">
          Memuat komunitas...
        </div>
      )}

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
                  </div>
                  <p class="app-meta">
                    {post.handle} · {formatRelativeTime(post.createdAt)}
                  </p>
                </div>
              </div>
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
                onClick$={() => toggleLike(post.id)}
                class={`hover:text-app-600 group flex items-center justify-center gap-2 py-3.5 transition-all active:scale-95 ${post.liked ? "text-blue-600" : ""}`}
                style="color: var(--app-text-muted);"
                onMouseOver$={(e: MouseEvent) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--app-hover)")
                }
                onMouseOut$={(e: MouseEvent) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "")
                }
              >
                <div
                  class={`flex items-center justify-center rounded-lg p-1.5 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 ${post.liked ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={post.liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </div>
                <span class="app-action-label">
                  {post.liked ? "Terinspirasi" : "Inspirasi"}
                </span>
              </button>
              <button
                class="hover:text-app-600 group flex items-center justify-center gap-2 py-3.5 transition-all active:scale-95"
                style="color: var(--app-text-muted);"
                onMouseOver$={(e: MouseEvent) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--app-hover)")
                }
                onMouseOut$={(e: MouseEvent) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "")
                }
              >
                <div class="flex items-center justify-center rounded-lg p-1.5 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <span class="app-action-label">Komentar</span>
              </button>
              <button
                class="hover:text-app-600 group flex items-center justify-center gap-2 py-3.5 transition-all active:scale-95"
                style="color: var(--app-text-muted);"
                onMouseOver$={(e: MouseEvent) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--app-hover)")
                }
                onMouseOut$={(e: MouseEvent) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "")
                }
              >
                <div class="flex items-center justify-center rounded-lg p-1.5 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                </div>
                <span class="app-action-label">Bagikan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

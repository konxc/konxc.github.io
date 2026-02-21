import { component$, useSignal, $ } from "@builder.io/qwik";

import { authClient } from "../../lib/auth-client";

export const LoginForm = component$(() => {
  const email = useSignal("");
  const password = useSignal("");
  const loading = useSignal(false);
  const error = useSignal("");

  const handleLogin = $(async () => {
    loading.value = true;
    error.value = "";

    try {
      await authClient.signIn.email(
        {
          email: email.value,
          password: password.value,
          callbackURL: "/app",
        },
        {
          onSuccess: () => {
            loading.value = false;
            window.location.href = "/app";
          },
          onError: (ctx: { error: { message?: string } }) => {
            error.value =
              ctx.error?.message ?? "Login gagal. Periksa email dan password.";
            loading.value = false;
          },
        },
      );
    } catch {
      error.value = "Terjadi kesalahan. Silakan coba lagi.";
      loading.value = false;
    }
  });

  return (
    <div class="space-y-4">
      {error.value && (
        <div class="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
          {error.value}
        </div>
      )}

      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email.value}
          onInput$={(_, el) => {
            email.value = el.value;
          }}
          class="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="nama@email.com"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password.value}
          onInput$={(_, el) => {
            password.value = el.value;
          }}
          class="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>

      <button
        onClick$={handleLogin}
        disabled={loading.value}
        class="flex w-full justify-center rounded-lg bg-blue-600 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading.value ? (
          <svg
            class="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Masuk"
        )}
      </button>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="bg-white px-2 text-gray-500">Atau lanjutkan dengan</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          onClick$={$(() => {
            loading.value = true;
            error.value = "";
            authClient.signIn.social({
              provider: "github",
              callbackURL: "/app",
            });
          })}
          disabled={loading.value}
          class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 20.15 9.51348 19.325C6.73848 19.925 6.15098 18.6875 6.15098 18.6875C5.68848 17.5125 5.03848 17.2 5.03848 17.2C4.13848 16.5875 5.10098 16.6 5.10098 16.6C6.10098 16.675 6.62598 17.625 6.62598 17.625C7.51348 19.1375 8.95098 18.7 9.51348 18.4375C9.60098 17.8 9.85098 17.3625 10.126 17.1125C7.91348 16.8625 5.58848 16.0125 5.58848 12.2125C5.58848 11.1375 5.97598 10.25 6.60098 9.5625C6.50098 9.3125 6.16348 8.3125 6.70098 6.9625C6.70098 6.9625 7.52598 6.7 9.40098 7.9625C10.1885 7.75 11.0385 7.6375 11.876 7.6375C12.7135 7.6375 13.5635 7.75 14.351 7.9625C16.226 6.7 17.051 6.9625 17.051 6.9625C17.5885 8.3125 17.251 9.3125 17.151 9.5625C17.776 10.25 18.151 11.1375 18.151 12.2125C18.151 16.025 15.826 16.8625 13.601 17.1125C13.951 17.4125 14.2635 18.0125 14.2635 18.925C14.2635 20.225 14.251 21.275 14.251 21.525C14.251 21.7875 14.4385 22.0875 14.951 22C18.9135 20.675 21.776 16.925 21.776 12.5C21.776 6.975 17.3885 2.5 12.001 2.5V2Z" />
          </svg>
          <span class="text-sm font-medium text-gray-600">Github</span>
        </button>
        <button
          onClick$={$(() => {
            loading.value = true;
            error.value = "";
            authClient.signIn.social({
              provider: "google",
              callbackURL: "/app",
            });
          })}
          disabled={loading.value}
          class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
            />
          </svg>
          <span class="text-sm font-medium text-gray-600">Google</span>
        </button>
      </div>
    </div>
  );
});

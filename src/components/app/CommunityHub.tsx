import { component$ } from "@builder.io/qwik";

export const CommunityHub = component$(() => {
  const hubs = [
    {
      title: "Digital UMKM",
      description: "Edukasi & tools digital untuk naik kelas.",
      icon: "📱",
      color: "from-blue-500 to-cyan-400",
      link: "/app/hub/digital",
    },
    {
      title: "Investasi",
      description: "Manajemen aset & peluang investasi.",
      icon: "📈",
      color: "from-green-500 to-emerald-400",
      link: "/app/hub/investasi",
    },
    {
      title: "SaaS & Cloud",
      description: "Infrastruktur Awankinton & software bisnis.",
      icon: "☁️",
      color: "from-indigo-500 to-blue-400",
      link: "/app/hub/saas",
    },
    {
      title: "Web3 & Crypto",
      description: "Blockchain & ekonomi masa depan.",
      icon: "🌐",
      color: "from-purple-500 to-pink-400",
      link: "/app/hub/web3",
    },
  ];

  return (
    <div class="hide-scrollbar overflow-x-auto">
      <div class="flex min-w-max gap-4 px-5 py-5">
        {hubs.map((hub) => (
          <a
            key={hub.title}
            href={hub.link}
            class="group app-card app-card-hover relative w-52 overflow-hidden border-[var(--app-border)] p-5 shadow-xs transition-all"
          >
            <div
              class={`absolute top-0 right-0 -mt-3 -mr-3 h-16 w-16 rounded-full bg-gradient-to-br ${hub.color} opacity-10 transition-transform group-hover:scale-110`}
            ></div>
            <div class="mb-4 text-3xl">{hub.icon}</div>
            <h3 class="mb-1.5 text-xs font-black tracking-tight text-[var(--app-text)] uppercase">
              {hub.title}
            </h3>
            <p class="line-clamp-2 text-[11px] leading-normal font-medium text-[var(--app-text-muted)]">
              {hub.description}
            </p>
            <div class="text-app-600 mt-4 flex items-center text-[10px] font-black tracking-widest uppercase opacity-0 transition-opacity group-hover:opacity-100">
              Explore Hub
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ml-1.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
});

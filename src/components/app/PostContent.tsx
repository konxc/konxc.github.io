import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface PostContentProps {
  content: string;
  id: string;
}

// Singleton to store the loading promise. This ensures libraries are only fetched ONCE per page session.
let sharedDepsPromise: Promise<any> | null = null;

const loadDependencies = () => {
  if (sharedDepsPromise) return sharedDepsPromise;

  sharedDepsPromise = (async () => {
    const [{ Marked, Renderer }, { markedHighlight }, hljs, katex, mermaid] =
      await Promise.all([
        import("marked"),
        import("marked-highlight"),
        import("highlight.js"),
        import("katex"),
        import("mermaid"),
      ]);

    const isDark = document.documentElement.classList.contains("dark");

    // Global Mermaid Init
    const config: import("mermaid").MermaidConfig & { useMaxWidth?: boolean } =
      {
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        securityLevel: "loose",
        fontFamily: "Outfit, system-ui, sans-serif",
        useMaxWidth: false,
        themeVariables: isDark
          ? {
              primaryColor: "#4a5dff",
              primaryTextColor: "#f1f5f9",
              background: "#111720",
              mainBkg: "#161d2a",
              nodePadding: 15,
            }
          : {
              primaryColor: "#4a5dff",
              primaryTextColor: "#1e293b",
              background: "#ffffff",
              mainBkg: "#f8fafc",
              nodePadding: 15,
            },
        flowchart: { htmlLabels: true, curve: "linear" },
      };
    mermaid.default.initialize(config);

    console.log(`[Mermaid] Singleton shared initialization complete.`);

    return { Marked, Renderer, markedHighlight, hljs, katex, mermaid };
  })();

  return sharedDepsPromise;
};

export const PostContent = component$<PostContentProps>(({ content, id }) => {
  const html = useSignal<string>("");
  const rendered = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    if (rendered.value) return;
    rendered.value = true;

    // 1. Wait for shared singleton loader
    const { Marked, Renderer, markedHighlight, hljs, katex, mermaid } =
      await loadDependencies();

    // Trick: Wait for fonts to be ready
    if ("fonts" in document) {
      await (document as any).fonts.ready;
    }

    // 2. Pre-process math
    let processed = content;
    processed = processed.replace(
      /\$\$([\s\S]+?)\$\$/g,
      (_match: string, math: string) => {
        try {
          const renderedMath = katex.default.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
            output: "html",
          });
          return `<div class="math-block">${renderedMath}</div>`;
        } catch {
          return `<div class="math-error"><code>${math}</code></div>`;
        }
      },
    );

    processed = processed.replace(
      /(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)/g,
      (_match: string, math: string) => {
        try {
          return katex.default.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false,
            output: "html",
          });
        } catch {
          return `$${math}$`;
        }
      },
    );

    // 3. Setup Markdown
    const renderer = new Renderer();
    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
      const raw = text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      if (lang === "mermaid") {
        const bytes = new TextEncoder().encode(raw);
        const encoded = btoa(
          Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""),
        );
        return `<div class="mermaid-pending" data-diagram="${encoded}" data-post="${id}"></div>`;
      }
      const language =
        lang && hljs.default.getLanguage(lang) ? lang : "plaintext";
      const highlighted = hljs.default.highlight(raw, { language }).value;
      return `<div class="code-block"><div class="code-header"><span class="code-lang">${lang || "text"}</span><button class="code-copy" onclick="navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').innerText)">Copy</button></div><pre><code class="hljs language-${language}">${highlighted}</code></pre></div>`;
    };

    const localMarked = new Marked(
      markedHighlight({
        highlight(code: string, lang: string) {
          if (lang === "mermaid") return code;
          const language = hljs.default.getLanguage(lang) ? lang : "plaintext";
          return hljs.default.highlight(code, { language }).value;
        },
      }),
    );
    localMarked.use({ renderer });

    html.value = await localMarked.parse(processed);

    // 4. Render Mermaid (Single execution context)
    await new Promise((resolve) => setTimeout(resolve, 200));
    const pendingNodes = document.querySelectorAll<HTMLElement>(
      `.mermaid-pending[data-post="${id}"]`,
    );

    let mermaidIdx = 0;
    for (const el of pendingNodes) {
      const b64 = el.getAttribute("data-diagram") || "";
      let code: string;
      try {
        const binString = atob(b64);
        const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
        code = new TextDecoder().decode(bytes);
      } catch {
        code = b64;
      }

      const diagramId = `mermaid-${id}-${mermaidIdx++}`;
      try {
        const { svg } = await mermaid.default.render(diagramId, code);
        el.innerHTML = svg;
        el.classList.remove("mermaid-pending");
        el.classList.add("mermaid-rendered");
      } catch (e) {
        console.warn(`[Mermaid] Render failed:`, e);
        el.classList.add("mermaid-error");
        el.innerHTML = `<div class="p-4 bg-red-500/10 text-red-500 rounded text-xs"><p class="font-bold">Diagram Error:</p><pre>${e instanceof Error ? e.message : String(e)}</pre></div>`;
      }
    }
  });

  const ssrFallback = content
    .split(/\n\n+/)
    .map((p: string) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return (
    <div
      class="post-content"
      dangerouslySetInnerHTML={html.value || ssrFallback}
    />
  );
});

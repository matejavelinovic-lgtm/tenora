// @ts-check
import { defineConfig } from 'astro/config';

// Plain HTML + CSS — no Tailwind, no UI framework. Styling lives in
// src/styles/ as class-based rules. https://astro.build/config
export default defineConfig({
  server: { port: 3000, host: true },
  // The toolbar is fixed to the viewport and would appear in every fidelity
  // capture as a difference the original does not have.
  devToolbar: { enabled: false },
  // Insight bodies are imported verbatim from the original; smart quotes would
  // rewrite their straight quotes and dashes, and GFM would turn the URLs and
  // emails they print as plain text into links.
  markdown: { smartypants: false, gfm: false },
  redirects: {
    '/home-copy': '/',
  },
});

// ausgetrunken-legal Worker — permanent redirect to this GitHub Pages site.
//
// App builds up to at least 0.4.4 link to https://ausgetrunken-legal.markono-code.workers.dev/<page>.
// The pages now live only in this repo; the Worker keeps those links alive without an app release.
// Every path maps 1:1 (privacy-policy.html, terms-of-service.html, about.html, delete-account/),
// so path and query are carried over unchanged.
//
// Not deployed by GitHub: Jekyll skips folders starting with "_", and Cloudflare has no Git
// connection. Paste this into Cloudflare Dashboard → Workers & Pages → ausgetrunken-legal → Edit code.

const TARGET = "https://markono-code.github.io/Ausgetrunken-Docs";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    return Response.redirect(TARGET + url.pathname + url.search, 301);
  },
};

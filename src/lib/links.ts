// Prefix internal hrefs with the configured base path so they work in dev
// (where the dev server only serves under `base`) and in prod (where GHP
// serves under the same `base`). Without this, root-relative hrefs like
// "/process/" 404 on direct load / reload.
export const BASE = import.meta.env.BASE_URL;
export const link = (p: string): string =>
  `${BASE}${p.replace(/^\//, '')}`.replace('//', '/');

// Strip the configured base path so route comparisons can use route-relative
// paths like '/about/' regardless of GHP base prefix. Returns '/' for the home
// route.
export const stripBase = (s: string): string => {
  const b = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  if (!b) return s || '/';
  return (s.startsWith(b) ? s.slice(b.length) : s) || '/';
};

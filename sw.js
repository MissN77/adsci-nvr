// ── Service worker ────────────────────────────────────────────────────────
//
// BUMP CACHE_NAME ON EVERY DEPLOY. The install step precaches a fixed list of
// files and the fetch handler serves cache-first, so a stale cache will keep
// shipping the old app forever unless the name changes. Changing the name is
// the only signal that tells a returning device to fetch fresh copies.

const CACHE_NAME = 'adsci-nvr-v5';

// Everything the app needs to run with no network at all. Kept explicit
// rather than generated, because a missed file means a broken offline start
// and we would rather see the install fail loudly during testing.
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './js/app.js',
  './js/ui/screens.js',
  './js/core/store.js',
  './js/core/licence.js',
  './js/core/teach.js',
  './js/core/rng.js',
  './js/core/figure.js',
  './js/core/format.js',
  './js/core/render.js',
  './js/core/rules.js',
  './js/generators/index.js',
  './js/generators/_util.js',
  './js/generators/sequences.js',
  './js/generators/odd-one-out.js',
  './js/generators/similarities.js',
  './js/generators/analogies.js',
  './js/generators/matrices.js',
  './js/generators/codes.js',
  './js/generators/reflection.js',
  './js/generators/rotation.js',
  './js/generators/paper-folding.js',
  './js/generators/cubes.js',
  './js/generators/hidden-shapes.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // addAll is atomic, so a typo in PRECACHE fails the install instead of
      // leaving a half-populated cache that only breaks once offline.
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Cache first. This is a paid offline trainer, so a child on a train with
  // no signal matters more than picking up a same-day code change.
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'));
    }),
  );
});

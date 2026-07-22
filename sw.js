// ── Service worker ────────────────────────────────────────────────────────
//
// BUMP CACHE_NAME ON EVERY DEPLOY. The install step precaches a fixed list of
// files and the fetch handler serves cache-first, so a stale cache will keep
// shipping the old app forever unless the name changes. Changing the name is
// the only signal that tells a returning device to fetch fresh copies.

const CACHE_NAME = 'adsci-nvr-v26';

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
  './js/core/paper.js',
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
  './js/generators/grid-rotation.js',
  './js/generators/paper-folding.js',
  './js/generators/cubes.js',
  './js/generators/cube3d.js',
  './js/generators/solids.js',
  './js/generators/radial.js',
  './js/generators/vr-word-pairs.js',
  './js/generators/vr-logic.js',
  './js/generators/vr-sentence.js',
  './js/generators/vr-letters.js',
  './js/generators/vr-odd-words.js',
  './js/generators/vr-analogy.js',
  './js/generators/maths.js',
  './js/generators/maths-figures.js',
  './js/core/vocab.js',
  './js/core/passages.js',
  './js/generators/comprehension.js',
  './js/core/words.js',
  './js/core/answer.js',
  './js/generators/hidden-shapes.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // Fetch every file with cache: 'reload' so the precache is filled from
      // the network, not from the browser's own HTTP cache.
      //
      // Without this, bumping CACHE_NAME is not enough: addAll happily reads
      // stale files out of the HTTP cache and bakes them into the shiny new
      // cache, so the new version serves the old app and buyers never see the
      // fix. This cost an hour of chasing a change that was correctly written,
      // correctly committed and correctly deployed, and still did not appear.
      //
      // addAll stays atomic, so a typo in PRECACHE fails the install rather
      // than leaving a half-filled cache that only breaks once offline.
      .then((cache) => cache.addAll(
        PRECACHE.map((url) => new Request(url, { cache: 'reload' })),
      ))
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

const CACHE_VERSION = 'v3';
const STATIC_CACHE = `ncert-static-${CACHE_VERSION}`;
const API_CACHE = `ncert-api-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// Static assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/ncert_master_192x192.png',
  '/icons/ncert_master_512x512.png',
];

// ─── Install ───────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// ─── Activate ──────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== API_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ─── Fetch ─────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // /api/content → Stale-While-Revalidate
  if (url.pathname.startsWith('/api/content')) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE));
    return;
  }

  // /api/doubt → Network-first, cache fallback
  if (url.pathname.startsWith('/api/doubt')) {
    event.respondWith(networkFirstWithCache(request, API_CACHE));
    return;
  }

  // Static assets → Cache-first
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico|woff2|webmanifest)$/)
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // HTML navigation → Network-first, offline fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(navigationHandler(request));
    return;
  }
});

// ─── Strategies ────────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  // Return cached immediately if available, else wait for network
  if (cached) {
    fetchPromise; // Revalidate in background
    return cached;
  }
  return fetchPromise || offlineFallback();
}

async function networkFirstWithCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    return offlineFallback();
  }
}

async function navigationHandler(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    const cache = await caches.open(STATIC_CACHE);
    return cache.match(OFFLINE_URL);
  }
}

function offlineFallback() {
  return new Response(
    JSON.stringify({ error: 'You are offline. Please reconnect.' }),
    {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

// ─── Push Notifications ────────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'NCERT Master', {
      body: data.body || 'Time to study!',
      icon: '/icons/ncert_master_192x192.png',
      badge: '/icons/ncert_master_192x192.png',
    })
  );
});

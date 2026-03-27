const CACHE_NAME = 'ncert-master-v2';

const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.jpg',
  '/icons/icon-512x512.jpg',
];

// ── Notification schedules store ──────────────────────────────────────────────
let scheduledNotifTimeouts = [];

// ── Install ───────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// ── Activate ──────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|eot)$/) ||
    url.pathname.startsWith('/_next/')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// ── Notification click → focus/open app ──────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If app window already open → focus it
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      // Otherwise open a new window
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

// ── Message from page: schedule notifications ─────────────────────────────────
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SCHEDULE_NOTIFICATIONS') {
    // Clear previous timeouts
    scheduledNotifTimeouts.forEach(id => clearTimeout(id));
    scheduledNotifTimeouts = [];

    const tasks = event.data.tasks || [];
    const now = Date.now();

    tasks.forEach(task => {
      if (!task.start_time || task.completed) return;

      // Parse HH:MM
      const [hStr, mStr] = task.start_time.split(':');
      const h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10);
      if (isNaN(h) || isNaN(m)) return;

      const taskDate = new Date();
      taskDate.setHours(h, m, 0, 0);
      const delay = taskDate.getTime() - now;

      // Only schedule future notifications within next 24 hours
      if (delay > 0 && delay < 86400000) {
        const timeoutId = setTimeout(() => {
          self.registration.showNotification(`📚 Study Time: ${task.subject}`, {
            body: `${task.start_time} – ${task.end_time} | Abhi padhai shuru karo! 🚀`,
            icon: '/icons/icon-192x192.jpg',
            badge: '/icons/icon-192x192.jpg',
            tag: `ncert-task-${task.id}`,
            requireInteraction: true,
            data: { taskId: task.id },
          });
        }, delay);
        scheduledNotifTimeouts.push(timeoutId);
      }
    });

    // Respond back with count
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ scheduled: scheduledNotifTimeouts.length });
    }
  }

  // Test notification
  if (event.data.type === 'TEST_NOTIFICATION') {
    self.registration.showNotification('📚 NCERT Master — Notifications Active!', {
      body: 'Teri study schedule notifications ab kaam karenge! 🎉',
      icon: '/icons/icon-192x192.jpg',
      badge: '/icons/icon-192x192.jpg',
      tag: 'ncert-test',
    });
  }
});
        

const CACHE_NAME = 'ncert-master-v3';

const PRECACHE_URLS = ['/', '/manifest.json', '/icons/ncert_master_192x192.png', '/icons/ncert_master_512x512.png'];

// Active scheduled timeouts (in-SW scheduling)
let scheduledTimeouts = [];

// ── Install ───────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate ──────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
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
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(c => c || caches.match('/')))
    );
    return;
  }

  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf)$/) ||
      url.pathname.startsWith('/_next/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetch$ = fetch(request).then(r => {
          if (r.ok) { const c = r.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, c)); }
          return r;
        }).catch(() => cached);
        return cached || fetch$;
      })
    );
    return;
  }

  event.respondWith(fetch(request).catch(() => caches.match(request)));
});

// ── Notification click ────────────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

// ── Message handler ───────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (!event.data) return;

  // Schedule notifications for today's tasks
  if (event.data.type === 'SCHEDULE_NOTIFICATIONS') {
    // Clear old timeouts
    scheduledTimeouts.forEach(id => clearTimeout(id));
    scheduledTimeouts = [];

    const tasks = event.data.tasks || [];
    const now = Date.now();

    tasks.forEach(task => {
      if (!task.start_time || task.completed) return;

      const [hStr, mStr] = task.start_time.split(':');
      const h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10);
      if (isNaN(h) || isNaN(m)) return;

      const taskTime = new Date();
      taskTime.setHours(h, m, 0, 0);
      let delay = taskTime.getTime() - now;

      // If time already passed today but within 5 minutes → fire immediately
      if (delay <= 0 && delay > -300000) {
        delay = 500; // fire in 500ms
      }

      if (delay > 0 && delay < 86400000) {
        const tid = setTimeout(() => {
          self.registration.showNotification(`📚 Study Time: ${task.subject}`, {
            body: `${task.start_time} – ${task.end_time}\nAbhi padhai shuru karo! 🚀`,
            icon: '/icons/ncert_master_192x192.png',
            badge: '/icons/ncert_master_192x192.png',
            tag: `ncert-task-${task.id}`,
            requireInteraction: true,
            data: { taskId: task.id, url: '/' },
          });
        }, delay);
        scheduledTimeouts.push(tid);
      }
    });
  }

  // Test notification
  if (event.data.type === 'TEST_NOTIFICATION') {
    self.registration.showNotification('✅ NCERT Master — Notifications Active!', {
      body: 'Teri study schedule notifications ab kaam karenge! Notifications ON hain 🎉',
      icon: '/icons/ncert_master_192x192.png',
      tag: 'ncert-test',
    });
  }
});
  

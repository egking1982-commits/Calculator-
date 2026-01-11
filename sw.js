const CACHE_NAME = 'alrhab-v1';
const ASSETS = [
  'index.html',
  'https://i.ibb.co/LzfMvS7/1000348849.jpg',
  'https://cdn-icons-png.flaticon.com/512/2913/2913400.png'
];

// تثبيت الـ Service Worker وحفظ الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// استراتيجية الاستجابة: البحث في الكاش أولاً، ثم الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

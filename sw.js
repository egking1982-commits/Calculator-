const CACHE_NAME = 'digo-pharaonic-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html', // تأكد أن ملفك الأساسي بهذا الاسم
  // أضف أي ملفات خارجية هنا إذا وجدت مثل:
  // 'https://fonts.googleapis.com/css2?family=Cinzel&display=swap'
];

// تثبيت الـ Service Worker وحفظ الملفات في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل الـ Service Worker وحذف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// استراتيجية الاستجابة: البحث في الكاش أولاً، ثم الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

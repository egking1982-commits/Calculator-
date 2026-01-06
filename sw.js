const CACHE_NAME = 'brush-manager-v3.0.0-ultimate'; // تم التحديث للإصدار النهائي V3.0.0
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-database-compat.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn-icons-png.flaticon.com/512/1048/1048953.png'
];

// تثبيت الخدمة وحفظ الملفات في الكاش
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets for V3.0.0 Ultimate...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); 
});

// تنظيف الكاش القديم (مثل v2.7.0) عند تفعيل الإصدار الجديد
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// استرجاع الملفات من الكاش أو من الشبكة
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});


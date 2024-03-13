// self.addEventListener('push', function (event) {
//   const data = event.data.json();

//   // 알림 옵션 설정
//   const options = {
//     body: data.body,
//     icon: data.icon,
//     vibrate: [100, 50, 100],
//     data: {
//       url: data.url,
//     },
//   };

//   // 알림 표시
//   self.registration.showNotification(data.title, options);
// });

const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};
activateEvent();

const cacheName = 'v1';

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

const fetchEvent = () => {
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res),
    );
  });
};

fetchEvent();

const CACHE='vapefree-v3';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./style.css','./app.js','./model.js','./sounds.js','./wellbeing.js','./wellbeing-ui.js','./icon.svg','./manifest.webmanifest'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===location.origin)e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});

self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(async windows=>{const url=new URL('./#sos',self.location.href).href;const client=windows.find(c=>c.url.startsWith(self.registration.scope));if(client){await client.navigate(url);return client.focus()}return clients.openWindow(url)}))});

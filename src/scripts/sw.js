/* eslint-disable comma-dangle */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Register routes
registerRoute(
  ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev',
  new StaleWhileRevalidate()
);

// Do precaching
precacheAndRoute(self.__WB_MANIFEST || []);

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');
  // Handle push notification event as needed
  // This is just a placeholder, replace with your actual push notification logic
  const options = {
    body: event.data.text(),
  };
  event.waitUntil(
    self.registration.showNotification('Your App Name', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // Handle notification click event as needed
  // This is just a placeholder, replace with your actual notification click logic
  event.waitUntil(
    clients.openWindow('https://your-app-url')
  );
});

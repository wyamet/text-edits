// Import required Workbox libraries and methods
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { StaleWhileRevalidate, CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache all assets specified in the __WB_MANIFEST generated by Workbox
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst strategy for page caching with a CacheableResponsePlugin and ExpirationPlugin
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up the pageCache with specified URLs
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Register a route to cache all navigation requests with the pageCache strategy
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Register a route to cache all JS, CSS, and worker requests with a StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: "asset-cache",
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
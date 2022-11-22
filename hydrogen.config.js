import { defineConfig } from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: 'texturesupply.myshopify.com',
    storefrontToken: Oxygen.env.PUBLIC_STOREFRONT_API_TOKEN,
    storefrontApiVersion: '2022-07',
  },
  logger: {
    /* Overrides the default `log.trace` behavior. */
    trace: (request, ...args) => console.log(request.url, ...args),
    /* Overrides the default `log.error` behavior. */
    error: async (request, error) => {
      console.error(error);
      // Methods can return promises. Hydrogen won't block the current
      // request but it will wait for the promises to be returned before the runtime instance ends.
      await myErrorTrackingService.send(request, error);
    },
    /* ... */

    /* Logs the cache status of each stored entry: `PUT`, `HIT`, `MISS` or `STALE`. */
    showCacheApiStatus: true,
    /* Logs the cache control headers of the main document and its sub queries. */
    showCacheControlHeader: true,
    /* Logs the timeline of when queries are being requested, resolved, and rendered.
     * This is an experimental feature. As a result, functionality is subject to change.
     * You can provide feedback on this feature by submitting an issue in GitHub:
     * https://github.com/Shopify/hydrogen/issues.*/
    showQueryTiming: true,
    /* Logs warnings in your app if you're over-fetching data from the Storefront API.
     * This is an experimental feature. As a result, functionality is subject to change.
     * You can provide feedback on this feature by submitting an issue in GitHub:
     * https://github.com/Shopify/hydrogen/issues. */
    showUnusedQueryProperties: true,
  },
});

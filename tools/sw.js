const CACHE = "tools-3024d28bc802";
const BASE = "/games/tools/";
const ASSETS = ["/games/tools/","/games/tools/404.html","/games/tools/_headers","/games/tools/_redirects","/games/tools/assets/ConvertPage-D8dZBkkC.js","/games/tools/assets/DiffPage-zEcwhFxE.js","/games/tools/assets/Dropzone-CGLOZ3tT.js","/games/tools/assets/ImagePage-DFIVZI7w.js","/games/tools/assets/MetadataPage-Dqi6bz8V.js","/games/tools/assets/NotFound-C8_2xfCZ.js","/games/tools/assets/PasswordPage-DM6cFPcH.js","/games/tools/assets/PdfPage-CIU6T2oo.js","/games/tools/assets/Pro-RJv8dzXV.js","/games/tools/assets/QrPage-3oxaFq8I.js","/games/tools/assets/bytes-CzzyRdIv.js","/games/tools/assets/download-C52UxWqN.js","/games/tools/assets/image-GapOcHrP.js","/games/tools/assets/index-TwS0Vk4D.css","/games/tools/assets/index-pzRVsKfl.js","/games/tools/assets/input-XwGRNSi-.js","/games/tools/assets/jsx-runtime-DP3ro8E4.js","/games/tools/assets/label-PvgpOg_0.js","/games/tools/assets/policies-BRzr9irU.js","/games/tools/assets/select-lZRDLpkk.js","/games/tools/assets/textarea-DVTU7hnJ.js","/games/tools/compress/index.html","/games/tools/convert/index.html","/games/tools/diff/index.html","/games/tools/favicon.svg","/games/tools/icons/icon-192.png","/games/tools/icons/icon-512.png","/games/tools/icons/maskable-512.png","/games/tools/index.html","/games/tools/manifest.webmanifest","/games/tools/metadata/index.html","/games/tools/password/index.html","/games/tools/pdf/index.html","/games/tools/privacy/index.html","/games/tools/pro/index.html","/games/tools/qr/index.html","/games/tools/refunds/index.html","/games/tools/robots.txt","/games/tools/terms/index.html","/games/tools/theme-boot.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(BASE === "/" ? "/" : BASE)) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      // Static hosts often send Vary: Origin. ignoreVary lets a precached
      // file match the page's later request for the same path.
      const cached =
        (await cache.match(request, { ignoreVary: true })) ||
        (await cache.match(url.pathname, { ignoreVary: true }));
      if (request.mode === "navigate") {
        try {
          return await fetch(request);
        } catch {
          const indexPath = url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname + "/index.html";
          return (
            (await cache.match(indexPath, { ignoreVary: true })) ||
            (await cache.match(BASE + "index.html", { ignoreVary: true })) ||
            (await cache.match(BASE, { ignoreVary: true })) ||
            cached ||
            Response.error()
          );
        }
      }
      if (cached) return cached;
      const fresh = await fetch(request);
      if (fresh.ok) await cache.put(request, fresh.clone());
      return fresh;
    })(),
  );
});

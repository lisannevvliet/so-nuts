// Change this variable to reregister the service worker (a.k.a. revisioning).
const version = 1
// Cache all static files, as well as the login.handlebars file.
const files = [
    "/fonts/Nunito-Black.woff",
    "/fonts/Nunito-Black.woff2",
    "/fonts/Nunito-BlackItalic.woff",
    "/fonts/Nunito-BlackItalic.woff2",
    "/fonts/Nunito-Bold.woff",
    "/fonts/Nunito-Bold.woff2",
    "/fonts/Nunito-BoldItalic.woff",
    "/fonts/Nunito-BoldItalic.woff2",
    "/fonts/Nunito-ExtraBold.woff",
    "/fonts/Nunito-ExtraBold.woff2",
    "/fonts/Nunito-ExtraBoldItalic.woff",
    "/fonts/Nunito-ExtraBoldItalic.woff2",
    "/fonts/Nunito-ExtraLight.woff",
    "/fonts/Nunito-ExtraLight.woff2",
    "/fonts/Nunito-ExtraLightItalic.woff",
    "/fonts/Nunito-ExtraLightItalic.woff2",
    "/fonts/Nunito-Italic.woff",
    "/fonts/Nunito-Italic.woff2",
    "/fonts/Nunito-Light.woff",
    "/fonts/Nunito-Light.woff2",
    "/fonts/Nunito-LightItalic.woff",
    "/fonts/Nunito-LightItalic.woff2",
    "/fonts/Nunito-Medium.woff",
    "/fonts/Nunito-Medium.woff2",
    "/fonts/Nunito-MediumItalic.woff",
    "/fonts/Nunito-MediumItalic.woff2",
    "/fonts/Nunito-Regular.woff",
    "/fonts/Nunito-Regular.woff2",
    "/fonts/Nunito-SemiBold.woff",
    "/fonts/Nunito-SemiBold.woff2",
    "/fonts/Nunito-SemiBoldItalic.woff",
    "/fonts/Nunito-SemiBoldItalic.woff2",
    // "/images/background.jpg",
    // "/images/placeholder.png",
    // "/images/search.png",
    // "/scripts/script.js",
    "/styles/style.css",
    "/"
]

// Install the service worker.
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("core-cache")
            .then(cache => {
                // Ensure that any new versions of the service worker will take over the page and become activated immediately.
                self.skipWaiting()

                return cache.addAll(files)
            })
    )
})

// Fetch the service worker.
self.addEventListener("fetch", event => {
    const url = new URL(event.request.url)

    // Check if any of the requested files already exists in the core-cache and serve them.
    if (event.request.method == "GET" && files.includes(url.pathname)) {
        event.respondWith(
            caches.open("core-cache")
                .then(cache =>
                    cache.match(event.request.url)
                )
        )
    }
    // Only request the HTML, all the other files are already in the core-cache.
    else if (event.request.method == "GET" && (event.request.headers.get("accept") != null && event.request.headers.get("accept").includes("text/html"))) {
        event.respondWith(
            caches.open("dynamic-cache")
                .then(async cache => {
                    // Retrieve the HTML from the dynamic-cache.
                    const cache_response = await cache.match(event.request)

                    // Try to retrieve the HTML from the network.
                    const response = fetch(event.request)
                        .then(network_response => {
                            // Save the HTML in the dynamic-cache.
                            cache.put(event.request, network_response.clone())

                            return network_response
                        })
                        // If this fails, use the HTML from the dynamic-cache.
                        .catch(() => {
                            return cache_response
                        })

                    return await response
                })
        )
    }
})
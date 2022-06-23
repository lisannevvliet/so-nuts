// Change this variable to reregister the service worker (a.k.a. revisioning).
const version = 1

// Cache all static files, as well as the login page.
const files = [
    "/favicon/android-chrome-192x192.png",
    "/favicon/android-chrome-512x512.png",
    "/favicon/apple-touch-icon.png",
    "/favicon/favicon-16x16.png",
    "/favicon/favicon-32x32.png",
    "/favicon/favicon.ico",
    "/favicon/mstile-150x150.png",
    "/fonts/Nunito-ExtraBold.woff2",
    "/fonts/Nunito-Italic.woff2",
    "/fonts/Nunito-Light.woff2",
    "/fonts/Nunito-Regular.woff2",
    "/fonts/Nunito-SemiBold.woff2",
    "/images/goals/beweging_doel_header.svg",
    "/images/goals/delete_dots.svg",
    "/images/goals/empty_state.webp",
    "/images/goals/plus_sign.svg",
    "/images/goals/voeding_doel_header.svg",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-256x256.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "/images/login/login_background.svg",
    "/images/offline/offline.webp",
    "/images/onboarding/onboarding.svg",
    "/images/profile/avocado.webp",
    "/images/profile/couch.webp",
    "/images/profile/finish.svg",
    "/images/profile/fitness.webp",
    "/images/profile/food.webp",
    "/images/profile/profile_icon.svg",
    "/images/profile/profile_swirl.svg",
    "/images/profile/weight.webp",
    "/images/questionnaire/questionnaire_background.svg",
    "/images/questionnaire/vragenlijst_icon.svg",
    "/scripts/modules/answers.js",
    "/scripts/modules/goals.js",
    "/scripts/modules/profile.js",
    "/scripts/modules/questionnaire.js",
    "/scripts/modules/update_view.js",
    "/scripts/modules/validate.js",
    "/scripts/script.js",
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
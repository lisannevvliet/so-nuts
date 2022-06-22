import questionnaire from "./modules/questionnaire.js"
import goals from "./modules/goals.js"
import profile from "./modules/profile.js"

// If supported, install the service worker.
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then(registration => {
                return registration.update()
            })
            .catch(error => {
                console.log(error)
            })
    })
}

// Check if the questionnaire page is currently displayed.
if ($(".questionnaire")) {
    questionnaire()
}

// Check if the goals page is currently displayed.
if ($(".goals_page")) {
    goals()
}

// Check if the profile page is currently displayed.
if ($(".profile")) {
    profile()
}
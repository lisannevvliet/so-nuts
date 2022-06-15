import $ from "./$.js"

export default function onboarding() {
    $(".next_button").addEventListener("click", () => {
        // Redirect to the questionnaire page.
        window.location.href = "/questionnaire"
        // Save the completion in localStorage.
        localStorage.setItem("onboarding", "Completed")
    })
}
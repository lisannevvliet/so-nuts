import $ from "./$.js"

export default function onboarding() {
    // Get the URL parameters.
    const parameters = new URLSearchParams(window.location.search)

    // Fill the hidden input fields with the URL parameter values.
    $("#name").value = parameters.get("name")
    $("#email").value = parameters.get("email")
}
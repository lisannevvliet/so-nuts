import $ from "./$.js"

export default function profile() {
    // Get the URL parameters.
    const parameters = new URLSearchParams(window.location.search)

    // Fill the header with the URL parameter value.
    $("#name").textContent = parameters.get("name")

    $(".see_answers").addEventListener("click", () => {
        // Show the pop-up.
        $(".questionnaire_answers").classList.remove("hide_state")
        $(".questionnaire_answers").classList.add("show_popup")
    })

    $(".close_popup").addEventListener("click", () => {
        // Hide the pop-up.
        $(".questionnaire_answers").classList.remove("show_popup")
        $(".questionnaire_answers").classList.add("hide_state")
    })

    $(".previous_url").addEventListener("click", () => {
        // Go back to goals/ previous personalized url. 
        history.back()
    })
}
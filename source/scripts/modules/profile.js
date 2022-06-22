export default function profile() {
    $(".previous_url").addEventListener("click", () => {
        // Go back to previous URL, which is the goals page. 
        history.back()
    })

    $(".see_answers").addEventListener("click", () => {
        // Show the pop-up.
        $(".questionnaire_answers").classList.remove("hide_state")
    })

    $(".close_popup").addEventListener("click", () => {
        // Hide the pop-up.
        $(".questionnaire_answers").classList.add("hide_state")
    })
}
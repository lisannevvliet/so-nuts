import $ from "./$.js"
import $$ from "./$$.js"

export default function goals() {
    // Get the URL parameters.
    const parameters = new URLSearchParams(window.location.search)

    // Fill the hidden input fields with the URL parameter values.
    $$(".name").forEach(element => {
        element.value = parameters.get("name")
    })

    $$(".email").forEach(element => {
        element.value = parameters.get("email")
    })

    // Clear the localStorage.
    localStorage.clear()

    $("#add").addEventListener("click", () => {
        // Show the pop-up.
        $("form").classList.add("show_popup")
    })

    $(".close_popup").addEventListener("click", () => {
        // Hide the pop-up.
        $("form").classList.remove("show_popup")
    })

    $$(".checkmark_test").forEach((element, index) => {
        element.addEventListener("click", () => {
            // Submit the hidden form.
            $$(".increase_streak")[index].submit()

            // Show the check animation.
            $$(".checkmark_test")[index].classList.add("checkmark_animation")
            $$(".checkmark_check_test")[index].classList.add("checkmark_check_animation")

            // $("li").classList.add("confetti")
        })

        // if complete {
        // $("confetti_container").classList.remove("hide_state")
        // }
    })
}
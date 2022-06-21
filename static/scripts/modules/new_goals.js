import $ from "./$.js"
import $$ from "./$$.js"

export default function new_goals() {
    // Get the URL parameters.
    const parameters = new URLSearchParams(window.location.search)

    // Fill the hidden input fields with the URL parameter values.
    $("#name").value = parameters.get("name")
    $("#email").value = parameters.get("email")

    $("#add").addEventListener("click", () => {
        // Show the pop-up.
        $("form").classList.add("show_popup")
    })

    $(".close_popup").addEventListener("click", () => {
        // Hide the pop-up.
        $("form").classList.remove("show_popup")
    })

    $$(".checkmark_test").forEach((element, index) => {
        element.addEventListener("click", (event) => {
            console.log(`ID of user goal: ${event.target.id}`)

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
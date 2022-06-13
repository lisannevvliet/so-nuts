import $ from "./$.js"
import $$ from "./$$.js"

export default function create_goal_popup() {

    // After clicking on the round button with "+" to add a goal it shows the popup.
    function show_popup() {
        $("form").classList.add("show_popup")
    }

    $$("input[type=checkbox]").forEach((checkbox, index) => {
        checkbox.addEventListener("click", () => {
            // Check if the checkbox is checked.
            if (checkbox.checked) {
                // Show the options.
                $$("article")[index].classList.add("show_extra")
            } else {
                // Hide the options.
                $$("article")[index].classList.remove("show_extra")
            }
        })
    })
    $("button").addEventListener("click", show_popup)
}

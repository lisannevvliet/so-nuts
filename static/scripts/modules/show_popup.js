import $ from "./$.js"
import $$ from "./$$.js"

export default function create_goal_popup() {
    $("#add").addEventListener("click", () => {
        // Hide all previously shown options.
        $$(".add_goal article").forEach(article => {
            article.classList.remove("show_extra")
        })

        // Show the pop-up.
        $("form").classList.add("show_popup")
    })

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
}
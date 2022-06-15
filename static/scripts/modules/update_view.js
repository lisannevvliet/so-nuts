import $ from "./$.js"
import $$ from "./$$.js"
import { load_answers } from "./answers.js"

export default function update_view(index) {
    // Fill in the progress bar.
    $$("#progress div")[index - 1].style.width = (index - 1) * 100 / $("#amount_of_questions").textContent + "%"

    // Check if there are any answers stored in localStorage.
    if (localStorage.getItem("answers")) {
        load_answers(index)
    }
}
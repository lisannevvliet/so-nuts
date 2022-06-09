import $ from "./$.js"
import $$ from "./$$.js"
import { load_answers } from "./answers.js"

export default function update_view(questionnaire_index) {
    // Fill in the progress bar.
    $$("#progress div")[questionnaire_index - 1].style.width = (questionnaire_index - 1) * 100 / $("#amount_of_questions").textContent + "%"

    // Check if there are any answers stored in localStorage.
    if (localStorage.getItem("answers")) {
        load_answers(questionnaire_index)
    }
}
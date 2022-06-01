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

    // Hide the previous button in the first question.
    if (questionnaire_index == 1) {
        $(".prev_button").classList.add("hide_button")
    } else {
        $(".prev_button").classList.remove("hide_button")
    }

    // Change the next button text in the last question.
    if (questionnaire_index == $("#amount_of_questions").textContent) {
        $(".next_button").textContent = "Dashboard"
    } else {
        $(".next_button").textContent = "Volgende"
    }
}
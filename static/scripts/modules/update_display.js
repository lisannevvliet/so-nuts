import $ from "./$.js"
import $$ from "./$$.js"
import { load_answers } from "./answers.js"

export default function update_display(questionnaire_index) {
    // Hide the previous button for the first question.
    if (questionnaire_index == 1) {
        $(".prev_button").classList.add("hide_button")
    } else {
        $(".prev_button").classList.remove("hide_button")
    }

    // Hide the next button for the last question.
    if (questionnaire_index == $("#amount_of_questions").textContent) {
        $(".next_button").classList.add("hide_button")
    } else {
        $(".next_button").classList.remove("hide_button")
    }

    // Save the index in localStorage.
    localStorage.setItem("index", questionnaire_index)

    // Check if there are any answers stored in localStorage.
    if (localStorage.getItem("answers")) {
        load_answers(questionnaire_index)
    }

    // Fill in the progress bar.
    $$("#progress div")[questionnaire_index - 1].style.width = (questionnaire_index - 1) * 100 / $("#amount_of_questions").textContent + "%"
}
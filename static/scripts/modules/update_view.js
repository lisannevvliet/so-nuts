import $ from "./$.js"
import $$ from "./$$.js"
import { load_answers } from "./answers.js"

export default function update_view(index, direction) {
    if (direction == "next") {
        // Hide the previous question.
        $(`.questionnaire li:nth-child(${index})`).classList.remove("show_element")

        // Increase and save the index in localStorage.
        localStorage.setItem("index", ++index)

        // Check if the questionnaire is incomplete.
        if (index > $("#amount_of_questions").textContent) {
            // Save the completion in localStorage.
            localStorage.setItem("questionnaire", "Completed")
        } else {
            // Show the next question.
            $(`.questionnaire li:nth-child(${index})`).classList.add("show_element")
        }
    } else if (direction == "previous") {
        // Hide the previous question.
        $(`.questionnaire li:nth-child(${index})`).classList.remove("show_element")

        // Decrease and save the index in localStorage.
        localStorage.setItem("index", --index)

        // Show the next question.
        $(`.questionnaire li:nth-child(${index})`).classList.add("show_element")
    }

    // Fill in the progress bar.
    $$("#progress div")[index - 1].style.width = (index - 1) * 100 / $("#amount_of_questions").textContent + "%"

    // Check if there are any answers stored in localStorage.
    if (localStorage.getItem("answers")) {
        load_answers(index)
    }

    return index
}
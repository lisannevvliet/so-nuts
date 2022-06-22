import { load_answers } from "./answers.js"

export default function update_view(index, direction) {
    if (direction != undefined) {
        // Hide the previous question.
        $(`.questionnaire li:nth-child(${index})`).classList.remove("show_element")

        if (direction == "next") {
            // Increase and save the index in localStorage.
            localStorage.setItem("index", ++index)
        } else if (direction == "previous") {
            // Decrease and save the index in localStorage.
            localStorage.setItem("index", --index)
        }

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
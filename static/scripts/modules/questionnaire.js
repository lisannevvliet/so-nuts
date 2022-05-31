import $ from "./$.js"
import $$ from "./$$.js"
import update_display from "./update_display.js"

export default function questionnaire() {
    let questionnaire_index = 1
    let answers = {}

    // Retrieve the index from localStorage and check if it is not greater than the amount of questions.
    if (localStorage.getItem("index") && localStorage.getItem("index") <= $("#amount_of_questions").textContent) {
        questionnaire_index = localStorage.getItem("index")
    }

    // Show the first question or the one saved in localStorage.
    $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
    update_display(questionnaire_index)

    $$("input[type=text]").forEach(element => {
        element.addEventListener("input", () => {
            // Check if there are checkboxes within the same question and save the values in localStorage.
            if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
                // Add "_text" to prevent overwriting the checkboxes with the textfield.
                answers[questionnaire_index + "_text"] = element.value
                localStorage.setItem("answers", JSON.stringify(answers))
            } else {
                answers[questionnaire_index] = element.value
                localStorage.setItem("answers", JSON.stringify(answers))
            }
        })
    })

    $$("input[type=radio]").forEach(element => {
        element.addEventListener("change", () => {
            // Save the value in localStorage.
            answers[questionnaire_index] = element.value
            localStorage.setItem("answers", JSON.stringify(answers))
        })
    })

    $$("input[type=checkbox]").forEach(element => {
        element.addEventListener("change", () => {
            let checked = []

            // Add all checked checkboxes to an array.
            $$(`input[type=checkbox][name=${element.name}]:checked`).forEach(element => {
                checked.push(element.value)
            })

            // Check if there is a textfield within the same question and save the value in localStorage.
            if ($(`#question_${questionnaire_index} input[type=text]`)) {
                // Add "_checkbox" to prevent overwriting the textfield with the checkboxes.
                answers[questionnaire_index + "_checkbox"] = checked
                localStorage.setItem("answers", JSON.stringify(answers))
            } else {
                answers[questionnaire_index] = checked
                localStorage.setItem("answers", JSON.stringify(answers))
            }
        })
    })

    $(".next_button").addEventListener("click", () => {
        // Hide the previous question.
        $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
        // Increase the index.
        questionnaire_index++
        // Show the next question.
        $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
        update_display(questionnaire_index)
    })

    $(".prev_button").addEventListener("click", () => {
        // Hide the previous question.
        $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
        // Decrease the index.
        questionnaire_index--
        // Show the next question.
        $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
        update_display(questionnaire_index)
    })
}
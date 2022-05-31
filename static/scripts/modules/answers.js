import $ from "./$.js"
import $$ from "./$$.js"

let answers = {}

export function save_answer(type, element, questionnaire_index) {
    switch (type) {
        case "checkbox":
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

            break
        case "radio":
            // Save the value in localStorage.
            answers[questionnaire_index] = element.value
            localStorage.setItem("answers", JSON.stringify(answers))
            break
        case "text":
            // Check if there are checkboxes within the same question and save the values in localStorage.
            if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
                // Add "_text" to prevent overwriting the checkboxes with the textfield.
                answers[questionnaire_index + "_text"] = element.value
                localStorage.setItem("answers", JSON.stringify(answers))
            } else {
                answers[questionnaire_index] = element.value
                localStorage.setItem("answers", JSON.stringify(answers))
            }
    }
}

export function update_answers(localStorage_answers) {
    // Overwrite the answers with the localStorage answers.
    answers = localStorage_answers
}
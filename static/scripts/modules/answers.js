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

export function load_answers(questionnaire_index) {
    // Overwrite the answers with the localStorage answers.
    answers = JSON.parse(localStorage.getItem("answers"))

    // Check if there is both a textfield and checkboxes within the same question.
    if ($(`#question_${questionnaire_index} input[type=text]`) && $(`#question_${questionnaire_index} input[type=checkbox]`)) {
        // Check if the stored value is not empty.
        if (answers[questionnaire_index + "_text"] != undefined) {
            // Fill in the stored value in the textfield.
            $(`#question_${questionnaire_index} input[type=text]`).value = answers[questionnaire_index + "_text"]
        }

        // Check if the stored value is not empty.
        if (answers[questionnaire_index + "_checkbox"] != undefined) {
            $$(`#question_${questionnaire_index} input[type=checkbox]`).forEach(element => {
                answers[questionnaire_index + "_checkbox"].forEach(checkbox => {
                    // Check the stored checkboxes.
                    if (checkbox == element.id) {
                        element.checked = true
                    }
                })
            })
        }
    } else {
        // Check if the stored value is not empty.
        if (answers[questionnaire_index] != undefined) {
            if ($(`#question_${questionnaire_index} input[type=text]`)) {
                // Fill in the stored value in the textfield.
                $(`#question_${questionnaire_index} input[type=text]`).value = answers[questionnaire_index]
            } else if ($(`#question_${questionnaire_index} input[type=radio]`)) {
                // Check the stored radio button.
                $(`#${answers[questionnaire_index]}`).checked = true
            } else if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
                $$(`#question_${questionnaire_index} input[type=checkbox]`).forEach(element => {
                    answers[questionnaire_index].forEach(checkbox => {
                        // Check the stored checkboxes.
                        if (checkbox == element.id) {
                            element.checked = true
                        }
                    })
                })
            }
        }
    }
}
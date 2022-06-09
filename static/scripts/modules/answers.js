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

            // Check if there are checked checkboxes. If there are not, remove the property from the object.
            if (checked.length > 0) {
                // Check if there is a textfield within the same question and save the value in localStorage.
                if ($(`#question_${questionnaire_index} input[type=text]`)) {
                    // Add "_checkbox" to prevent overwriting the textfield with the checkboxes.
                    answers[element.name + "_checkbox"] = checked
                } else {
                    answers[element.name] = checked
                }
            } else {
                // Check if there is a textfield within the same question and remove the property from the object.
                if ($(`#question_${questionnaire_index} input[type=text]`)) {
                    delete answers[element.name + "_checkbox"]
                } else {
                    delete answers[element.name]
                }
            }

            localStorage.setItem("answers", JSON.stringify(answers))

            break
        case "radio":
            // Save the value in localStorage.
            answers[element.name] = element.value
            localStorage.setItem("answers", JSON.stringify(answers))

            break
        case "text":
            // Check if the value is not empty. If it is, remove the property from the object.
            if (element.value != "") {
                // Check if there are checkboxes within the same question and save the values in localStorage.
                if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
                    // Add "_text" to prevent overwriting the checkboxes with the textfield.
                    answers[element.name + "_text"] = element.value
                } else {
                    answers[element.name] = element.value
                }
            } else {
                // Check if there are checkboxes within the same question and remove the property from the object.
                if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
                    delete answers[element.name + "_text"]
                } else {
                    delete answers[element.name]
                }
            }

            localStorage.setItem("answers", JSON.stringify(answers))
    }

    // Set the answers as the value of the hidden input field.
    $("#answers").value = JSON.stringify(answers)
}

export function load_answers(questionnaire_index) {
    // Overwrite the answers with the localStorage answers.
    answers = JSON.parse(localStorage.getItem("answers"))

    // Check if there is both a textfield and checkboxes within the same question.
    if ($(`#question_${questionnaire_index} input[type=text]`) && $(`#question_${questionnaire_index} input[type=checkbox]`)) {
        // Check if the stored value is not empty.
        if (answers[$(`#question_${questionnaire_index} input[type=text]`).name + "_text"] != undefined) {
            // Fill in the stored value in the textfield.
            $(`#question_${questionnaire_index} input[type=text]`).value = answers[$(`#question_${questionnaire_index} input[type=text]`).name + "_text"]
        }

        // Check if the stored value is not empty.
        if (answers[$(`#question_${questionnaire_index} input[type=checkbox]`).name + "_checkbox"] != undefined) {
            $$(`#question_${questionnaire_index} input[type=checkbox]`).forEach(element => {
                answers[$(`#question_${questionnaire_index} input[type=checkbox]`).name + "_checkbox"].forEach(checkbox => {
                    // Check the stored checkboxes.
                    if (checkbox == element.id) {
                        element.checked = true
                    }
                })
            })
        }
    } else {
        if ($(`#question_${questionnaire_index} input[type=text]`)) {
            // Check if the stored value is not empty.
            if (answers[$(`#question_${questionnaire_index} input[type=text]`).name] != undefined) {
                // Fill in the stored value in the textfield.
                $(`#question_${questionnaire_index} input[type=text]`).value = answers[$(`#question_${questionnaire_index} input[type=text]`).name]
            }
        } else if ($(`#question_${questionnaire_index} input[type=radio]`)) {
            // Check if the stored value is not empty.
            if (answers[$(`#question_${questionnaire_index} input[type=radio]`).name] != undefined) {
                // Check the stored radio button.
                $(`#${answers[$(`#question_${questionnaire_index} input[type=radio]`).name]}`).checked = true
            }
        } else if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
            // Check if the stored value is not empty.
            if (answers[$(`#question_${questionnaire_index} input[type=checkbox]`).name] != undefined) {
                $$(`#question_${questionnaire_index} input[type=checkbox]`).forEach(element => {
                    answers[$(`#question_${questionnaire_index} input[type=checkbox]`).name].forEach(checkbox => {
                        // Check the stored checkboxes.
                        if (checkbox == element.id) {
                            element.checked = true
                        }
                    })
                })
            }
        }
    }

    // Set the answers as the value of the hidden input field.
    $("#answers").value = JSON.stringify(answers)
}
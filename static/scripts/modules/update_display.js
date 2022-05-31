import $ from "./$.js"
import $$ from "./$$.js"

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

    // Fill in the progress bar.
    $$("#progress div")[questionnaire_index - 1].style.width = (questionnaire_index - 1) * 100 / $("#amount_of_questions").textContent + "%"
}
// For document.querySelector.
import $ from "./$.js"
// For document.querySelectorAll.
import $$ from "./$$.js"

let questionnaire_index = 1
let answers = { }

export function questionnaire_input_types() {
    // Check if the questionnaire is currently displayed.
    if ($(".questionnaire")) {
        // Adds one eventListener and listens to the value.
        type_text()
        // Loops over all inputs. Adds eventListeners and listens to the changers, and adds the currently selected element to the local JSON, which gets saved in localStorage.
        type_radio()
        type_checkbox()

        // Retrieve the index from localStorage and check if it is not greater than the amount of questions.
        if (localStorage.getItem("index") && localStorage.getItem("index") <= $("#amount_of_questions").textContent) {
            questionnaire_index = localStorage.getItem("index")
        }

        // Show the first question or the one saved in localStorage.
        show_one_question()
        update_display()

        $(".next_button").addEventListener("click", () => {
            // Hide the previous question.
            hide_previous_question()
            // Increase the index.
            questionnaire_index++
            // Show the next question.
            show_one_question()
            update_display()
        })

        $(".prev_button").addEventListener("click", () => {
            // Hide the previous question.
            hide_previous_question()
            // Decrease the index.
            questionnaire_index--
            // Show the next question.
            show_one_question()
            update_display()
        })
    }
}

export function update_display() {
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

export function save_answers_localStorage() {
    localStorage.setItem("answers", JSON.stringify(answers))
}

export function show_one_question() {
    $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
}

export function hide_previous_question() {
    $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
}

export function type_text() {
    $$("input[type=text]").forEach(element => {
        element.addEventListener("input", () => {
            // Check if there are checkboxes within the same question and save the values in localStorage.
            if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
                // Add "_text" to prevent overwriting the checkboxes with the textfield.
                answers[questionnaire_index + "_text"] = element.value
                save_answers_localStorage()
            } else {
                answers[questionnaire_index] = element.value
                save_answers_localStorage()
            }
        })
    })
}
 
export function type_radio() {
    $$("input[type=radio]").forEach(element => {
        element.addEventListener("change", () => {
            // Save the value in localStorage.
            answers[questionnaire_index] = element.value
            save_answers_localStorage()
        })
    })
}

export function type_checkbox() { 
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
                save_answers_localStorage()
            } else {
                answers[questionnaire_index] = checked
                save_answers_localStorage()
            }
        })
    })
}
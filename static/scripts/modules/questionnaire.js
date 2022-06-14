import $ from "./$.js"
import $$ from "./$$.js"
import update_view from "./update_view.js"
import { save_answer } from "./answers.js"

export default function questionnaire() {
    let questionnaire_index = 1

    // Retrieve the index from localStorage and check if it is at least one and not greater than the amount of questions.
    if (localStorage.getItem("index") && localStorage.getItem("index") > 0 && localStorage.getItem("index") <= $("#amount_of_questions").textContent) {
        questionnaire_index = localStorage.getItem("index")
    }

    // Show the first question or the one saved in localStorage.
    $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
    update_view(questionnaire_index)

    $$("input[type=text]").forEach(element => {
        element.addEventListener("input", () => {
            save_answer("text", element, questionnaire_index)
        })
    })

    $$("input[type=radio]").forEach(element => {
        element.addEventListener("change", () => {
            save_answer("radio", element, questionnaire_index)
        })
    })

    $$("input[type=checkbox]").forEach(element => {
        element.addEventListener("change", () => {
            save_answer("checkbox", element, questionnaire_index)
        })
    })

    $$(".next_button").forEach(element => {
        element.addEventListener("click", () => {
            const inputs = $$(`.questionnaire li:nth-child(${questionnaire_index}) input`)

            if (inputs.length > 1) {
                let types = []

                // Add the types of all input fields to an array.
                inputs.forEach(input => {
                    types.push(input.type)
                })

                // If all input fields are of the same type, validate the first one. This will automatically validate all options.
                if (new Set(types).size == 1) {
                    validate(inputs[0])
                } else {
                    console.log("Different input field types.")
                }
            } else {
                validate(inputs[0])
            }

            function validate(input) {
                if (input.checkValidity()) {
                    // Hide the previous question.
                    $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")

                    // Increase and save the index in localStorage.
                    localStorage.setItem("index", ++questionnaire_index)

                    // Check if the questionnaire is incomplete.
                    if (questionnaire_index > $("#amount_of_questions").textContent) {
                        // Save the completion in localStorage.
                        localStorage.setItem("questionnaire", "Completed")
                    } else {
                        // Show the next question.
                        $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
                        update_view(questionnaire_index)
                    }
                } else {
                    console.log(input.validationMessage)
                }
            }
        })
    })

    $$(".prev_button").forEach(element => {
        element.addEventListener("click", () => {
            // Hide the previous question.
            $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")

            // Decrease and save the index in localStorage.
            localStorage.setItem("index", --questionnaire_index)

            // Show the next question.
            $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
            update_view(questionnaire_index)
        })
    })
}
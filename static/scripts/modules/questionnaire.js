import $ from "./$.js"
import $$ from "./$$.js"
import update_view from "./update_view.js"
import { save_answer } from "./answers.js"

export default function questionnaire() {
    let index = 1

    // Retrieve the index from localStorage and check if it is at least one and not greater than the amount of questions.
    if (localStorage.getItem("index") && localStorage.getItem("index") > 0 && localStorage.getItem("index") <= $("#amount_of_questions").textContent) {
        index = localStorage.getItem("index")
    }

    // Show the first question or the one saved in localStorage.
    update_view(index)
    $(`.questionnaire li:nth-child(${index})`).classList.add("show_element")

    $$("input[type=text]").forEach(element => {
        element.addEventListener("input", () => {
            save_answer("text", element, index)
        })
    })

    $$("input[type=radio]").forEach(element => {
        element.addEventListener("change", () => {
            save_answer("radio", element, index)
        })
    })

    $$("input[type=checkbox]").forEach(element => {
        element.addEventListener("change", () => {
            save_answer("checkbox", element, index)
        })
    })

    $$(".next_button").forEach(element => {
        element.addEventListener("click", () => {
            // Add all visible input fields to an array.
            const inputs = $$(`.questionnaire li:nth-child(${index}) input:not([type=hidden])`)

            if (inputs.length > 1) {
                let types = []

                // Add the types of all input fields to an array.
                inputs.forEach(input => {
                    types.push(input.type)
                })

                // If all input fields are of the same type, validate the first one. This will automatically validate all options.
                if (new Set(types).size == 1) {
                    if (inputs[0].checkValidity()) {
                        index = update_view(index, "next")
                    } else {
                        console.log(inputs[0].validationMessage)
                    }
                } else {
                    // Check if at least one checkbox or select is checked.
                    if ($$(`input[name=${inputs[0].name}]:checked`).length > 0) {
                        index = update_view(index, "next")
                    }
                    // Check if the input field is not empty.
                    else if (inputs[inputs.length - 1].value != "") {
                        index = update_view(index, "next")
                    } else {
                        console.log("Please select one of these options or fill in this field.")
                    }
                }
            } else {
                if (inputs[0].checkValidity()) {
                    index = update_view(index, "next")
                } else {
                    console.log(inputs[0].validationMessage)
                }
            }
        })
    })

    $$(".prev_button").forEach(element => {
        element.addEventListener("click", () => {
            index = update_view(index, "previous")
        })
    })
}
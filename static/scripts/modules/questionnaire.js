import $ from "./$.js"
import $$ from "./$$.js"
import update_view from "./update_view.js"
import { save_answer } from "./answers.js"

export default function questionnaire() {
    // Get the URL parameters.
    const parameters = new URLSearchParams(window.location.search)

    // Fill the hidden input fields with the URL parameter values.
    $("#name").value = parameters.get("name")
    $("#email").value = parameters.get("email")

    let index = 1

    // Retrieve the index from localStorage and check if it is at least one and not greater than the amount of questions.
    if (localStorage.getItem("index") && localStorage.getItem("index") > 0 && localStorage.getItem("index") <= $("#amount_of_questions").textContent) {
        index = localStorage.getItem("index")
    }

    // Show the first question or the one saved in localStorage.
    update_view(index)
    $(`.questionnaire li:nth-child(${index})`).classList.add("show_element")

    if (validate() == true) {
        $$(".next_button")[index - 1].disabled = false
    } else {
        $$(".next_button")[index - 1].disabled = true
    }

    $$("input[type=text]").forEach(element => {
        element.addEventListener("input", () => {
            save_answer("text", element, index)

            if (validate() == true) {
                $$(".next_button")[index - 1].disabled = false
            } else {
                $$(".next_button")[index - 1].disabled = true
            }

        })
    })

    $$("input[type=radio]").forEach(element => {
        element.addEventListener("change", () => {
            save_answer("radio", element, index)

            if (validate() == true) {
                $$(".next_button")[index - 1].disabled = false
            } else {
                $$(".next_button")[index - 1].disabled = true
            }

        })
    })

    $$("input[type=checkbox]").forEach(element => {
        element.addEventListener("change", () => {
            save_answer("checkbox", element, index)

            if (validate() == true) {
                $$(".next_button")[index - 1].disabled = false
            } else {
                $$(".next_button")[index - 1].disabled = true
            }

        })
    })

    $$(".next_button").forEach(element => {
        element.addEventListener("click", () => {
            if (validate() == true) {
                index = update_view(index, "next")

                if (validate() == true) {
                    $$(".next_button")[index - 1].disabled = false

                } else {
                    $$(".next_button")[index - 1].disabled = true
                }
            }
        })
    })

    $$(".prev_button").forEach(element => {
        element.addEventListener("click", () => {
            index = update_view(index, "previous")

            if (validate() == true) {
                $$(".next_button")[index - 1].disabled = false
            } else {
                $$(".next_button")[index - 1].disabled = true
            }
        })
    })

    function validate() {
        let valid = false

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
                    valid = true
                }
            } else {
                // Check if at least one checkbox or select is checked.
                if ($$(`input[name=${inputs[0].name}]:checked`).length > 0) {
                    valid = true
                }
                // Check if the input field is not empty.
                else if (inputs[inputs.length - 1].value != "") {
                    valid = true
                }
            }
        } else {
            if (inputs[0].checkValidity()) {
                valid = true
            }
        }

        return valid
    }
}
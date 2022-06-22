import update_view from "./update_view.js"
import validate from "./validate.js"
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

    // Enable the next button if the input field value is valid.
    validate(index)

    // Focus on the input field, if there is any.
    try {
        $(`.questionnaire li:nth-child(${index}) input[type=text]`).focus()
    } catch { }

    $$("input[type=text]").forEach(element => {
        element.addEventListener("input", () => {
            save_answer("text", element, index)

            // Enable the next button if the input field value is valid.
            validate(index)
        })

        element.addEventListener("keypress", (event) => {
            // Click on the next button if the enter button is pressed.
            if (event.key == "Enter") {
                $$(".next_button")[index - 1].click()
            }
        })
    })

    $$("input[type=radio]").forEach(element => {
        element.addEventListener("change", () => {
            save_answer("radio", element, index)

            // Enable the next button if the input field value is valid.
            validate(index)
        })
    })

    $$("input[type=checkbox]").forEach(element => {
        element.addEventListener("change", () => {
            save_answer("checkbox", element, index)

            // Enable the next button if the input field value is valid.
            validate(index)
        })
    })

    $$(".next_button").forEach(element => {
        element.addEventListener("click", () => {
            // Show the next question if the input field value is valid.
            if (validate(index) == true) {
                index = update_view(index, "next")

                // Focus on the input field, if there is any.
                try {
                    $(`.questionnaire li:nth-child(${index}) input[type=text]`).focus()
                } catch { }

                // Enable the next button if the input field value is valid.
                validate(index)
            }
        })
    })

    $$(".prev_button").forEach(element => {
        element.addEventListener("click", () => {
            index = update_view(index, "previous")

            // Focus on the input field, if there is any.
            try {
                $(`.questionnaire li:nth-child(${index}) input[type=text]`).focus()
            } catch { }

            // Enable the next button if the input field value is valid.
            validate(index)
        })
    })
}
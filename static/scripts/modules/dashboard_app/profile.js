import $ from "../$.js"
import $$ from "../$$.js"

export default function profile() {
    let values = []
    let changed = []

    $$("input[type=text]").forEach((element, index) => {
        // Add the default values to the values array.
        values.push(element.value)

        element.addEventListener("input", () => {
            // Check if the current value is different from the default one.
            if (element.value != values[index]) {
                // Add the changed value to the changed array
                changed[index] = element.value

                // Show a different colored border and outline.
                element.classList.add("changed")
            } else {
                // Remove the value from the changed array.
                changed.splice(index, 1)

                // Remove the different colored border and outline.
                element.classList.remove("changed")
            }
        })
    })

    $("button").addEventListener("click", () => {
        // Post the changed questionnaire response to the API (yet to implement).
        console.log(changed)

        // Empty the changed array.
        changed = []

        $$("input[type=text]").forEach(element => {
            // Remove the different colored border and outline.
            element.classList.remove("changed")
        })
    })
}
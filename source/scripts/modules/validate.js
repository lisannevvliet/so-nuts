export default function validate(index) {
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

    // Enable the next button if the input field value is valid.
    if (valid == true) {
        $$(".next_button")[index - 1].disabled = false
    } else {
        $$(".next_button")[index - 1].disabled = true
    }

    return valid
}
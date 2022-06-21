module.exports = {
    responses: (answers) => {
        let questionResponses = []

        // Prevent the server from crashing when none of the answers are filled in.
        if (Object.entries(answers).length > 0) {
            for (let [key, value] of Object.entries(JSON.parse(answers))) {
                if (key.endsWith("_checkbox")) {
                    let duplicate = false
                    key = key.substring(0, key.indexOf("_checkbox"))

                    questionResponses.forEach(element => {
                        // Check if the key already exists in the object.
                        if (key == element.questionId) {
                            duplicate = true
                            // Add the choice option IDs to the object.
                            element.choiceOptionIds = value
                        }
                    })

                    // Add the question response to the array if it is not a duplicate.
                    if (!duplicate) {
                        questionResponses.push({
                            "questionId": key,
                            "choiceOptionIds": value
                        })
                    }
                } else if (key.endsWith("_text")) {
                    let duplicate = false
                    key = key.substring(0, key.indexOf("_text"))

                    questionResponses.forEach(element => {
                        // Check if the key already exists in the object.
                        if (key == element.questionId) {
                            duplicate = true
                            // Add the response to the object.
                            element.response = value
                        }
                    })

                    // Add the question response to the array if it is not a duplicate.
                    if (!duplicate) {
                        questionResponses.push({
                            "questionId": key,
                            "response": value
                        })
                    }
                } else {
                    // Add the question response to the array.
                    if (typeof value == "string") {
                        questionResponses.push({
                            "questionId": key,
                            "response": value
                        })
                    } else {
                        questionResponses.push({
                            "questionId": key,
                            "choiceOptionIds": value
                        })
                    }
                }
            }
        }

        return questionResponses
    }
}
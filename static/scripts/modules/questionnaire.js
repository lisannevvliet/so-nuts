import $ from "./$.js"
import $$ from "./$$.js"
import update_view from "./update_view.js"
import { load_answers, save_answer, get_answers } from "./answers.js"

export default function questionnaire() {
    let questionnaire_index = 1

    // Retrieve the index from localStorage and check if it is not greater than the amount of questions.
    if (localStorage.getItem("index") && localStorage.getItem("index") <= $("#amount_of_questions").textContent) {
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
            // Hide the previous question.
            $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")

            // Increase and save the index in localStorage.
            localStorage.setItem("index", ++questionnaire_index)

            // Check if the questionnaire is complete.
            if (questionnaire_index > $("#amount_of_questions").textContent) {
                let questionResponses = []

                for (let [key, value] of Object.entries(get_answers())) {
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

                        // Add the question reponse to the array if it is not a duplicate.
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
                                // Add the reponse to the object.
                                element.reponse = value
                            }
                        })

                        // Add the question reponse to the array if it is not a duplicate.
                        if (!duplicate) {
                            questionResponses.push({
                                "questionId": key,
                                "reponse": value
                            })
                        }
                    } else {
                        // Add the question reponse to the array.
                        if (typeof value == "string") {
                            questionResponses.push({
                                "questionId": key,
                                "reponse": value
                            })
                        } else {
                            questionResponses.push({
                                "questionId": key,
                                "choiceOptionIds": value
                            })
                        }
                    }
                }

                fetch("/api/QuestionnaireResponses", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "id": "string",
                        "questionnaireId": "2",
                        "participantId": "1",
                        "questionResponses": questionResponses
                    })
                })
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        console.log(data)

                        // Redirect to the dashboard page.
                        window.location.href = "/dashboard"
                    })
                    .catch(error => {
                        console.error(error)
                    })
            } else {
                // Show the next question.
                $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
                update_view(questionnaire_index)
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
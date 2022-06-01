import $ from "./$.js"
import $$ from "./$$.js"
import update_view from "./update_view.js"
import { save_answer } from "./answers.js"

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

    $(".next_button").addEventListener("click", () => {
        // Hide the previous question.
        $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")

        // Increase and save the index in localStorage.
        localStorage.setItem("index", ++questionnaire_index)

        // If the onboarding is complete, redirect to the dashboard.
        if (questionnaire_index > $("#amount_of_questions").textContent) {
            window.location.href = "/dashboard"
        } else {
            // Show the next question.
            $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
            update_view(questionnaire_index)
        }
    })

    $(".prev_button").addEventListener("click", () => {
        // Hide the previous question.
        $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")

        // Decrease and save the index in localStorage.
        localStorage.setItem("index", --questionnaire_index)

        // Show the next question.
        $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
        update_view(questionnaire_index)
    })
}
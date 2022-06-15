import $ from "./$.js"
import $$ from "./$$.js"

export default function login() {
    $("#register").addEventListener("click", () => {
        // Redirect to the questionnaire page.
        window.location.href = "/questionnaire"
    })

    $("#login").addEventListener("click", () => {
        // Redirect to the goals page.
        window.location.href = "/"
    })
}
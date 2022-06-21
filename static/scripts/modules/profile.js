import $ from "./$.js"
import $$ from "./$$.js"

export default function profile() {

    // $(".checkmark_test").addEventListener("click", () => {
    //     // Show the check animation
    //     $(".checkmark_test").classList.add("checkmark_animation")
    //     $(".checkmark_check_test").classList.add("checkmark_check_animation")
    //     // $("li").classList.add("confetti")
    // })

    // if complete {
    // $("confetti_container").classList.remove("hide_state")
    // }

    $(".see_answers").addEventListener("click", () => {
        // Show the popup
        $(".questionnaire_answers").classList.remove("hide_state")
        $(".questionnaire_answers").classList.add("show_popup")
    })

    $(".close_popup").addEventListener("click", () => {
        // Hide the pop-up.
        $(".questionnaire_answers").classList.remove("show_popup")
        $(".questionnaire_answers").classList.add("hide_state")
    })

    $(".previous_url").addEventListener("click", () => {
        // Go back to goals/ previous personalized url. 
        history.back()
    })
}
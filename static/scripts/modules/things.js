import $ from "./$.js"
import $$ from "./$$.js"

export default function things() {

    $(".checkmark_test").addEventListener("click", () => {
        // Show the check animation
        $(".checkmark_test").classList.add("checkmark_animation")
        $(".checkmark_check_test").classList.add("checkmark_check_animation")
        // $("li").classList.add("confetti")
    })

    // if complete {
    // $("confetti_container").classList.remove("hide_state")
    // }

}
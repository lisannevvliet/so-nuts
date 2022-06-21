import $ from "./$.js"
import $$ from "./$$.js"

export default function new_goals() {
    $("#name").value = "Lisanne"
    $("#email").value = "lisannevanvliet@mail.com"

    $("#add").addEventListener("click", () => {
        // Show the pop-up.
        $("form").classList.add("show_popup")
    })

    $(".close_popup").addEventListener("click", () => {
        // Hide the pop-up.
        $("form").classList.remove("show_popup")
    })
}
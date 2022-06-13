import $ from "./$.js"
import $$ from "./$$.js"

export default function create_goal_popup() {

    // After clicking on the round button with "+" to add a goal it shows the popup.
    function show_popup() {
        $("form").classList.add("show_popup")
    }

    // After toggling a specific goal on you can see the inputs to customize this goal to your own liking.
    function show_extra_inputs() {
        let check = $('input[type="checkbox"]')

        if (check.checked == true) {
            // TO-DO: Make it the corresponding article for each of the checkboxes. 
            // $("article").forEach((article, index) => {
            $("article").classList.add("show_extra")
            // })
        } else {
            // $("article").forEach((article, index) => {
            $("article").classList.remove("show_extra")
            // })
        }
    }

    $("h3").addEventListener("click", show_extra_inputs)
    $("button").addEventListener("click", show_popup)
}

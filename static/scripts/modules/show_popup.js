import $ from "./$.js"
import $$ from "./$$.js"

export default function create_goal_popup() {

    function show_popup() {
        $("form").classList.add("show_popup")
    }

    function show_extra_inputs() {
        let check = $('input[type="checkbox"]')

        if (check.checked == true) {
            $("article").classList.add("show_extra")
        } else {
            $("article").classList.remove("show_extra")
        }
    }

    // function show_extra_inputs() {
    //     $("article").classList.add("show_extra")
    // }
    $("h3").addEventListener("click", show_extra_inputs)
    $("button").addEventListener("click", show_popup)

}

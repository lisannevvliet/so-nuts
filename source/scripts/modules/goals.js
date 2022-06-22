export default function goals() {
    // Get the URL parameters.
    const parameters = new URLSearchParams(window.location.search)

    // Fill the hidden input fields with the URL parameter values.
    $$(".name").forEach(element => {
        element.value = parameters.get("name")
    })

    $$(".email").forEach(element => {
        element.value = parameters.get("email")
    })

    // Clear the localStorage.
    localStorage.clear()

    $("#add").addEventListener("click", () => {
        // Show the pop-up.
        $(".add_goal").classList.add("show_popup")
    })

    $(".close_popup").addEventListener("click", () => {
        // Hide the pop-up.
        $(".add_goal").classList.remove("show_popup")
    })

    $$(".checkmark").forEach((element, index) => {
        // Show the check animation.
        $$(".checkmark")[index].classList.add("checkmark_click_animation")

        // Check if the streak is 21.
        if ($$(".repetition_change")[index].textContent == 21) {
            $$(".checkmark_plus")[index].classList.add("hide_plus")
            $$(".checkmark_check_icon")[index].classList.add("checkmark_check_icon_animation")
        }

        element.addEventListener("click", () => {
            // Submit the hidden form.
            $$(".increase_streak")[index].submit()
        })

        // Fill in the progress bar.
        $$("#progress div")[index].style.width = $$(".repetition_change")[index].textContent * 100 / 21 + "%"
    })

    $$(".three_dots").forEach((element, index) => {
        element.addEventListener("click", () => {
            $$(".dots_content")[index].classList.add("show_state")
        })
    })
}
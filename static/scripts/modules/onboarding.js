import $ from "./$.js"

export default function onboarding() {
    // Check if the onboarding has already been completed in localStorage.
    if (!localStorage.getItem("onboarding")) {
        let onboarding_index = 1

        $(".next_button").addEventListener("click", () => {
            // Check if the last page is not displayed.
            if (onboarding_index < 3) {
                // Hide the previous question.
                $(`.onboarding li:nth-child(${onboarding_index})`).classList.remove("show_element")
                // Increase the index.
                onboarding_index++
                // Show the next question.
                $(`.onboarding li:nth-child(${onboarding_index})`).classList.add("show_element")

                // Change the next button text in the last page.
                if (onboarding_index == 3) {
                    $(".next_button").textContent = "Vragenlijst"
                }
            // If the last page is displayed and the button is clicked, redirect to the questionnaire and save the completion in localStorage.
            } else {
                window.location.href = "/questionnaire"
                localStorage.setItem("onboarding", "Completed")
            }
        })
    // If the onboarding has already been completed, redirect to the questionnaire.
    } else {
        window.location.href = "/questionnaire"
    }
}
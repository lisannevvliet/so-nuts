// import $$ from "./$$.js"

export default function navigation() {
    // function active_link() {
    //     $$(".list").forEach((item) =>
    //         item.classList.remove("active"))
    //     this.classList.add("active")
    // }

    // $$(".list").forEach((item) =>
    //     item.addEventListener("click", active_link))

    // Check if the onboarding and questionnaire have already been completed in localStorage. If not, redirect to the corresponding page.
    if (!localStorage.getItem("onboarding")) {
        window.location.href = "/onboarding"
    } else if (!localStorage.getItem("questionnaire")) {
        window.location.href = "/questionnaire"
    }
}
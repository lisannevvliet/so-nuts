// Return the Element object of the corresponding element.
function $(element) {
    return document.querySelector(element)
}

// ===========
// onboarding (module later)
// ===========

let onboardingIndex = 1; // start positie

const onboardingNext = $(`.next_button`)

onboardingNext.addEventListener("click", function(){
 if (onboardingIndex == 3) {
    // Go to different route but idk how in clientside javascript.
    onboardingNext.classList.add("disable_button")
 }
 else {
    $(`ol>li:nth-child(${onboardingIndex})`).classList.remove("show_li")
    onboardingIndex++
    $(`ol>li:nth-child(${onboardingIndex})`).classList.add("show_li")
 }
})




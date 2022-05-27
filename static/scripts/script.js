// Return the Element object of the corresponding element.
function $(element) {
    return document.querySelector(element)
}

// ==============
// progress steps
// ==============

// Start position questionnaire.
let questionnaireIndex = 1; 

const questionnaireNext = $(`.next_button`)
// 

$(".questionnaire li:nth-child(1)").classList.add("show_element")

questionnaireNext.addEventListener("click", function(){
 if (questionnaireIndex == 6) {
    // Go to different route but idk how in clientside javascript.
    questionnaireNext.classList.add("disable_button")
 }
 else {
    $(`.questionnaire li:nth-child(${questionnaireIndex})`).classList.remove("show_element")
    questionnaireIndex++
   //  TO-DO: a counter for the corresponding question number.
    $(`.questionnaire li:nth-child(${questionnaireIndex})`).classList.add("show_element")
 }
})

//  TO-DO: make the previous button work, maybe add a skip option & implement local storage the onboarding and questionnaire so only new users get to see it.

// ===========
// onboarding (module later)
// ===========

// Start position onboarding.
let onboardingIndex = 1; 

const onboardingNext = $(`.next_button`)

onboardingNext.addEventListener("click", function(){
 if (onboardingIndex == 3) {
    // Go to different route but idk how in clientside javascript.
    onboardingNext.classList.add("disable_button")
 }
 else {
    $(`ol>li:nth-child(${onboardingIndex})`).classList.remove("show_element")
    onboardingIndex++
    $(`ol>li:nth-child(${onboardingIndex})`).classList.add("show_element")
 }
})




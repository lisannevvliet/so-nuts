// Return the Element object of the corresponding element.
function $(element) {
    return document.querySelector(element)
}

// ===========
// onboarding (module later)
// ===========

// Start position onboarding.
let onboarding_index = 1; 

const onboarding_next = $(`.next_button`)

onboarding_next.addEventListener("click", function(){
 if (onboarding_index == 3) {
    // TO-DO: fix the fact that it only changes it to vragenlijst after click.
   $(".next_button").innerHTML = "Vragenlijst";
   window.location.href = "/";
 }
 else {
    $(`.onboarding li:nth-child(${onboarding_index})`).classList.remove("show_element")
    onboarding_index++
    $(`.onboarding li:nth-child(${onboarding_index})`).classList.add("show_element")
 }
})


// ==============
// progress steps
// ==============

// Start position questionnaire.
let questionnaire_index = 1; 

const questionnaire_next = $(`.next_button`)
const questionnaire_prev = $(`.prev_button`)

$(".questionnaire li:nth-child(1)").classList.add("show_element")

questionnaire_next.addEventListener("click", function(){
 if (questionnaire_index == 6) {
    questionnaire_next.classList.add("disable_button")
 }
 else {
    $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
    questionnaire_index++
   //  TO-DO: a counter for the corresponding question number.
    $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
 }
})

questionnaire_prev.addEventListener("click", function(){
   if (questionnaire_index == 6) {
      questionnaire_next.classList.add("disable_button")
   }
   else { 
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
      questionnaire_index--
     //  TO-DO: a counter for the corresponding question number.
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
      }
  })


//  TO-DO: make the previous button work, maybe add a skip option & implement local storage the onboarding and questionnaire so only new users get to see it.



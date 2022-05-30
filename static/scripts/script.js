// Return the Element object of the corresponding element.
function $(element) {
    return document.querySelector(element)
}

// ===========
// onboarding (module later)
// ===========

if ($(".onboarding")) {
   // Start position onboarding.
   let onboarding_index = 1

   $(".next_button").addEventListener("click", () => {
      if (onboarding_index < 3) {
         $(`.onboarding li:nth-child(${onboarding_index})`).classList.remove("show_element")
         onboarding_index++
         $(`.onboarding li:nth-child(${onboarding_index})`).classList.add("show_element")

         if (onboarding_index == 3) {
            $(".next_button").innerHTML = "Vragenlijst"
         }
      } else {
         window.location.href = "/questionnaire"
      }
   })
}


// ==================
// question multistep
// ================== 

if ($(".questionnaire")) {
   // Start position questionnaire.
   let questionnaire_index = 1

   let counter_display = $(`.counter_display`)
   const questionnaire_next = $(`.next_button`)
   const questionnaire_prev = $(`.prev_button`)

   $(".questionnaire li:nth-child(1)").classList.add("show_element")
   update_display()

   questionnaire_next.addEventListener("click", function(){
   if (questionnaire_index == 6) {
      questionnaire_next.classList.add("disable_button")
   }
   else {
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
      questionnaire_index++
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
      update_display()
      //  console.log(questionnaire_index)
      }
   })

   questionnaire_prev.addEventListener("click", function(){
      if (questionnaire_index == 6) {
         questionnaire_next.classList.add("disable_button")
      }
      else { 
         $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
         questionnaire_index--
         update_display()
         $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
         
      }
   })


   function update_display(){
      counter_display.innerHTML = questionnaire_index
   }
}
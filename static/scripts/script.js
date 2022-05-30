// Return the Element object of the corresponding element.
function $(element) {
   return document.querySelector(element)
}

// ===========
// onboarding (module later)
// ===========

if ($(".onboarding")) {
   if (!localStorage.getItem("onboarding")) {
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
            localStorage.setItem("onboarding", "Completed")
         }
      })
   } else {
      window.location.href = "/questionnaire"
   }
}

// ==================
// question multistep
// ================== 

if ($(".questionnaire")) {
   // Start position questionnaire.
   let questionnaire_index = 1

   $(".questionnaire li:nth-child(1)").classList.add("show_element")
   update_buttons()

   $(".next_button").addEventListener("click", function() {
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
      questionnaire_index++
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
      update_buttons()
   })

   $(".prev_button").addEventListener("click", function() {
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
      questionnaire_index--
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
      update_buttons()
   })

   function update_buttons() {
      if (questionnaire_index == 1) {
         $(".prev_button").classList.add("disable_button")
      } else {
         $(".prev_button").classList.remove("disable_button")
      }

      if (questionnaire_index == $(".question_counter").textContent.substring($(".question_counter").textContent.indexOf("/") + 1, $(".question_counter").textContent.length)) {
         $(".next_button").classList.add("disable_button")
      } else {
         $(".next_button").classList.remove("disable_button")
      }
   }
}
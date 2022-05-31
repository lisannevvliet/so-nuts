import $ from "./modules/$.js"

// ===========
// onboarding (module later)
// ===========

// Check if the onboarding is currently displayed.
if ($(".onboarding")) {
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

            // If the last page is displayed, change the value of the button.
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

// ==================
// question multistep
// ================== 

// Check if the questionnaire is currently displayed.
if ($(".questionnaire")) {
   let questionnaire_index = 1
   let answers = { }

   document.querySelectorAll("input[type=text]").forEach(element => {
      element.addEventListener("input", () => {
         // Check if there are checkboxes within the same question and save the values in localStorage.
         if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
            // Add "_text" to prevent overwriting the checkboxes with the textfield.
            answers[questionnaire_index + "_text"] = element.value
            localStorage.setItem("answers", JSON.stringify(answers))
         } else {
            answers[questionnaire_index] = element.value
            localStorage.setItem("answers", JSON.stringify(answers))
         }
      })
   })

   document.querySelectorAll("input[type=radio]").forEach(element => {
      element.addEventListener("change", () => {
         // Save the value in localStorage.
         answers[questionnaire_index] = element.value
         localStorage.setItem("answers", JSON.stringify(answers))
      })
   })

   document.querySelectorAll("input[type=checkbox]").forEach(element => {
      element.addEventListener("change", () => {
         let checked = []

         // Add all checked checkboxes to an array.
         document.querySelectorAll(`input[type=checkbox][name=${element.name}]:checked`).forEach(element => {
            checked.push(element.value)
         })

         // Check if there is a textfield within the same question and save the value in localStorage.
         if ($(`#question_${questionnaire_index} input[type=text]`)) {
            // Add "_checkbox" to prevent overwriting the textfield with the checkboxes.
            answers[questionnaire_index + "_checkbox"] = checked
            localStorage.setItem("answers", JSON.stringify(answers))
         } else {
            answers[questionnaire_index] = checked
            localStorage.setItem("answers", JSON.stringify(answers))
         }
      })
   })

   // Retrieve the current question from localStorage.
   if (localStorage.getItem("progress")) {
      questionnaire_index = localStorage.getItem("progress")
   }

   // Show the first question or the one saved in localStorage.
   $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
   update_display()

   $(".next_button").addEventListener("click", () => {
      // Hide the previous question.
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
      // Increase the index.
      questionnaire_index++
      // Show the next question.
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
      update_display()
   })

   $(".prev_button").addEventListener("click", () => {
      // Hide the previous question.
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.remove("show_element")
      // Decrease the index.
      questionnaire_index--
      // Show the next question.
      $(`.questionnaire li:nth-child(${questionnaire_index})`).classList.add("show_element")
      update_display()
   })

   function update_display() {
      // Hide the previous button for the first question.
      if (questionnaire_index == 1) {
         $(".prev_button").classList.add("hide_button")
      } else {
         $(".prev_button").classList.remove("hide_button")
      }

      var amount_of_questions = $(".question_counter").textContent.substring($(".question_counter").textContent.indexOf("/") + 1, $(".question_counter").textContent.length)

      // Hide the next button for the last question.
      if (questionnaire_index == amount_of_questions) {
         $(".next_button").classList.add("hide_button")
      } else {
         $(".next_button").classList.remove("hide_button")
      }

      // Save the current question in localStorage.
      localStorage.setItem("progress", questionnaire_index)

      // Check if there are any answers stored in localStorage.
      if (localStorage.getItem("answers")) {
         answers = JSON.parse(localStorage.getItem("answers"))

         // Check if there is both a textfield and checkboxes within the same question.
         if ($(`#question_${questionnaire_index} input[type=text]`) && $(`#question_${questionnaire_index} input[type=checkbox]`)) {
            // Check if the stored value is not empty.
            if (answers[questionnaire_index + "_text"] != undefined) {
               // Fill in the stored value in the textfield.
               $(`#question_${questionnaire_index} input[type=text]`).value = answers[questionnaire_index + "_text"]
            }

            // Check if the stored value is not empty.
            if (answers[questionnaire_index + "_checkbox"] != undefined) {
               document.querySelectorAll(`#question_${questionnaire_index} input[type=checkbox]`).forEach(element => {
                  answers[questionnaire_index + "_checkbox"].forEach(checkbox => {
                     // Check the stored checkboxes.
                     if (checkbox == element.id) {
                        element.checked = true
                     }
                  })
               })
            }
         } else {
            // Check if the stored value is not empty.
            if (answers[questionnaire_index] != undefined) {
               if ($(`#question_${questionnaire_index} input[type=text]`)) {
                  // Fill in the stored value in the textfield.
                  $(`#question_${questionnaire_index} input[type=text]`).value = answers[questionnaire_index]
               } else if ($(`#question_${questionnaire_index} input[type=radio]`)) {
                  // Check the stored radio button.
                  $(`#${answers[questionnaire_index]}`).checked = true
               } else if ($(`#question_${questionnaire_index} input[type=checkbox]`)) {
                  document.querySelectorAll(`#question_${questionnaire_index} input[type=checkbox]`).forEach(element => {
                     answers[questionnaire_index].forEach(checkbox => {
                        // Check the stored checkboxes.
                        if (checkbox == element.id) {
                           element.checked = true
                        }
                     })
                  })
               }
            }
         }
      }
   }
}
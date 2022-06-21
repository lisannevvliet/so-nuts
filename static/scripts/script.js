import $ from "./modules/$.js"
import onboarding from "./modules/onboarding.js"
import questionnaire from "./modules/questionnaire.js"
// import goals from "./modules/goals.js"
import new_goals from "./modules/new_goals.js"

// Check if the onboarding page is currently displayed.
if ($(".onboarding")) {
    onboarding()
}

// Check if the questionnaire page is currently displayed.
if ($(".questionnaire")) {
    questionnaire()
}

// Check if the goals page is currently displayed.
if ($(".goals_page")) {
    // goals()
    new_goals()
}

// // Check if the profile page is currently displayed.
// if ($(".profile")) {
//     things()
// }
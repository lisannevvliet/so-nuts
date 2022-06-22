import $ from "./modules/$.js"
import questionnaire from "./modules/questionnaire.js"
import goals from "./modules/goals.js"
import profile from "./modules/profile.js"

// Check if the questionnaire page is currently displayed.
if ($(".questionnaire")) {
    questionnaire()
}

// Check if the goals page is currently displayed.
if ($(".goals_page")) {
    goals()
}

// Check if the profile page is currently displayed.
if ($(".profile")) {
    profile()
}
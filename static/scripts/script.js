import $ from "./modules/$.js"
import onboarding from "./modules/onboarding.js"
import questionnaire from "./modules/questionnaire.js"
import navigation from "./modules/navigation.js"
import goals from "./modules/goals.js"

// Check if the onboarding page is currently displayed.
if ($(".onboarding")) {
    onboarding()
}

// Check if the questionnaire page is currently displayed.
if ($(".questionnaire")) {
    questionnaire()
}

// Check if the dashboard page is currently displayed.
if ($("nav")) {
    navigation()
}

// Check if the goals page is currently displayed.
if ($(".goals_page")) {
    goals()
}
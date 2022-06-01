import $ from "./modules/$.js"
import onboarding from "./modules/onboarding.js"
import questionnaire from "./modules/questionnaire.js"
import dashboard from "./modules/dashboard.js"

// Check if the onboarding is currently displayed.
if ($(".onboarding")) {
    onboarding()
}

// Check if the questionnaire is currently displayed.
if ($(".questionnaire")) {
    questionnaire()
}

// Check if the dashboard is currently displayed.
if ($(".dashboard")) {
    dashboard()
}
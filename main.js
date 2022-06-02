// Import Dotenv.
require("dotenv").config()
// Import Express.
const express = require("express")
// Import Handlebars.
const handlebars = require("express-handlebars")
// Import node-fetch.
const fetch = require("node-fetch")
// Import JSON files.
let questionnaire = require("./static/json/questionnaire.json")
let questionnaireResponse = require("./static/json/questionnaireResponse.json")

// Initialise Express.
const app = express()

// Render static files.
app.use(express.static("static"))

// Set the view engine to Handlebars and import the helpers.
app.engine("handlebars", handlebars.engine({
    helpers: require("./helpers")
}))
app.set("view engine", "handlebars")

// Set and log the port for Express.
app.listen(process.env.PORT, () => {
    console.log(`Express running at http://localhost:${process.env.PORT}.`)
})

// Listen to all GET requests on /.
app.get("/", (_req, res) => {
    // Load the onboarding page with the stylesheet.
    res.render("onboarding", {
        style: "onboarding.css"
    })
})

// Listen to all GET requests on /questionnaire.
app.get("/questionnaire", async function (_req, res) {
    // To use the local JSON, comment out the code below or disable the client's internet connection.
    // Try to get the questionnaire from the API. If it fails, use the local JSON.
    try {
        const response = await fetch("https://fhir.mibplatform.nl/api/Questionnaires/2")
        questionnaire = await response.json()
    } catch { }

    // Load the questionnaire page with the questionnaire and stylesheet.
    res.render("questionnaire", {
        questionnaire: questionnaire.questions,
        style: "questionnaire.css"
    })
})

// Listen to all GET requests on /dashboard.
app.get("/dashboard", (_req, res) => {
    // Load the dashboard page with the stylesheet.
    res.render("dashboard", {
        style: "dashboard_app/dashboard.css"
    })
})

// Listen to all GET requests on /dashboard.
app.get("/fitness", (_req, res) => {
    // Load the dashboard page with the stylesheet.
    res.render("fitness", {
        style: "/dashboard_app/fitness.css"
    })
})

// Listen to all GET requests on /dashboard.
app.get("/food", (_req, res) => {
    // Load the dashboard page with the stylesheet.
    res.render("food", {
        style: "/dashboard_app/food.css"
    })
})


// Listen to all GET requests on /profile.
app.get("/profile", async function (_req, res) {
    // To use the local JSON, comment out the two blocks of code below or disable the client's internet connection.
    // Try to get the questionnaire from the API. If it fails, use the local JSON.
    try {
        let response = await fetch("https://fhir.mibplatform.nl/api/Questionnaires/2")
        questionnaire = await response.json()
    } catch { }

    // Try to get the questionnaire response from the API. If it fails, use the local JSON.
    try {
        response = await fetch("https://fhir.mibplatform.nl/api/QuestionnaireResponses/3")
        questionnaireResponse = await response.json()
    } catch { }

    // Load the profile page with the questionnaire, questionnaire response and stylesheet.
    res.render("profile", {
        questionnaire: questionnaire.questions,
        questionnaireResponse: questionnaireResponse.questionResponses,
        style: "/dashboard_app/dashboard.css"
    })
})
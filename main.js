// Import Dotenv.
require("dotenv").config()
// Import Express.
const express = require('express')
// Import Handlebars.
const handlebars = require("express-handlebars")
// Import node-fetch.
const fetch = require("node-fetch")
// Disable SSL validation.
const https = require("https")
const agent = new https.Agent({
    rejectUnauthorized: false,
})
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
    res.render("onboarding", {
        style: "onboarding.css"
    })
})

// Listen to all GET requests on /questionnaire.
app.get("/questionnaire", async function (_req, res) {
    // To use the old questionnaire, remove the two blocks of code below.
    // Get the questionnaire from the API.
    let response = await fetch("https://mibplatform.nl:5001/api/Questionnaires/2", {
        agent: agent
    })
    questionnaire = await response.json()

    // Get the questionnaire response from the API.
    response = await fetch("https://mibplatform.nl:5001/api/QuestionnaireResponses/3", {
        agent: agent
    })
    questionnaireResponse = await response.json()

	// Load the index page with the questionnaires.
    res.render("questionnaires", {
        style: "questionnaire.css",
        questionnaire: questionnaire.questions,
        questionnaireResponse: questionnaireResponse.questionResponses
    })
})

// Listen to all GET requests on /.
app.get("/dashboard", (_req, res) => {
    res.render("dashboard", {
        style: "dashboard.css"
    })
})
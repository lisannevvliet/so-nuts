// Import Dotenv.
require("dotenv").config()
// Import Express.
const express = require('express')
// Import Handlebars.
const handlebars = require("express-handlebars")
// Import node-fetch.
const fetch = require("node-fetch")
// Import JSON files.
// const json = require("./static/json/mib-swagger.json")
const questionnaire = require("./static/json/questionnaire.json")
const questionnaireResponse = require("./static/json/questionnaireResponse.json")

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
    // Get the data from the API.
    // const response = await fetch(url)
    // const data = await response.json()

	// Load the index page with the questionnaires.
    res.render("questionnaires", {
        style: "questionnaire.css",
        questionnaires: questionnaire.questions,
        questionnaireResponse: questionnaireResponse.questionResponses
    })
})
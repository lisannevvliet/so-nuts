// Import Dotenv.
require("dotenv").config()
// Import Express.
const express = require("express")
// Import Handlebars.
const handlebars = require("express-handlebars")
// Import node-fetch.
const fetch = require("node-fetch")
// Import fs (file system).
const fs = require("fs")

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
app.get("/questionnaire", (_req, res) => {
    get("questionnaire", "Questionnaires/2")
        .then(questionnaire => {
            // Check if the file exists.
            if (questionnaire != undefined) {
                // Load the questionnaire page with the questionnaire and stylesheet.
                res.render("questionnaire", {
                    questionnaire: questionnaire.questions,
                    style: "questionnaire.css"
                })
            }
        })
})

// Listen to all GET requests on /dashboard.
app.get("/dashboard", (_req, res) => {
    // Load the dashboard page with the stylesheet.
    res.render("dashboard", {
        style: "dashboard.css"
    })
})

// Listen to all GET requests on /dashboard.
app.get("/fitness", (_req, res) => {
    // Load the fitness page with the stylesheet.
    res.render("fitness", {
        style: "dashboard.css"
    })
})

// Listen to all GET requests on /dashboard.
app.get("/food", (_req, res) => {
    get("domains", "Domains")
        .then(domains => {
            get("food_goals", "Goals?domainId=voeding")
                .then(food_goals => {
                    // Check if the files exist.
                    if (domains != undefined && food_goals != undefined) {
                        // Load the food page with the domains, food goals and stylesheet.
                        res.render("food", {
                            domains: domains,
                            food_goals: food_goals,
                            style: "dashboard.css"
                        })
                    }
                })
        })
})

// Listen to all GET requests on /profile.
app.get("/profile", (_req, res) => {
    get("questionnaire", "Questionnaires/2")
        .then(questionnaire => {
            get("questionnaire_response", "QuestionnaireResponses/3")
                .then(questionnaire_response => {
                    // Check if the files exist.
                    if (questionnaire != undefined && questionnaire_response != undefined) {
                        // Load the profile page with the questionnaire, questionnaire response and stylesheet.
                        res.render("profile", {
                            questionnaire: questionnaire.questions,
                            questionnaire_response: questionnaire_response.questionResponses,
                            style: "dashboard.css"
                        })
                    }
                })
        })
})

// Listen to all GET requests on /goals.
app.get("/goals", (_req, res) => {
    get("food_goals", "Goals?domainId=voeding")
        .then(food_goals => {
            // Check if the file exists.
            if (food_goals != undefined) {
                // Load the goals page with the stylesheet.
                res.render("goals", {
                    food_goals: food_goals,
                    style: "goals.css"
                })
            }
        })
})

async function get(name, url) {
    // Try to get the data from the API. If it fails, use the JSON.
    try {
        // To use the JSON, comment out this line of code.
        const response = await fetch(`https://fhir.mibplatform.nl/api/${url}`)
        const data = await response.json()

        // Save the most recent data in the JSON.
        fs.writeFileSync(`static/json/${name}.json`, JSON.stringify(data))
    } catch { }

    // Read the JSON with the most recent data available.
    const data = fs.readFileSync(`static/json/${name}.json`)

    // Return the data in a JSON format.
    return JSON.parse(data)
}
// Import Node.js modules.
require("dotenv").config()
const express = require("express")
const handlebars = require("express-handlebars")
const fetch = require("node-fetch")
const fs = require("fs")
const request = require("request")

// Initialise Express.
const app = express()

// Render static files.
app.use(express.static("static"))

// Set the view engine to Handlebars and import the helpers.
app.engine("handlebars", handlebars.engine({
    helpers: require("./helpers")
}))
app.set("view engine", "handlebars")

// Parse incoming requests.
app.use(express.urlencoded({
    extended: true
}))

// Set and log the port for Express.
app.listen(process.env.PORT, () => {
    console.log(`Express running at http://localhost:${process.env.PORT}.`)
})

// Set up a proxy for client-side requests to the API.
app.all("/api/*", (req, res) => {
    req.pipe(request(`https://fhir.mibplatform.nl${req.url}`)).pipe(res)
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
                // Load the questionnaire page with the questionnaire, length and stylesheet.
                res.render("questionnaire", {
                    questionnaire: questionnaire.questions,
                    length: questionnaire.questions.length - 1,
                    style: "questionnaire.css"
                })
            }
        })
})

// Listen to all POST requests on /questionnaire.
app.post("/questionnaire", async function (req, res) {
    let questionResponses = []

    for (let [key, value] of Object.entries(JSON.parse(req.body.answers))) {
        if (key.endsWith("_checkbox")) {
            let duplicate = false
            key = key.substring(0, key.indexOf("_checkbox"))

            questionResponses.forEach(element => {
                // Check if the key already exists in the object.
                if (key == element.questionId) {
                    duplicate = true
                    // Add the choice option IDs to the object.
                    element.choiceOptionIds = value
                }
            })

            // Add the question reponse to the array if it is not a duplicate.
            if (!duplicate) {
                questionResponses.push({
                    "questionId": key,
                    "choiceOptionIds": value
                })
            }
        } else if (key.endsWith("_text")) {
            let duplicate = false
            key = key.substring(0, key.indexOf("_text"))

            questionResponses.forEach(element => {
                // Check if the key already exists in the object.
                if (key == element.questionId) {
                    duplicate = true
                    // Add the reponse to the object.
                    element.reponse = value
                }
            })

            // Add the question reponse to the array if it is not a duplicate.
            if (!duplicate) {
                questionResponses.push({
                    "questionId": key,
                    "reponse": value
                })
            }
        } else {
            // Add the question reponse to the array.
            if (typeof value == "string") {
                questionResponses.push({
                    "questionId": key,
                    "reponse": value
                })
            } else {
                questionResponses.push({
                    "questionId": key,
                    "choiceOptionIds": value
                })
            }
        }
    }

    console.log(questionResponses)

    const response = await fetch("https://fhir.mibplatform.nl/api/QuestionnaireResponses", {
        method: "POST",
        body: JSON.stringify({
            "id": "string",
            "questionnaireId": "2",
            "participantId": "1",
            "questionResponses": questionResponses
        }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
    const data = await response.json()

    console.log(data)

    // Redirect to the dashboard page.
    res.redirect("/dashboard")
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
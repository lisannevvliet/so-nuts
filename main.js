// Import Node.js modules.
require("dotenv").config()
const express = require("express")
const handlebars = require("express-handlebars")

// Import modules.
const modules = require("./modules.js")

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

// Listen to all GET requests on /onboarding.
app.get("/onboarding", (_req, res) => {
    // Load the onboarding page with the stylesheet.
    res.render("onboarding", {
        style: "onboarding.css"
    })
})

// Listen to all GET requests on /questionnaire.
app.get("/questionnaire", (_req, res) => {
    modules.get("questionnaire", "Questionnaires/2")
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

    // Prevent the server from crashing when none of the answers are filled in.
    if (Object.entries(req.body.answers).length > 0) {
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
                        "response": value
                    })
                }
            } else {
                // Add the question reponse to the array.
                if (typeof value == "string") {
                    questionResponses.push({
                        "questionId": key,
                        "response": value
                    })
                } else {
                    questionResponses.push({
                        "questionId": key,
                        "choiceOptionIds": value
                    })
                }
            }
        }
    }

    modules.post(questionResponses).then(data =>
        console.log(data)
    )

    // Redirect to the dashboard page.
    res.redirect("/")
})

// Listen to all GET requests on /.
app.get("/", (_req, res) => {
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
    modules.get("domains", "Domains")
        .then(domains => {
            modules.get("food_goals", "Goals?domainId=voeding")
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
    modules.get("questionnaire", "Questionnaires/2")
        .then(questionnaire => {
            modules.get("questionnaire_response", "QuestionnaireResponses/3")
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
    modules.get("food_goals", "Goals?domainId=voeding")
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
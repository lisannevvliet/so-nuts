// Import Node.js modules.
require("dotenv").config()
const express = require("express")
const handlebars = require("express-handlebars")

// Import modules.
const api = require("./modules/api.js")
const responses = require("./modules/responses.js")
const database = require("./modules/database.js")

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

// Listen to all GET requests on /.
app.get("/", (_req, res) => {
    // Load the login page.
    res.render("login")
})

// Listen to all POST requests on /.
app.post("/", (req, res) => {
    // Check if the user already exists in the database.
    database.read_user(req.body.email)
        .then(user => {
            // If not, create a new user in the database.
            if (user.length == 0) {
                database.insert_user(req.body.email)
                    .then(
                        // Redirect to the onboarding page.
                        res.redirect(`/onboarding?name=${req.body.name}&email=${req.body.email}`)
                    )
            } else {
                // Check if the questionnaire has already been completed.
                if (user.questionnaire == false) {
                    // Redirect to the onboarding page.
                    res.redirect(`/onboarding?name=${req.body.name}&email=${req.body.email}`)
                } else {
                    // Redirect to the goals page.
                    res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
                }
            }
        })
})

// Listen to all GET requests on /onboarding.
app.get("/onboarding", (req, res) => {
    // Load the onboarding page.
    res.render("onboarding", {
        name: req.query.name,
        email: req.query.email
    })
})

// Listen to all GET requests on /questionnaire.
app.get("/questionnaire", (_req, res) => {
    api.get("Questionnaires/2")
        .then(questionnaire => {
            api.get("Domains")
                .then(domains => {
                    // Check if the files exist.
                    if (questionnaire != undefined && domains != undefined) {
                        // Load the questionnaire page with the domains, questionnaire and questionnaire length.
                        res.render("questionnaire", {
                            domains: domains,
                            questionnaire: questionnaire.questions,
                            length: questionnaire.questions.length - 1
                        })
                    }
                })
        })
})

// Listen to all POST requests on /questionnaire.
app.post("/questionnaire", (req, res) => {
    database.update_user(req.body.email, { questionnaire: true })
        .then(
            // Transform the answers to a compatible format and send a POST request with them.
            api.post(responses.responses(req.body.answers))
                .then(
                    // Redirect to the goals page.
                    res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
                )
        )
})

// Listen to all GET requests on /goals.
app.get("/goals", (req, res) => {
    // Get the goals from the database.
    database.read_goals()
        .then(goals => {
            // Get the user goals from the database.
            database.read_user_goals(req.query.email)
                .then(user_goals => {
                    // Load the goals page with the name, whether the name ends with an s, user goals and goals.
                    res.render("goals", {
                        name: req.query.name,
                        s: req.query.name.slice(-1) == "s" || req.query.name.slice(-1) == "S",
                        user_goals: user_goals,
                        goals: goals
                    })
                })
        })
})

// Listen to all POST requests on /increase_streak.
app.post("/increase_streak", (req, res) => {
    // Check if the increased streak is not bigger than 21.
    if (parseInt(req.body.streak) + 1 <= 21) {
        // Increase the streak by one.
        database.update_user_goal(req.body.id, { streak: parseInt(req.body.streak) + 1 })
            .then(
                // Redirect to the goals page.
                res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
            )
    } else {
        // Redirect to the goals page.
        res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
    }
})

// Listen to all POST requests on /increase_streak.
app.post("/delete_user_goal", (req, res) => {
    database.remove_user_goal(req.body.id)
        .then(
            // Redirect to the goals page.
            res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
        )
})

// Listen to all POST requests on /add_goals.
app.post("/add_goals", (req, res) => {
    if (Array.isArray(req.body.goal)) {
        req.body.goal.forEach((goal, index) => {
            database.add_user_goal(req.body.email, goal)
                .then(() => {
                    // Check if the last goal has been added.
                    if (index == req.body.goal.length - 1) {
                        // Redirect to the goals page.
                        res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
                    }
                })
        })
    } else {
        database.add_user_goal(req.body.email, req.body.goal)
            .then(
                // Redirect to the goals page.
                res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
            )
    }
})

// Listen to all GET requests on /profile.
app.get("/profile", (_req, res) => {
    api.get("Questionnaires/2")
        .then(questionnaire => {
            api.get("QuestionnaireResponses/3")
                .then(questionnaire_response => {
                    // Check if the files exist.
                    if (questionnaire != undefined && questionnaire_response != undefined) {
                        // Get ZenQuotes' daily quote.
                        api.quote()
                            .then(quote => {
                                // Load the profile page with the quote, questionnaire and questionnaire response.
                                res.render("profile", {
                                    quote: quote,
                                    questionnaire: questionnaire.questions,
                                    questionnaire_response: questionnaire_response.questionResponses
                                })
                            })
                    }
                })
        })
})
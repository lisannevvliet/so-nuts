// Import Express.
const express = require("express")

// Import API and database modules.
const api = require("../modules/api.js")
const database = require("../modules/database.js")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all GET requests on /profile.
    .get("/", (req, res) => {
        // Get ZenQuotes' daily quote.
        Promise.all([
            database.read_user(req.query.email),
            api.quote(),
            database.read_highest_streak(req.query.email),
            api.get("Questionnaires/2")
        ])
            .then(([user, quote, streak, questionnaire]) => {
                api.get(`QuestionnaireResponses/${user.id}`)
                    .then(questionnaire_response => {
                        // Load the profile page with the name, quote, streak, questionnaire and questionnaire response.
                        res.render("profile", {
                            name: req.query.name,
                            quote: quote,
                            streak: streak,
                            questionnaire: questionnaire.questions,
                            questionnaire_response: questionnaire_response.questionResponses
                        })
                    })
            })
    })
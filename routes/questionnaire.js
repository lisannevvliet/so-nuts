// Import Express.
const express = require("express")

// Import API, database and responses modules.
const api = require("../modules/api.js")
const database = require("../modules/database.js")
const responses = require("../modules/responses.js")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all GET requests on /questionnaire.
    .get("/", (_req, res) => {
        Promise.all([
            api.get("Questionnaires/2"),
            api.get("Domains")
        ])
            .then(([questionnaire, domains]) => {
                // Load the questionnaire page with the domains, questionnaire and questionnaire length.
                res.render("questionnaire", {
                    domains: domains,
                    questionnaire: questionnaire.questions,
                    length: questionnaire.questions.length - 1
                })
            })
    })

    // Listen to all POST requests on /questionnaire.
    .post("/", (req, res) => {
        // Transform the answers to a compatible format and send a POST request with them.
        api.post(responses.responses(req.body.answers))
            .then(id => {
                // Update the questionnaire completion status and add the ID to the database.
                Promise.all([
                    database.update_user(req.body.email, { questionnaire: true }),
                    database.update_user(req.body.email, { id: id }),
                ])
                    .then(() => {
                        // Redirect to the goals page.
                        res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
                    })
            })
    })
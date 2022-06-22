// Import Express.
const express = require("express")

// Import database module.
const database = require("../modules/database.js")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all GET requests on /.
    .get("/", (_req, res) => {
        // Load the login page.
        res.render("login")
    })

    // Listen to all POST requests on /.
    .post("/", (req, res) => {
        // Check if the user already exists in the database.
        database.read_user(req.body.email)
            .then(user => {
                // If not, create a new user in the database.
                if (user == null) {
                    database.insert_user(req.body.email)
                        .then(() => {
                            // Redirect to the onboarding page.
                            res.redirect(`/onboarding?name=${req.body.name}&email=${req.body.email}`)
                        })
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
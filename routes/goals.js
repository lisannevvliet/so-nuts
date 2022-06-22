// Import Express.
const express = require("express")

// Import database module.
const database = require("../modules/database.js")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all GET requests on /goals.
    .get("/", (req, res) => {
        // Get the goals and user goals from the database.
        Promise.all([
            database.read_goals(),
            database.read_user_goals(req.query.email)
        ])
            .then(([goals, user_goals]) => {
                // Load the goals page with the name, whether the name ends with an s, user goals and goals.
                res.render("goals", {
                    name: req.query.name,
                    s: req.query.name.slice(-1) == "s" || req.query.name.slice(-1) == "S",
                    user_goals: user_goals,
                    goals: goals
                })
            })
    })

    // Listen to all POST requests on /goals.
    .post("/", (req, res) => {
        // Redirect to the profile page.
        res.redirect(`/profile?name=${req.body.name}&email=${req.body.email}`)
    })
// Import Express.
const express = require("express")

// Import database module.
const database = require("../modules/database.js")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all POST requests on /increase_streak.
    .post("/", (req, res) => {
        // Increase the streak by one.
        database.update_user_goal(req.body.id, { streak: parseInt(req.body.streak) + 1 })
            .then(() => {
                // Redirect to the goals page.
                res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
            })
    })
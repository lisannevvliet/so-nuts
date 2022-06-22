// Import Express.
const express = require("express")

// Import database module.
const database = require("../modules/database.js")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all POST requests on /delete_user_goal.
    .post("/", (req, res) => {
        database.remove_user_goal(req.body.id)
            .then(() => {
                // Redirect to the goals page.
                res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
            })
    })
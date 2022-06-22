// Import Express.
const express = require("express")

// Import database module.
const database = require("../modules/database.js")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all POST requests on /add_goals.
    .post("/", (req, res) => {
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
                .then(() => {
                    // Redirect to the goals page.
                    res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
                })
        }
    })
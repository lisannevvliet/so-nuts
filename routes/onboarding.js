// Import Express.
const express = require("express")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all GET requests on /onboarding.
    .get("/", (req, res) => {
        // Load the onboarding page.
        res.render("onboarding", {
            name: req.query.name,
            email: req.query.email
        })
    })
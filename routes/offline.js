// Import Express.
const express = require("express")

// Initialise Express.
module.exports = express
    .Router()

    // Listen to all GET requests on /offline.
    .get("/", (_req, res) => {
        // Load the offline page.
        res.render("offline")
    })
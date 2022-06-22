// Import Dotenv.
require("dotenv").config()
// Import Express.
const express = require("express")
// Import Handlebars.
const handlebars = require("express-handlebars")
// Import compression.
const compression = require("compression")

// Import routes.
const login = require("./routes/login.js")
const onboarding = require("./routes/onboarding.js")
const questionnaire = require("./routes/questionnaire.js")
const goals = require("./routes/goals.js")
const increase_streak = require("./routes/increase_streak.js")
const delete_user_goal = require("./routes/delete_user_goal.js")
const add_goals = require("./routes/add_goals.js")
const profile = require("./routes/profile.js")

// Initialise Express.
express()
    // Compress all responses.
    .use(compression())

    // Cache non-HTML GET requests for one year (see https://ashton.codes/set-cache-control-max-age-1-year/).
    .use((req, res, next) => {
        if (req.method == "GET" && !(req.rawHeaders.toString().includes("text/html"))) {
            res.set("Cache-control", "public, max-age=31536000")
        }

        // Pass on the request.
        next()
    })

    // Render static files.
    .use(express.static("static"))

    // Set the view engine to Handlebars and import the helpers.
    .engine("handlebars", handlebars.engine({
        helpers: require("./helpers")
    }))
    .set("view engine", "handlebars")

    // Parse incoming requests.
    .use(express.urlencoded({
        extended: true
    }))

    // Configure routes.
    .use("/", login)
    .use("/onboarding", onboarding)
    .use("/questionnaire", questionnaire)
    .use("/goals", goals)
    .use("/increase_streak", increase_streak)
    .use("/delete_user_goal", delete_user_goal)
    .use("/add_goals", add_goals)
    .use("/profile", profile)

    // Set and log the port for Express.
    .listen(process.env.PORT, () => {
        console.log(`Express running at http://localhost:${process.env.PORT}.`)
    })
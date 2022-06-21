// Import Node.js modules.
require("dotenv").config()
const express = require("express")
const handlebars = require("express-handlebars")
const { createClient } = require("@supabase/supabase-js")

// Import modules.
const get = require("./modules/get.js")
const reponses = require("./modules/reponses.js")
const post = require("./modules/post.js")

// Initialise Supabase with a service key, to have full access to the data.
const supabase = createClient("https://depctutsufqakltbwctd.supabase.co", process.env.SERVICE_KEY)

// Initialise Express.
const app = express()

// Render static files.
app.use(express.static("static"))

// Set the view engine to Handlebars and import the helpers.
app.engine("handlebars", handlebars.engine({
    helpers: require("./helpers")
}))
app.set("view engine", "handlebars")

// Parse incoming requests.
app.use(express.urlencoded({
    extended: true
}))

// Set and log the port for Express.
app.listen(process.env.PORT, () => {
    console.log(`Express running at http://localhost:${process.env.PORT}.`)
})

// Listen to all GET requests on /.
app.get("/", (_req, res) => {
    // Load the login page.
    res.render("login")
})

// Listen to all POST requests on /.
app.post("/", (req, res) => {
    // Check if the user already exists in the database.
    read_user(req.body.email)
        .then(user => {
            // If not, create a new user in the database.
            if (user.length == 0) {
                insert_user(req.body.email)
                    .then(
                        // Redirect to the onboarding page.
                        res.redirect(`/onboarding?name=${req.body.name}&email=${req.body.email}`)
                    )
            } else {
                // Check if the questionnaire has already been completed.
                if (user.questionnaire == false) {
                    // Redirect to the onboarding page.
                    res.redirect(`/onboarding?name=${req.body.name}&email=${req.body.email}`)
                } else {
                    // Redirect to the personalized goals page.
                    res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
                }
            }
        })
})

// Listen to all GET requests on /onboarding.
app.get("/onboarding", (_req, res) => {
    // Load the onboarding page.
    res.render("onboarding")
})

// Listen to all POST requests on /onboarding.
app.post("/onboarding", (req, res) => {
    // Redirect to the questionnaire.
    res.redirect(`/questionnaire?name=${req.body.name}&email=${req.body.email}`)
})

// Listen to all GET requests on /questionnaire.
app.get("/questionnaire", (_req, res) => {
    get.get("questionnaire", "Questionnaires/2")
        .then(questionnaire => {
            get.get("domains", "Domains")
                .then(domains => {
                    // Check if the files exist.
                    if (questionnaire != undefined && domains != undefined) {
                        // Load the questionnaire page with the domains, questionnaire and questionnaire length.
                        res.render("questionnaire", {
                            domains: domains,
                            questionnaire: questionnaire.questions,
                            length: questionnaire.questions.length - 1
                        })
                    }
                })
        })
})

// Listen to all POST requests on /questionnaire.
app.post("/questionnaire", (req, res) => {
    update_user(req.body.email, { questionnaire: true })
        .then(
            // Transform the answers to a compatible format and send a POST request with them.
            post.post(reponses.reponses(req.body.answers))
                .then(
                    // Redirect to the personalized goals page.
                    res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
                )
        )
})

// Listen to all GET requests on /goals.
app.get("/goals", (req, res) => {
    // Get the goals from the database.
    read_goals()
        .then(goals => {
            // Get the user goals from the database.
            read_user_goals(req.query.email)
                .then(user_goals => {
                    // Load the goals page with the name, whether the name ends with an s, user goals and goals.
                    res.render("goals", {
                        name: req.query.name,
                        s: req.query.name.slice(-1) == "s" || req.query.name.slice(-1) == "S",
                        user_goals: user_goals,
                        goals: goals
                    })
                })
        })
})

// Listen to all POST requests on /increase_streak.
app.post("/increase_streak", (req, res) => {
    // Check if the increased streak is not bigger than 21.
    if (parseInt(req.body.streak) + 1 <= 21) {
        // Increase the streak by one.
        update_user_goal(req.body.id, { streak: parseInt(req.body.streak) + 1 })
            .then(
                // Redirect to the personalized goals page.
                res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
            )
    } else {
        // Redirect to the personalized goals page.
        res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
    }
})

// Listen to all POST requests on /add_goals.
app.post("/add_goals", (req, res) => {
    if (Array.isArray(req.body.goal)) {
        req.body.goal.forEach((goal, index) => {
            add_user_goal(req.body.email, goal)
                .then(() => {
                    // Check if the last goal has been added.
                    if (index == req.body.goal.length - 1) {
                        // Redirect to the personalized goals page.
                        res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
                    }
                })
        })
    } else {
        add_user_goal(req.body.email, req.body.goal)
            .then(
                // Redirect to the personalized goals page.
                res.redirect(`/goals?name=${req.body.name}&email=${req.body.email}`)
            )
    }
})

// Listen to all GET requests on /profile.
app.get("/profile", (_req, res) => {
    get.get("questionnaire", "Questionnaires/2")
        .then(questionnaire => {
            get.get("questionnaire_response", "QuestionnaireResponses/3")
                .then(questionnaire_response => {
                    // Check if the files exist.
                    if (questionnaire != undefined && questionnaire_response != undefined) {
                        // Load the profile page with the questionnaire and questionnaire response.
                        res.render("profile", {
                            questionnaire: questionnaire.questions,
                            questionnaire_response: questionnaire_response.questionResponses
                        })
                    }
                })
        })
})

async function read_user(email) {
    const reponse = await supabase
        .from("users")
        .select("*")
        .eq("email", email)

    return reponse.data
}

async function insert_user(email) {
    await supabase
        .from("users")
        .insert([{ email: email }])
}

async function update_user(email, value) {
    await supabase
        .from("users")
        .update(value)
        .eq("email", email)
}

async function read_user_goals(email) {
    const reponse = await supabase
        .from("user_goals")
        .select(`
        id,
        email,
        goal,
        streak,
        goal ( name, icon )
        `)
        .eq("email", email)
        .order("id", { ascending: false })

    return reponse.data
}

async function update_user_goal(id, value) {
    await supabase
        .from("user_goals")
        .update(value)
        .eq("id", id)
}

async function read_goals() {
    const reponse = await supabase
        .from("goals")
        .select(`
        name,
        icon
        `)

    return reponse.data
}

async function add_user_goal(email, goal) {
    await supabase
        .from("user_goals")
        .insert([{ email: email, goal: goal }])
}
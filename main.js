// Import Dotenv.
import "dotenv/config"
// Import Express.
import express from "express"
// Import Handlebars.
import { engine } from "express-handlebars"
// Import node-fetch.
// import fetch from "node-fetch"
// Import JSON file.
// import json from "./static/json/mib-swagger.json" assert { type: "json" }

// Initialise Express.
const app = express()

// Render static files.
app.use(express.static("static"))

// Set the view engine to Handlebars.
app.engine("handlebars", engine())
app.set("view engine", "handlebars")

// Set and log the port for Express.
app.listen(process.env.PORT, () => {
    console.log(`Express running at http://localhost:${process.env.PORT}.`)
})

// Listen to all GET requests on /.
app.get("/", async function (_req, res) {
    // Get the data from the API.
    // const response = await fetch(url)
    // const data = await response.json()

	// Load the index page.
    res.render("index")
})
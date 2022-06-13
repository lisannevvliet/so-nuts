// Import Node.js modules.
const fetch = require("node-fetch")
const fs = require("fs")

module.exports = {
    get: async function (name, url) {
        // Try to get the data from the API. If it fails, use the JSON.
        try {
            // To use the JSON, comment out this line of code.
            const response = await fetch(`https://fhir.mibplatform.nl/api/${url}`)
            const data = await response.json()

            // Save the most recent data in the JSON.
            fs.writeFileSync(`static/json/${name}.json`, JSON.stringify(data))
        } catch { }

        // Read the JSON with the most recent data available.
        const data = fs.readFileSync(`static/json/${name}.json`)

        // Return the data in a JSON format.
        return JSON.parse(data)
    }
}
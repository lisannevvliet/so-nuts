// Import Node.js modules.
const fetch = require("node-fetch")

module.exports = {
    get: async (url) => {
        // Get the data from the Chippr API.
        const response = await fetch(`https://fhir.mibplatform.nl/api/${url}`)
        const data = await response.json()

        return data
    },
    post: async (responses) => {
        // Post the questionnaire to the Chippr API.
        const response = await fetch("https://fhir.mibplatform.nl/api/QuestionnaireResponses", {
            method: "POST",
            body: JSON.stringify({
                "id": "string",
                "questionnaireId": "2",
                "participantId": "1",
                "questionResponses": responses
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        const data = await response.json()

        return data.id
    },
    quote: async () => {
        // Get the daily quote from the ZenQuotes API.
        const response = await fetch("https://zenquotes.io/api/today/")
        const data = await response.json()

        return data[0]
    }
}
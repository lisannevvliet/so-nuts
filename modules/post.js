// Import Node.js module.
const fetch = require("node-fetch")

module.exports = {
    post: async (responses) => {
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

        return await response.json()
    }
}
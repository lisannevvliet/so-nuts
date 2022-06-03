## Questionnaire json

* id
* title
* description
* questions
  * id (ie "age")
  * text (Text defining the question)
  * type
    * "string"
    * "choice" pick one of answerOptions
    * "openChoice" pick one of answerOptions or pick "other" option with your own open answer
    * "multiChoice" pick one or more of answerOptions
    * "multiOpenChoice" pick one or more of answerOptions and or pick "other" option with your own open answer
  * openLabel (text label for the "other" option with openChoice or multiOpenChoice question types)
  * answerOptions
    * id (ie "sex-m")
    * selected (already preselected? true/false)
    * text (text describing the option)

## QuestionnaireResponse json

* id
* questionnaireId (id of the questionnaire this response is for)
* participantId (id of the participant that is entering this response)
* questionResponses
  * questionId (id of the question this response is for
  * response (text response of this question, also used as "other response" text)
  * choiceOptionIds (list of question option ids that were selected for this response)

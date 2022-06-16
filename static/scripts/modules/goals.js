import $ from "./$.js"
import $$ from "./$$.js"

export default function goals() {
    let index = 0
    let goals = []
    let new_goals = []
    const saved_goals = JSON.parse(localStorage.getItem("goals")) || []

    $("#add").addEventListener("click", () => {
        // Show the pop-up.
        $("form").classList.add("show_popup")
    })

    $(".close_popup").addEventListener("click", () => {
        // Hide the pop-up.
        $("form").classList.remove("show_popup")
    })

    $(".add_goal").addEventListener("submit", add_goal)
    $$(".unordered_goal_list").forEach(element => {
        element.addEventListener("click", increment_repetition)
    })
    // $(".unordered_goal_list").addEventListener("click", remove_goal)

    // Retrieve the goals from localStorage and render them in the HTML.
    render_goals(saved_goals, index)

    // Add the goals from localStorage to the goals array.
    saved_goals.forEach(element => {
        goals.push(element)
    })

    function add_goal(event) {
        // Prevent the page from reloading.
        event.preventDefault()

        // Clear the new goals array.
        new_goals = []

        // Set the index to the goals array length, so that new goals can be addressed correctly.
        index = goals.length

        // Loop through all checkboxes.
        $$("input[name=goal]").forEach(checkbox => {
            // Check if the checkbox is checked.
            if (checkbox.checked) {
                // Create a goal object from the input values.
                const goal = {
                    name: checkbox.value,
                    repetition: 0,
                    total_repetition: 21,
                    timeframe: "dagelijks",
                    completed: false
                }

                // Add the goal to the goals and new goals arrays.
                goals.push(goal)
                new_goals.push(goal)
            }
        })

        // Render the new goals in the HTML.
        render_goals(new_goals, index)

        // Save the goals in localStorage.
        localStorage.setItem("goals", JSON.stringify(goals))

        // Reset the form.
        this.reset()

        // Hide the pop-up.
        $("form").classList.remove("show_popup")

        $$(".unordered_goal_list").forEach(element => {
            // Remove all previously added eventListeners, to prevent duplicates.
            element.removeEventListener("click", increment_repetition)
            element.addEventListener("click", increment_repetition)
        })
    }

    function render_goals(goals, index) {
        // Add the goals to the bottom of the HTML list.
        goals.forEach(goal => {
            $(".unordered_goal_list").insertAdjacentHTML('beforeend', `
                <li>
                    <section>
                        <article> 
                            <h2>${goal.name}</h2>
                            <p>
                                <span class="repetition_change">${goal.repetition}</span>/${goal.total_repetition} ${goal.timeframe}
                            </p> 
                        </article>
                        <label for="goal_${index}">
                            <input type="checkbox" data-index=${index} name="goal_${index}" id="goal_${index}" ${goal.completed ? "checked" : ""} />
                        </label>
                    </section>
                    <div id="goal_progress">
                        <div></div>
                    </div>
                </li>`)

            // Increment the index.
            index++
        })
    }

    function increment_repetition(event) {
        // Get the number after "goal_" using a substring.
        const index = event.target.id.substring(5)

        // Increment the repetition.
        goals[index].repetition++

        // Check if the current repetition is the same as the total amount of repetitions.
        if (goals[index].repetition == goals[index].total_repetition) {
            // Set the completed status to true.
            goals[index].completed = true

            // Change the symbol to a check.
            $$(".unordered_goal_list label input[type=checkbox]")[index].classList.add("checkmark")
            // $$("label i")[index].textContent = "✔︎"
        }
        // Check if the current repetition exceeds than the total amount of repetitions. 
        else if (goals[index].repetition > goals[index].total_repetition) {
            // Change the current repetition to zero.
            goals[index].repetition = 0

            // Set the completed status to false.
            goals[index].completed = false

            // Change the symbol back to a plus.
            $$(".unordered_goal_list label input[type=checkbox]")[index].classList.remove("checkmark")
            // $$("label i")[index].textContent = "+"
        }

        // Update the current repetition in the HTML.
        $$(".repetition_change")[index].textContent = goals[index].repetition

        // Update the goals in localStorage.
        localStorage.setItem("goals", JSON.stringify(goals))

        // Add a click animation.
        // $$("label").classList.add(".pulse")
    }

    // Delete goal.
    // function remove_goal(event) {
    //     // If you click on the remove button,
    //     if (!event.target.matches("button")) return
    //     const index = event.target.dataset

    //     goal_array.splice(index, 1)

    //     put_goal_in_list_item(goal_array, unordered_goal_list)
    //     // localStorage.setItem("JSON_all_goals", JSON.stringify(JSON_all_goals))
    // }
}
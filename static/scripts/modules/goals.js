import $ from "./$.js"
import $$ from "./$$.js"

export default function goals() {
    let goals = []
    let new_goals = []
    // const JSON_all_goals = JSON.parse(localStorage.getItem("JSON_all_goals")) || []

    $(".add_goal").addEventListener("submit", add_goal)
    $(".unordered_goal_list").addEventListener("click", toggle_complete, click_animation)
    // $(".unordered_goal_list").addEventListener("click", remove_goal)

    // render_goals(new_goals)

    function add_goal(event) {
        // Clear the new goals array.
        new_goals = []

        $$("input[name=goal]:checked").forEach((checkbox, index) => {
            const goal = {
                name: checkbox.value,
                repetition: 0,
                total_repetition: $$("[name=repetition]")[index].value,
                timeframe: $$("[name=timeframe]")[index].value,
                completed: false
            }

            // Add the input values to the goals and new goals arrays.
            goals.push(goal)
            new_goals.push(goal)
        })

        // Render the new goals in the HTML.
        render_goals(new_goals)

        // Save the goals in localStorage.
        localStorage.setItem("JSON_all_goals", JSON.stringify(goals))

        // Reset the form.
        this.reset()

        // Hide the pop-up.
        $("form").classList.remove("show_popup")

        // Prevent the page from reloading.
        event.preventDefault()
    }

    function render_goals(goals) {
        // Add the goals to the bottom of the HTML list.
        goals.forEach((goal, index) => {
            $(".unordered_goal_list").insertAdjacentHTML('beforeend', `
                <li>
                    <article>
                        <strong>${goal.name}</strong>
                        <p>
                            <span class="repetition_change">${goal.repetition}</span>
                            /${goal.total_repetition} ${goal.timeframe}
                        </p> 
                        <label for="goal_${index}">
                            <i>+</i>
                            <input type="checkbox" data-index=${index} name="goal_${index}" id="goal_${index}" ${goal.completed ? "checked" : ""} />
                        </label>
                    </article>
                    <div id="goal_progress">
                        <div></div>
                    </div>
                </li>`)
        })
    }

    // Toggle to complete.
    function toggle_complete(event) {
        // Get the number after "goal_" using a substring.
        const index = event.target.id.substring(5)

        // Increment the repetition.
        goals[index].repetition++

        // Check if the current repetition is the same as the total amount of repetitions.
        if (goals[index].repetition == goals[index].total_repetition) {
            // Set the completed status to true.
            goals[index].completed = true

            // Change the symbol to a check.
            $$("label i")[index].textContent = "✔︎"
        }
        // Check if the current repetition exceeds than the total amount of repetitions. 
        else if (goals[index].repetition > goals[index].total_repetition) {
            // Change the current repetition to zero.
            goals[index].repetition = 0

            // Set the completed status to false.
            goals[index].completed = false

            // Change the symbol back to a plus.
            $$("label i")[index].textContent = "+"
        }

        // Update the current repetition in the HTML.
        $$(".repetition_change")[index].textContent = goals[index].repetition

        // Update the goals in localStorage.
        localStorage.setItem("JSON_all_goals", JSON.stringify(goals))
    }

    function click_animation() {
        $$("label").classList.add(".pulse")
    }

    // Delete goal.
    // function remove_goal(event) {
    //     // If you click on the remove button,
    //     if (!event.target.matches("button")) return
    //     const index = event.target.dataset

    //     goal_array.splice(index, 1)
    //     console.log()

    //     put_goal_in_list_item(goal_array, unordered_goal_list)
    //     // localStorage.setItem("JSON_all_goals", JSON.stringify(JSON_all_goals))
    // }
}
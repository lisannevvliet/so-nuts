import $ from "./$.js"
import $$ from "./$$.js"

export default function goals() {
    $("#add").addEventListener("click", () => {
        // Hide all previously shown options.
        $$(".add_goal article").forEach(article => {
            article.classList.remove("show_extra")
        })

        // Show the pop-up.
        $("form").classList.add("show_popup")
    })

    $(".close_popup").addEventListener("click", () => {
        // hide the pop-up.
        $("form").classList.remove("show_popup")
    })

    $$("input[type=checkbox]").forEach((checkbox, index) => {
        checkbox.addEventListener("click", () => {
            // Check if the checkbox is checked.
            if (checkbox.checked) {
                // Show the options.
                $$("article")[index].classList.add("show_extra")
            } else {
                // Hide the options.
                $$("article")[index].classList.remove("show_extra")
            }
        })
    })

    let goals = []
    let new_goals = []
    const saved_goals = JSON.parse(localStorage.getItem("goals")) || []

    $(".add_goal").addEventListener("submit", add_goal)
    $(".unordered_goal_list").addEventListener("click", toggle_complete)
    // $(".unordered_goal_list").addEventListener("click", remove_goal)

    // Retrieve the goals from localStorage and render them in the HTML.
    render_goals(saved_goals)

    // Add the goals from localStorage to the goals array.
    saved_goals.forEach(element => {
        goals.push(element)
    })

    function add_goal(event) {
        // Prevent the page from reloading.
        event.preventDefault()

        // Clear the new goals array.
        new_goals = []

        // Loop through all checkboxes.
        $$("input[name=goal]").forEach((checkbox, index) => {
            // Check if the checkbox is checked.
            if (checkbox.checked) {
                // Create a goal object from the input values.
                const goal = {
                    name: checkbox.value,
                    repetition: 0,
                    total_repetition: $$("input[name=repetition]")[index].value,
                    timeframe: $$("select[name=timeframe]")[index].value,
                    completed: false
                }

                // Add the goal to the goals and new goals arrays.
                goals.push(goal)
                new_goals.push(goal)
            }
        })

        // Render the new goals in the HTML.
        render_goals(new_goals)

        // Save the goals in localStorage.
        localStorage.setItem("goals", JSON.stringify(goals))

        // Reset the form.
        this.reset()

        // Hide the pop-up.
        $("form").classList.remove("show_popup")
    }

    function render_goals(goals) {
        // Add the goals to the bottom of the HTML list.
        goals.forEach((goal, index) => {
            $(".unordered_goal_list").insertAdjacentHTML('beforeend', `
                <li>
                    <section>
                        <article> 
                            <h2>${goal.name}</h2>
                            <p>
                                <span class="repetition_change">${goal.repetition}</span>
                                /${goal.total_repetition} ${goal.timeframe}
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
        })
    }

    // Toggle to complete.
    function toggle_complete(event) {
        // Get the number after "goal_" using a substring.
        const index = event.target.id.substring(5)
        console.log(event.target.id)

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

        // click_animation()
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
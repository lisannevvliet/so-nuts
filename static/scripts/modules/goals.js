import $ from "./$.js"
import $$ from "./$$.js"

export default function goals() {
    let goals = []
    const JSON_all_goals = JSON.parse(localStorage.getItem("JSON_all_goals")) || []

    function add_goal(event) {
        // Prevent the page from reloading.
        event.preventDefault()

        // Add the input values to the array.
        $$("input[name=goal]:checked").forEach((checkbox, index) => {
            goals.push({
                name: checkbox.value,
                repetition: 0,
                total_repetition: $$("[name=repetition]")[index].value,
                timeframe: $$("[name=timeframe]")[index].value,
                completed: false
            })
        })

        // Render the goals in the HTML.
        put_goal_in_list_item(goals)

        // Save the array in localStorage.
        localStorage.setItem("JSON_all_goals", JSON.stringify(goals))

        // Reset the form.
        this.reset()

        // Hide the pop-up.
        $("form").classList.remove("show_popup")
    }

    // Render HTML. 
    function put_goal_in_list_item(goal_array) {
        // TO-DO: add this to the localStorage to save the goals for when the person returns to the page.
        for (let i = 0; i < goal_array.length; i++) {
            console.log(goal_array)
            // console.log("goal_array[0][i]: " + goal_array[0][i])
            // Before end, so that new goals are added underneath the existing ones and the index is ascending, not descending.
            $(".unordered_goal_list").insertAdjacentHTML('beforeend', `
                <li>
                    <article>
                        <strong>${goal_array[i].name}</strong>
                        <p>
                            <span class="repetition_change">${goal_array[i].repetition}</span>
                            /${goal_array[i].total_repetition} ${goal_array[i].timeframe}
                        </p> 
                        <label for="goal_${[i]}">
                            <i>+</i>
                            <input type="checkbox" data-index=${[i]} name="goal_${[i]}" id="goal_${[i]}" ${goal_array[i].completed ? "checked" : ""} />
                        </label>
                    </article>
                    <div id="goal_progress">
                        <div></div>
                    </div>
                </li>`)
        }
    }

    // Toggle to complete.
    function toggle_complete(e) {
        // All checkboxes control the textContent of only the first goal. Definitely has something to do with de selector. SelectorAll doesn't work
        if (!e.target.matches("input")) return
        // Only get the text after "goal_" using a substring. Start at index 5, because "goal_" consists of 4 characters (counting from 0).
        const index = e.target.id.substring(5)

        // Increment the repetition.
        goals[index].repetition += 1

        // Use == instead of ===, because == is less strict and more similar to the way we humans compare values.
        if (goals[index].repetition == goals[index].total_repetition) {
            goals[index].completed = true
            $$("label i")[index].textContent = "✔︎"
        } else if (goals[index].repetition > goals[index].total_repetition) {
            goals[index].repetition = 0
            goals[index].completed = false
            $$("label i")[index].textContent = "+"
        }

        // Change the correct span, using an array and index.
        $$(".repetition_change")[index].textContent = goals[index].repetition

        // Progress bar for goal.
        // $$("#goal_progress div")[goal_array[index] - 1].style.width = (goal_array[index] - 1) * 100 / $("#amount_of_repetitions").textContent + "%"
        // put_goal_in_list_item(goal_array, unordered_goal_list)
        localStorage.setItem("JSON_all_goals", JSON.stringify(goals))
    }

    // // // Delete goal.
    // function remove_goal(e) {
    //     // If you click on the remove button,
    //     if (!e.target.matches("button")) return
    //     const index = e.target.dataset

    //     goal_array.splice(index, 1)
    //     console.log()

    //     put_goal_in_list_item(goal_array, unordered_goal_list)
    //     // localStorage.setItem("JSON_all_goals", JSON.stringify(JSON_all_goals))
    // }


    // 
    function click_animation() {
        $$("label").classList.add(".pulse")
    }

    $(".add_goal").addEventListener("submit", add_goal)
    $(".unordered_goal_list").addEventListener("click", toggle_complete, click_animation)
    // $(".unordered_goal_list").addEventListener("click", remove_goal)

    put_goal_in_list_item(goals)
}


import $ from "./$.js"
import $$ from "./$$.js"

export default function goals() {

    const goal_array = []
    const unordered_goal_list = $(".unordered_goal_list")
    const JSON_all_goals = JSON.parse(localStorage.getItem("all_goals")) || []

    // Add a goal.
    function add_goal(e) {
        // Prevent the submit from refreshing the page.
        e.preventDefault()
        // Only put the checked checkboxes in an array.
        let checkboxes = $$('input[name="goal"]:checked')
        let total_repetition = $$("[name=repetition]")
        let timeframe = $$("[name=timeframe]")

        // Push the values of the inputs in the array.
        checkboxes.forEach((checkbox, index) => {
            goal_array.push({
                name: checkbox.value,
                repetition: 0,
                total_repetition: total_repetition[index].value,
                timeframe: timeframe[index].value,
                completed: false,
            })
        })

        // Save the goal array into the localStorage JSON.
        listHabits(goal_array, unordered_goal_list)
        // localStorage.setItem("JSON_all_goals", JSON.stringify(goal_array))
        // Reset the form.
        this.reset()
    }

    // Render HTML. 
    function listHabits(goal_array, unordered_goal_list) {
        // console.log("goal_array[0]: " + goal_array[0])
        // console.log(goal_array[0].length)
        // goal_array.flat()

        for (let i = 0; i < goal_array.length; i++) {
            // console.log(goal_array)
            // console.log("goal_array[0][i]: " + goal_array[0][i])
            // Before end, so that new goals are added underneath the existing ones and the index is ascending, not descending.
            unordered_goal_list.insertAdjacentHTML('beforeend', `
                <li>
                    <article>
                        <strong>${goal_array[i].name}</strong>
                        <p>
                            <span class="repetition_change">${goal_array[i].repetition}</span>
                            /${goal_array[i].total_repetition} ${goal_array[i].timeframe}
                        </p> 
                    </article>
                    <label for="goal_${[i]}">
                        <i>+</i>
                        <input type="checkbox" data-index=${[i]} name="goal_${[i]}" id="goal_${[i]}" ${goal_array[i].completed ? "checked" : ""} />
                    </label>
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
        goal_array[index].repetition += 1

        // BUG: it can't get to this if for some reason? Probably had something to do with the bug above this.
        // Use == instead of ===, because == is less strict and more similar to the way we humans compare values.
        if (goal_array[index].repetition == goal_array[index].total_repetition) {
            goal_array[index].completed = true
        } else if (goal_array[index].repetition > goal_array[index].total_repetition) {
            goal_array[index].repetition = 0
            goal_array[index].completed = false
        }

        // Change the correct span, using an array and index.
        $$(".repetition_change")[index].textContent = goal_array[index].repetition

        // Progress bar for goal.
        // $$("#goal_progress div")[goal_array[index] - 1].style.width = (goal_array[index] - 1) * 100 / $("#amount_of_repetitions").textContent + "%"
        // listHabits(goal_array, unordered_goal_list)
        // localStorage.setItem("JSON_all_goals", JSON.stringify(goal_array))
    }

    // // Delete habit.
    // function remove_goal(e) {
    //     // If you click on the remove button,
    //     if (!e.target.matches("button")) return
    //     const el = e.target
    //     const index = el.dataset.index

    //     goal_array.splice(index, 1)

    //     listHabits(goal_array, unordered_goal_list)
    // localStorage.setItem("JSON_all_goals", JSON.stringify(goal_array))
    // }

    $(".add_goal").addEventListener("submit", add_goal)
    $(".unordered_goal_list").addEventListener("click", toggle_complete)
    // $(".unordered_goal_list").addEventListener("click", remove_goal)

    listHabits(goal_array, unordered_goal_list)
}


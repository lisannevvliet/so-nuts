import $ from "./$.js"
import $$ from "./$$.js"

export default function goals() {

    const unordered_goal_list = $(".unordered_goal_list")
    const JSON_all_goals = JSON.parse(localStorage.getItem("all_goals")) || []

    // Add a goal.
    function add_goal(e) {
        // Prevent the submit from refreshing the page.
        e.preventDefault()
        // Only put the checked checkboxes in an array.
        let checkboxes = $$('input[name="goal"]:checked')
        const goal_array = []
        let total_repetition = $$("[name=repetition]")
        let timeframe = $$("[name=timeframe]")


        // Push each selected checkbox with a goal into the array with the objects.
        checkboxes.forEach((checkbox) => {
            total_repetition.forEach((tot_rep) => {
                timeframe.forEach((timeframe_) => {
                    goal_array.push({
                        name: checkbox.value,
                        repetition: 0,
                        total_repetition: tot_rep.value,
                        timeframe: timeframe_.value,
                        completed: false,
                    })
                })
            })
        })

        // Save the goal array into the localStorage JSON.
        // JSON_all_goals.push(goal_array)
        listHabits(goal_array, unordered_goal_list)
        localStorage.setItem("JSON_all_goals", JSON.stringify(goal_array))
        // Reset the form.
        this.reset()
        // console.log(goal_array)
    }

    // // Render HTML. 
    // function listHabits(goal = [], goal_list_item) {
    //     goal_list_item.innerHTML = JSON_all_goals
    //         .map((goal, i) => {
    //             return `
    //         <li>
    //         <input type="checkbox" data-index=${i} id="goal${i}" ${goal.completed ? "checked" : ""
    //                 } />
    //         <label for="goal${i}"><span>${goal.repetition}/${goal.total_repetition} ${goal.timeframe
    //                 }</span> ${goal.goal}</label>
    //     <button class="delete" data-index=${i} id="delete${i}">Delete</button>
    //     </li>
    //     `
    //         })
    //     // .join("")
    // }

    // Render HTML. 
    function listHabits(goal_array, unordered_goal_list) {
        // console.log("goal_array[0]: " + goal_array[0])
        // console.log(goal_array[0].length)
        // goal_array.flat()

        for (let i = 0; i < goal_array.length; i++) {
            console.log(goal_array)
            // console.log("goal_array[0][i]: " + goal_array[0][i])
            unordered_goal_list.insertAdjacentHTML('afterbegin', `
            <li>
            <input type="checkbox" data-index="${goal_array[i]}" name="goal" id=${goal_array[i].name} ${goal_array[i].completed ? "checked" : ""
                } />
            <label for="${goal_array[i]}"><span>${goal_array[i].repetition}/${goal_array[i].total_repetition} ${goal_array[i].timeframe
                }</span> ${goal_array[i].name}</label>
        <button class="delete" data-index="${goal_array[i]} id="delete${goal_array[i]}">Verwijder doel</button>
        </li>`)
        }
        // .join("")
    }

    // Toggle to complete.
    function toggle_complete(e) {
        if (!e.target.matches("input")) return
        const el = e.target
        const index = el.dataset.index
        goal_array[index].repetition += 1

        if (JSON_all_goals[index].repetition === JSON_all_goals[index].total_repetition) {
            JSON_all_goals[index].completed = true
        } else if (JSON_all_goals[index].repetition > JSON_all_goals[index].total_repetition) {
            JSON_all_goals[index].repetition = 0
            JSON_all_goals[index].completed = false
        }

        listHabits(JSON_all_goals, unordered_goal_list)
        localStorage.setItem("JSON_all_goals", JSON.stringify(goal_array))
    }

    // Delete habit.
    function remove_goal(e) {
        // If you click on the remove button,
        if (!e.target.matches("button")) return
        const el = e.target
        const index = el.dataset.index

        JSON_all_goals.splice(index, 1)

        listHabits(JSON_all_goals, unordered_goal_list)
        localStorage.setItem("JSON_all_goals", JSON.stringify(goal_array))
    }

    $(".add_goal").addEventListener("submit", add_goal)
    $(".unordered_goal_list").addEventListener("click", toggle_complete)
    $(".unordered_goal_list").addEventListener("click", remove_goal)

    listHabits(JSON_all_goals, unordered_goal_list)
}



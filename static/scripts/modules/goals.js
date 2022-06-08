import $ from "./$.js"
import $$ from "./$$.js"

export default function goals() {

    const goal_list = $(".goal_list")
    const all_goals = JSON.parse(localStorage.getItem("all_goals")) || []

    function add_goal(e) {
        e.preventDefault()
        // const goals = this.querySelectorAll("[name=goal]").value

        let checkboxes = document.querySelectorAll('input[name="goal"]:checked')
        let goals = []

        checkboxes.forEach((checkbox) => {
            goals.push(checkbox.value)
        })

        const total_repetition = +this.querySelectorAll("[name=repetition]").value
        const timeframe = this.querySelector("[name=timeframe]").value
        const goal = [
            {
                'name': goals,
                'repetition': 0,
                'total_repetition': total_repetition,
                'timeframe': timeframe,
                'completed': false,
            }
        ]



        all_goals.push(goal)
        listHabits(all_goals, goal_list)
        localStorage.setItem("all_goals", JSON.stringify(all_goals))
        this.reset()
        console.log(goal)
    }

    function listHabits(goal = [], goal_list_item) {
        goal_list_item.innerHTML = all_goals
            .map((goal, i) => {
                return `
            <li>
            <input type="checkbox" data-index=${i} id="goal${i}" ${goal.completed ? "checked" : ""
                    } />
            <label for="goal${i}"><span>${goal.repetition}/${goal.total_repetition} ${goal.timeframe
                    }</span> ${goal.goal}</label>
        <button class="delete" data-index=${i} id="delete${i}">Delete</button>
        </li>
        `
            })
        // .join("")
    }

    // Toggle If Complete
    function toggle_complete(e) {
        if (!e.target.matches("input")) return
        const el = e.target
        const index = el.dataset.index
        all_goals[index].repetition += 1

        if (all_goals[index].repetition === all_goals[index].total_repetition) {
            all_goals[index].completed = true
        } else if (all_goals[index].repetition > all_goals[index].total_repetition) {
            all_goals[index].repetition = 0
            all_goals[index].completed = false
        }

        listHabits(all_goals, goal_list)
        localStorage.setItem("all_goals", JSON.stringify(all_goals))
    }

    // Delete Habit
    function remove_goal(e) {
        if (!e.target.matches("button")) return
        const el = e.target
        const index = el.dataset.index

        all_goals.splice(index, 1)

        listHabits(all_goals, goal_list)
        localStorage.setItem("all_goals", JSON.stringify(all_goals))
    }

    $(".add_goal").addEventListener("submit", add_goal)
    goal_list.addEventListener("click", toggle_complete)
    goal_list.addEventListener("click", remove_goal)

    listHabits(all_goals, goal_list)
}


import $ from "./$.js"

export default function login() {
    $("#login").addEventListener("click", () => {
        // Save the name and email in localStorage.
        localStorage.setItem("user", JSON.stringify({ name: $("#name").value, email: $("#email").value }))
    })

    $("#register").addEventListener("click", () => {
        // Save the name and email in localStorage.
        localStorage.setItem("user", JSON.stringify({ name: $("#name").value, email: $("#email").value }))
    })
}
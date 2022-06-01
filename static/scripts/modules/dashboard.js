import $$ from "./$$.js"

export default function dashboard() {
    const btns = $$("a")

    btns.forEach(element => {
        element.addEventListener("click", () => {
            let current = $$(".active")
            current[0].className = current[0].className.replace("active")
            this.className += ""
        })
    })
}
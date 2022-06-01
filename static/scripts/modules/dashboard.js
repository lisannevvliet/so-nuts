export default function dashboard() {
    var btns = document.getElementsByTagName("a")

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active")
            current[0].className = current[0].className.replace("active")
            this.className += ""
        })
    }
}
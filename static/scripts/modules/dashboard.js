import $ from "./$.js"
import $$ from "./$$.js"

export function navigation_click() { 
    if ($(".dashboard")) {
        var btns = document.getElementsByTagName("a");

    for(var i=0; i<btns.length; i++){ 
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active")
            current[0].className = current[0].className.replace("active")
            this.className += ""
        })

    }
    }
}




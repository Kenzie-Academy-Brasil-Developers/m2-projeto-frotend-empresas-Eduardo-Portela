import {render} from "../homepage/render.js"

function menuBurger(imgPath){
const menuBurger = document.getElementById("burguer")
const showmenu = document.querySelector(".div-buttons")
menuBurger.addEventListener("click", () => {
    showmenu.classList.toggle("show")
    if(showmenu.className.includes("show")){
        menuBurger.innerText = "X"
    }else{
        menuBurger.innerHTML = `<img  src="${imgPath}"  alt="Menu-hamburguer">`
    }
})
}

menuBurger("src/assets/img/hamburguer.png")


render()
import { loginRequest } from "../global/requests.js"

async function menuBurger(imgPath){
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
    
    menuBurger("../../src/assets/img/hamburguer.png")

function login(){
    const form = document.querySelector("#form-login")
    const elements = [...form.elements]

    const body = {}
    
    form.addEventListener("submit", async (e)=> {
        e.preventDefault()
        elements.forEach((input) => {
            if(input.name){
                body[input.name] = input.value
            }
            
        })
        await loginRequest(body)
    })
}

login()
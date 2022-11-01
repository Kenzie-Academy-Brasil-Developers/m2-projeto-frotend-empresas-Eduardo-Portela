import { registerUser } from "../global/requests.js"
import { toast } from "../global/toast.js"


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
    
    menuBurger("../../src/assets/img/hamburguer.png")

async function register(){

    const form = document.querySelector("#form")
    const elements = [...form.elements]

    const body = {}
    form.addEventListener("submit", async(e)=> {
        e.preventDefault()
    
        elements.forEach((element)=> {
            if (element.tagName == "INPUT" || element.tagName == "SELECT"){
                body[element.name] = element.value
            }
         })

        await registerUser(body)
    })
    
}

register()

// toast("Sucesso!", "Cadastro realizado com sucesso", "../assets/img/check.png")
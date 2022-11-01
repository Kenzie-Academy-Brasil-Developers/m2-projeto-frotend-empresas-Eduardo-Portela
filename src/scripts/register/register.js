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

// toast("Sucesso!", "Cadastro realizado com sucesso", "../assets/img/check.png")
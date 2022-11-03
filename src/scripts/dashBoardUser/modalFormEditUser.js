import { editInfosLogedUser } from "../global/requests.js"
import { renderUserInfos } from "./renderDashUsers.js"

export const createModal2 = (content,content2) => {
    const body = document.querySelector("body")
    const backGround = document.createElement("div")
    const modal = document.createElement("div")
    const buttonClose = document.createElement("button")
    
    backGround.classList.add("back-modal")
    modal.classList.add("modal")
    buttonClose.classList.add("button-close")
    
    buttonClose.innerText = "X"
    
    backGround.addEventListener("click", (event) => {
        const {className} = event.target
        if(className == "back-modal" || className == "button-close" || className == "cancel"){
            backGround.remove()
        }
    })
    
    modal.appendChild(buttonClose)
    modal.append(content,content2 ? content2 : "")
    backGround.appendChild(modal)
    
    body.appendChild(backGround)
}

export const modalEditUserLoged = async () => {
    const form = document.createElement("form")
    form.classList.add("edit-user-logued-form")
    
    const title = document.createElement("h2")
    title.innerText ="Editar Perfil"

    const username = document.createElement("input")
    username.setAttribute("placeholder",`Novo Username`)
    username.setAttribute("name","username")

    const email = document.createElement("input")
    email.setAttribute("placeholder",`Novo E-mail`)
    email.setAttribute("name","email")
    email.setAttribute("type","email")

    const password = document.createElement("input")
    password.setAttribute("placeholder",`Nova Senha`)
    password.setAttribute("name","password")
    password.setAttribute("type","password")

    const buttonEdit = document.createElement("button")
    buttonEdit.innerText = "Editar Perfil"
    
    

    form.append(title, username, email, password,buttonEdit)

    form.addEventListener("submit", async(e) => {
        e.preventDefault()

        const userEdited = {}

        const inputs = [...e.target]
        inputs.forEach((input) => {
            if(input.name){
                userEdited[input.name] = input.value 
            }
        })

        await editInfosLogedUser(userEdited)
        location.reload()

        const backModal = e.path[2]
        backModal.remove()

    })

    return form

}
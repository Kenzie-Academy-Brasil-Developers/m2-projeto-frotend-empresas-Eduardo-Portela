import { getLocalStorage } from "../global/localStorage.js"
import { createDepartmentForm, createModal } from "../global/modalForms.js"
import { renderCompaniesOnSelect } from "./render.js"

const verify = () => {
    const user = getLocalStorage("token")
    if(user == ""){
        window.location.assign("../pages/login.html")
    }
}

verify()

const logout = () => {
    const logout = document.getElementById("logout")
    logout.addEventListener("click", ()=>{
        localStorage.removeItem("token")
        location.reload()
    })
}

logout()

const createDepartment = async () => {
    const buttonCreate = document.querySelector(".create-department")
    buttonCreate.addEventListener("click", async () => {
        const form = await createDepartmentForm()
        createModal(form)
    })
}

createDepartment()


renderCompaniesOnSelect()
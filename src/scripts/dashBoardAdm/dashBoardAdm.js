import { getLocalStorage } from "../global/localStorage.js"
import { createDepartmentForm, createModal, editDepartmentForm } from "../global/modalForms.js"
import { getAllDepartments } from "../global/requests.js"
import { renderAllUsers, renderByCompany, renderCompaniesOnSelect, renderDepartments } from "./render.js"

const departments = await getAllDepartments()

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

renderDepartments(departments)
createDepartment()
renderCompaniesOnSelect()
renderByCompany()
renderAllUsers()

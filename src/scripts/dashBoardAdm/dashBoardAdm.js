import { getLocalStorage } from "../global/localStorage.js"
import { logout } from "../global/logout.js"
import { createDepartmentForm, createModal, editDepartmentForm } from "../global/modalForms.js"
import { getAllDepartments, getAllUsers } from "../global/requests.js"
import { verify } from "../global/verifyLocalStorage.js"
import { renderAllUsers, renderByCompany, renderCompaniesOnSelect, renderDepartments } from "./render.js"

const departments = await getAllDepartments()
const allUsers = await getAllUsers()
verify()
logout()

const createDepartment = async () => {
    const buttonCreate = document.querySelector(".create-department")
    buttonCreate.addEventListener("click", async () => {
        const form = await createDepartmentForm()
        createModal(form)
    })
}

export const autoCLick = async () => {
    
        await getAllDepartments()
        const view = localStorage.getItem("viewId")
        const buttonsView = [...document.querySelectorAll(".view")]
        buttonsView.forEach((button) => {
            if(button.id == view){
                button.click()
            }
        })
}

autoCLick()

renderDepartments(departments)
createDepartment()
renderCompaniesOnSelect()
renderByCompany()
renderAllUsers(allUsers)
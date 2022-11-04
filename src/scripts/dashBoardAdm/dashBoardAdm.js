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

// const dismissWorker = async () => {
//     const buttonsDismiss = document.querySelectorAll(".button-dismiss")
//     console.log(buttonsDismiss)
// }

// dismissWorker()

renderDepartments(departments)
createDepartment()
renderCompaniesOnSelect()
renderByCompany()
renderAllUsers(allUsers)

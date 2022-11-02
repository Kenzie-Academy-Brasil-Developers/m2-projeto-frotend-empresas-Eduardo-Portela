import { createModal, deleteDepartmentForm, editDepartmentForm } from "../global/modalForms.js";
import { editDepartment, getAllDepartments, getAllUsers, getFullCompanies } from "../global/requests.js";

const departments = await getAllDepartments()
const allUsers = await getAllUsers()

const renderCompaniesOnSelect = async () => {
    const companies = await getFullCompanies()
    
    const select = document.querySelector("#select-company")
    
    companies.forEach(company => {
        const option = document.createElement("option")
        option.innerText = company.name
        option.value = company.name
        select.appendChild(option)
    });

}

const renderDepartments = async (list) => {



    const departList = document.querySelector(".department-list")
    departList.innerHTML = ""

    list.forEach((department) => {

    const departLi = document.createElement("li")
    departLi.id = `${department.uuid}`
    departLi.classList.add("department")

    const departName = document.createElement("h3")
    departName.innerText = `${department.name}`

    const departDescription = document.createElement("p")
    departDescription.innerText = `${department.description}`

    const companyName = document.createElement("p")
    companyName.innerText = `${department.companies.name}`

    const divFunctions = document.createElement("div")
    divFunctions.classList.add("functions")

    const buttonView = document.createElement("button")
    buttonView.classList.add("view")
    const buttonEdit = document.createElement("button")
    buttonEdit.classList.add("edit")



    buttonEdit.addEventListener("click", async ()=> {
        const editModal = await editDepartmentForm(department)
        
        createModal(editModal)
    })

    const buttonDelete = document.createElement("button")
    buttonDelete.classList.add("delete")

    buttonDelete.addEventListener("click", async() => {
        const deleteModal = await deleteDepartmentForm(department)
        createModal(deleteModal)
    })

    divFunctions.append(buttonView, buttonEdit, buttonDelete)
    departLi.append(departName, departDescription, companyName, divFunctions)

    departList.appendChild(departLi)
})
}

const renderByCompany = async() => {
    const select = document.querySelector("#select-company")
    select.addEventListener("change", () => {
        const departsFiltered = departments.filter((depart)=> depart.companies.name == select.value)
        if(select.value == ""){
            renderDepartments(departments)
            
        }else{
            renderDepartments(departsFiltered)

        }
    })
}

const renderAllUsers = async(list) => {
    console.log(allUsers)

    const listUsers = document.querySelector(".user-list")
    listUsers.innerHTML = ""

    list.forEach((user) => {

        if(!user.is_admin){

            const userLI = document.createElement("li")
            userLI.classList.add("user")
            const userName = document.createElement("h3")
            userName.innerText = `${user.username}`

            const nivel = document.createElement("p")
            nivel.innerText = `${user.professional_level}`

            const company = document.createElement("p")

            const kindOfWork = document.createElement("p")
            kindOfWork.innerText = `${user.kind_of_work == null ? "" : user.kind_of_work }`

            const divFunctionUser = document.createElement("div")
            divFunctionUser.classList.add("function-user")

            const buttonEditUser = document.createElement("button")
            buttonEditUser.classList.add("edit")

            const buttonDeleteUser = document.createElement("button")
            buttonDeleteUser.classList.add("delete")

            divFunctionUser.append(buttonEditUser, buttonDeleteUser)
            userLI.append(userName,nivel,kindOfWork, divFunctionUser)
            
            listUsers.appendChild(userLI)
        }
    })

}

export {
    renderCompaniesOnSelect,
    renderDepartments,
    renderByCompany,
    renderAllUsers
}

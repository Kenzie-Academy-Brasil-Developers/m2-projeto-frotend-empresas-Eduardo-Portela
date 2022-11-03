import { createModal, deleteDepartmentForm, deleteUserForm, editDepartmentForm, editUserForm, modalViewDepartment } from "../global/modalForms.js";
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
    buttonView.id = `${department.uuid}`

    buttonView.addEventListener("click", async()=> {
        const modalView = await modalViewDepartment(department)
        const modalList = await renderUsersByDepartament()
        createModal(modalView,modalList)
    })


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

    const listUsers = document.querySelector(".user-list")
    listUsers.innerHTML = ""

    list.forEach((user) => {

        if(!user.is_admin){

            const userLI = document.createElement("li")
            userLI.id = `${user.uuid}`
            userLI.classList.add("user")
            const userName = document.createElement("h3")
            userName.innerText = `${user.username}`

            const nivel = document.createElement("p")
            nivel.innerText = `${user.professional_level}`

            const company = document.createElement("p")

            const kindOfWork = document.createElement("p")
            kindOfWork.innerText = `${user.kind_of_work}`

            const divFunctionUser = document.createElement("div")
            divFunctionUser.classList.add("function-user")

            const buttonEditUser = document.createElement("button")
            buttonEditUser.classList.add("edit")

            buttonEditUser.addEventListener("click", async () => {
                const modalEdit = await editUserForm(user)
                createModal(modalEdit)
            })

            const buttonDeleteUser = document.createElement("button")
            buttonDeleteUser.classList.add("delete")

            buttonDeleteUser.addEventListener("click", async() => {
                const modalDelete = await deleteUserForm(user)
                createModal(modalDelete)
            })

            divFunctionUser.append(buttonEditUser, buttonDeleteUser)
            userLI.append(userName,nivel,kindOfWork, divFunctionUser)
            
            listUsers.appendChild(userLI)
        }
    })

}

const renderUsersByDepartament = async () => {

    const listUsersDepart    = document.createElement("ul")
    listUsersDepart.classList.add("list-users-depart")
    const getIdDepart = document.querySelector(".view")
    console.log(getIdDepart)

    //allUsers.forEach((user)=> {
        //console.log(user.uuid)
        const userLi             = document.createElement("li")
        userLi.classList.add("user-depart")

        const username           = document.createElement("h4")
        username.innerText       ="Username"
        
        const nivel              = document.createElement("p")
        nivel.innerText          = "Pleno"
        
        const companyName        = document.createElement("p")
        companyName.innerText    = "Company Name"
        
        const buttonDismiss      = document.createElement("button")
        buttonDismiss.classList.add("button-dismiss")
        buttonDismiss.innerText  = "Desligar"

        userLi.append(username,nivel,companyName,buttonDismiss)
        listUsersDepart.appendChild(userLi)

    //})
    return listUsersDepart
}

export {
    renderCompaniesOnSelect,
    renderDepartments,
    renderByCompany,
    renderAllUsers,
    renderUsersByDepartament
}

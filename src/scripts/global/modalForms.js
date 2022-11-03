import { renderAllUsers, renderDepartments } from "../dashBoardAdm/render.js"
import { createDepartmentRequest, deleteDepartment, deleteUser, editDepartment, editUser, getAllDepartments, getAllUsers, getFullCompanies } from "./requests.js"
import { toast } from "./toast.js"

const body = document.querySelector("body")


const createModal = (content) => {
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
    modal.appendChild(content)
    backGround.appendChild(modal)
    
    body.appendChild(backGround)
}

const createDepartmentForm = async ()=> {

    const companies = await getFullCompanies()

    const form = document.createElement("form")
    form.classList.add("create-depart-form")
    
    const title = document.createElement("h2")
    title.innerText ="Criar Departamento"

    const departName =document.createElement("input")
    departName.setAttribute("placeholder","Nome do departamento")
    departName.setAttribute("name","name")
    departName.setAttribute("required","true")
    
    const departDescription = document.createElement("input")
    departDescription.setAttribute("placeholder","Descrição")
    departDescription.setAttribute("name","description")
    departDescription.setAttribute("required","true")

    const selectCompany = document.createElement("select")
    selectCompany.setAttribute("name","company_uuid")

    const firstOption = document.createElement("option")
    firstOption.innerText = "Selecionar empresa"
    selectCompany.appendChild(firstOption)
    
    companies.forEach((company)=> {
        const option = document.createElement("option")
        option.innerText = company.name
        option.value = company.uuid
        selectCompany.appendChild(option)
    })


    const buttonCreate = document.createElement("button")
    buttonCreate.innerText = "Criar departamento"


    form.append(title, departName, departDescription, selectCompany, buttonCreate)

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const newDepart = {}

        const inputs = [...e.target]

        inputs.forEach(({name,value}) => {
            newDepart[name] = value
        })
        const backModal = e.path[2]

        await createDepartmentRequest(newDepart)
        const departments = await getAllDepartments()

        await renderDepartments(departments)
        backModal.remove()

    })
    
    return form

}

const editDepartmentForm = async ({description,uuid}) => {

    const form = document.createElement("form")
    form.classList.add("form-edit")

    const title = document.createElement("h2")
    title.innerText ="Editar Departamento"

    const departDescription = document.createElement("textarea")
    departDescription.classList.add("edit-description")
    departDescription.setAttribute("name","description")
    departDescription.value = `${description}`

    const buttonEdit = document.createElement("button")
    buttonEdit.classList.add("button-edit")
    buttonEdit.innerText = "Confimar Edição"

    form.append(title, departDescription, buttonEdit)

    const bodyEdited = {}

    form.addEventListener("submit", async (e) =>{
        e.preventDefault()
        const input = [...e.target]
        
        input.forEach(({name,value}) =>{
            if(name){
                bodyEdited[name] = value

            }
        })

        const backModal = e.path[2]
        
        await editDepartment(bodyEdited,uuid)
        const departments = await getAllDepartments()
        await renderDepartments(departments)

        backModal.remove()
        
    })
    return form
}

const deleteDepartmentForm = async({name, uuid}) => {

    const form = document.createElement("form")
    form.classList.add("form-delete")

    const description = document.createElement("p")
    description.classList.add("delete-description")

    description.innerText = `Realmente deseja deletar o Departamento ${name} e demitir seus funcionários?`

    const buttonDelete = document.createElement("button")
    buttonDelete.classList.add("button-delete")
    buttonDelete.innerText = "Confirmar"

    form.append(description, buttonDelete)

    form.addEventListener("submit", async (e)=> {
        e.preventDefault()

        const backModal = e.path[2]
        await deleteDepartment(uuid)
        const departments = await getAllDepartments()
        await renderDepartments(departments)
        toast("Sucesso!", "Departamento deletado com sucesso", "../assets/img/check.png")
        backModal.remove()
    })

    return form
}

const editUserForm = async ({professional_level, kind_of_work, uuid}) => {


    const form = document.createElement("form")
    form.classList.add("edit-user-form")
    
    const title = document.createElement("h2")
    title.innerText ="Editar Usuário"

    const nivel = document.createElement("input")
    nivel.setAttribute("placeholder",`${professional_level ? professional_level : "selecione nivel profissional"}`)
    nivel.setAttribute("name","professional_level")
    nivel.setAttribute("required","true")
    
    const kindOfWork = document.createElement("select")
    const optionDefault = document.createElement("option")
    optionDefault.innerText = kind_of_work ? kind_of_work : "selecione a modalidade de trabalho"

    const option1 = document.createElement("option")
    option1.value = "home office"
    option1.innerText = "home office"

    const option2 = document.createElement("option")
    option2.value = "hibrido"
    option2.innerText = "hibrido"

    const option3 = document.createElement("option")
    option3.value = "presencial"
    option3.innerText = "presencial"

    kindOfWork.setAttribute("name","kind_of_work")
    kindOfWork.setAttribute("required","true")

    kindOfWork.append(optionDefault,option1,option2,option3)

    const buttonEdit = document.createElement("button")
    buttonEdit.innerText = "Editar"

    form.append(title, nivel, kindOfWork,buttonEdit)

    form.addEventListener("submit", async(e) => {
        e.preventDefault()

        const userEdited = {}

        const inputs = [...e.target]
        inputs.forEach((input) => {
            if(input.name){
                userEdited[input.name] = input.value 
            }
        })

        const backModal = e.path[2]

        await editUser(userEdited, uuid)
        const allUsers = await getAllUsers()
        await renderAllUsers(allUsers)

        backModal.remove()

    })

    return form
}

const deleteUserForm = async ({username, uuid}) => {
    
    const form = document.createElement("form")
    form.classList.add("form-delete")

    const description = document.createElement("p")
    description.classList.add("delete-description")

    description.innerText = `Realmente deseja remover o usuário ${username}?`

    const buttonDelete = document.createElement("button")
    buttonDelete.classList.add("button-delete")
    buttonDelete.innerText = "Confirmar"

    form.append(description, buttonDelete)

    form.addEventListener("submit", async(e)=> {
        e.preventDefault()

        
        await deleteUser(uuid)
        const allUsers = await getAllUsers()
        await renderAllUsers(allUsers)
        const backModal = e.path[2]
        backModal.remove()
        console.log(allUsers)
    })
    return form

    }

const modalViewDepartment = async () => {

    const divAll = document.createElement("div")
    divAll.classList.add("divAll")

    const departName         = document.createElement("h2")
    departName.innerText     = "Nome do departamento"
    

    const divDescription     = document.createElement("div")
    divDescription.classList.add("div-description")


    const divSide = document.createElement("div")
    divSide.classList.add("div-side")

    const departDescription  = document.createElement("p")
    departDescription.innerText = "Descrição do departamento"
    const departCompany      = document.createElement("p")
    departCompany.innerText  = "Empresa Pertencente"

    const divSelectHireUsers = document.createElement("div")
    divSelectHireUsers.classList.add("div-hire-users")


    const selectToHire       = document.createElement("select")
    selectToHire.classList.add("select-to-hire")
    
    const optionDefault      = document.createElement("option")
    selectToHire.appendChild(optionDefault)
    optionDefault.innerText  = "Selecionar usuario"
   
    const buttonHire         = document.createElement("button")
    buttonHire.classList.add("button-hire")
    buttonHire.innerText = "Contratar"



    const listUsersDepart    = document.createElement("ul")
    listUsersDepart.classList.add("list-users-depart")

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

    divDescription.append(departDescription, departCompany)
    divSelectHireUsers.append(selectToHire,buttonHire)
    divSide.append(divDescription,divSelectHireUsers)
    userLi.append(username,nivel,companyName,buttonDismiss)
    listUsersDepart.appendChild(userLi)
    divAll.append(departName,divSide,listUsersDepart)


    return divAll
}

export {
    createModal,
    createDepartmentForm,
    editDepartmentForm,
    deleteDepartmentForm,
    editUserForm,
    deleteUserForm,
    modalViewDepartment,
}
import { renderDepartments } from "../dashBoardAdm/render.js"
import { createDepartmentRequest, editDepartment, getAllDepartments, getFullCompanies } from "./requests.js"

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

export {
    createModal,
    createDepartmentForm,
    editDepartmentForm
}
import { getAllDepartments, getFullCompanies } from "../global/requests.js";

const departments = await getAllDepartments()

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
    const buttonDelete = document.createElement("button")
    buttonDelete.classList.add("delete")

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

export {
    renderCompaniesOnSelect,
    renderDepartments,
    renderByCompany
}

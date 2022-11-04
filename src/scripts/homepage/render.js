import {getSectors} from "../global/requests.js"

const getSector = await getSectors()

const selectSetor = document.querySelector(".select-by-setor")

const companyList =document.createElement("ul")
companyList.classList.add("list-companies")

async function render(){

    const select = document.getElementById("select-setor")

    getSector.forEach(element => {
        console.log(element)
    const option = document.createElement("option")
    option.setAttribute("value", `${element.description}`)
    option.innerText = `${element.description}`

    select.appendChild(option)

    selectSetor.append(select)
});

  
}

async function renderCompanies(list){

    companyList.innerHTML = ""


    list.forEach((company) => {
        const cardLi = document.createElement("li")
        cardLi.classList.add("company")
    
        const companyName = document.createElement("h3")
        const companyTime = document.createElement("p")
        const companySetor = document.createElement("span")
    
        companyName.innerText = `${company.name}`
        companyTime.innerText = `${company.opening_hours}`
        companySetor.innerText = `${company.sectors.description}`
    
        cardLi.append(companyName, companyTime, companySetor)
        companyList.appendChild(cardLi)
        selectSetor.append(companyList)
    })
}

export {
    render,
    renderCompanies
}

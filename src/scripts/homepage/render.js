import {getSectors, getFullCompanies} from "../global/requests.js"

const getSector = await getSectors()
const getInfoCompanies = await getFullCompanies()
console.log(getInfoCompanies)

async function render(){
    const companyList =document.createElement("ul")
    companyList.classList.add("list-companies")
    
    const selectSetor = document.querySelector(".select-by-setor")

    const select = document.getElementById("select-setor")
    
    getSector.forEach(element => {
        
    const option = document.createElement("option")
    option.setAttribute("value", `${element.description}`)
    option.innerText = `${element.description}`

    select.appendChild(option)

    const cardLi = document.createElement("li")
    cardLi.classList.add("company")

    const companyName = document.createElement("h3")
    const companyTime = document.createElement("p")
    const companySetor = document.createElement("span")

    companyName.innerText = "Empresa name"
    companyTime.innerText = "10 Horas"
    companySetor.innerText = "setor"

    cardLi.append(companyName, companyTime, companySetor)
    
    companyList.appendChild(cardLi)
    selectSetor.append(select, companyList)
});
}

export {
    render,
}

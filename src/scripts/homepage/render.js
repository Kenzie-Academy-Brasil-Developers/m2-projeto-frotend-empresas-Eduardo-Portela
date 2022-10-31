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

    selectSetor.append(select)
});

    getInfoCompanies.forEach((company) => {
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
}

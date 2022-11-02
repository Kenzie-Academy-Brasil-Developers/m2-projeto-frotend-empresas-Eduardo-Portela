import { getFullCompanies } from "../global/requests.js";


const renderCompaniesOnSelect = async () => {
    const companies = await getFullCompanies()
    
    const select = document.querySelector("#select-company")
    
    companies.forEach(company => {
        const option = document.createElement("option")
        option.innerText = company.name
        select.appendChild(option)
    });

}

export {
    renderCompaniesOnSelect,
}
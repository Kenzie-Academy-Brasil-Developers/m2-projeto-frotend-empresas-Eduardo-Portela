import { getFullCompanies, listCompaniesBySector } from "../global/requests.js"
import {  renderCompanies } from "./render.js"


async function filterBySectors(){
    const getInfoCompanies = await getFullCompanies()
    const select = document.getElementById("select-setor")
    select.addEventListener("change", async () =>{
        
        const companiesFiltered = await listCompaniesBySector(select.value)
        renderCompanies(companiesFiltered)
        
        if (select.value == "Todos"){
            renderCompanies(getInfoCompanies)
        }
    })

}

filterBySectors()

export {filterBySectors}
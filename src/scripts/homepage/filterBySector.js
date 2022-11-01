import { getFullCompanies } from "../global/requests.js"
import {  renderCompanies } from "./render.js"


async function filterBySectors(){
    const getInfoCompanies = await getFullCompanies()
    const select = document.getElementById("select-setor")
    select.addEventListener("change", async () =>{
        const companiesFiltered = getInfoCompanies.filter((element) => element.sectors.description == select.value)
        renderCompanies(companiesFiltered)
        
        if (select.value == "Todos"){
            renderCompanies(getInfoCompanies)
        }
    })

}

filterBySectors()

export {filterBySectors}
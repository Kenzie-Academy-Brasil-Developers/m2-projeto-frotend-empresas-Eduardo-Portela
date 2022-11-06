import { getCompanyByUuid, getCoworkers, getFullCompanies, getInfosLogedUser } from "../global/requests.js"
import { createModal2, modalEditUserLoged } from "./modalFormEditUser.js"

const infoUserLoged = await getInfosLogedUser()
const getInfoCoworkers = await getCoworkers()


const renderUserInfos = async () => {
    const profile = document.querySelector(".user-settings")

    const profileInfo = document.createElement("div")
    const profileUsername = document.createElement("h2")
    const profileEmail = document.createElement("p")
    const profileNivel = document.createElement("p")
    const profileTypeWork = document.createElement("p")
    const profileButton = document.createElement("button")
    profileButton.classList.add("edit-logued")

    profileButton.addEventListener("click", async()=> {
        const editUser = await modalEditUserLoged()
        createModal2(editUser)
    })

    profileUsername.innerText = `${infoUserLoged.username}`
    profileEmail.innerText = `${infoUserLoged.email}`
    profileNivel.innerText = `${infoUserLoged.professional_level ? infoUserLoged.professional_level : ""}`
    profileTypeWork.innerText = `${infoUserLoged.kind_of_work ? infoUserLoged.kind_of_work : ""}`
    profileButton.classList.add("edit")
    profileInfo.classList.add("profile-info")

    profileInfo.append(profileEmail,profileNivel,profileTypeWork)
    profile.append(profileUsername,profileInfo,profileButton)

}

const renderCoworkers = async () => {

    const unemployedLi = document.createElement("li")
    unemployedLi.classList.add("unemployed")

    const descUnemployed = document.createElement("p")
    descUnemployed.innerText = "Você ainda não foi contratado"
    unemployedLi.appendChild(descUnemployed)

    const listCoworkers = document.querySelector(".coworks-list")

    if(getInfoCoworkers.length != 0){
        getInfoCoworkers[0].users.forEach(cowork => {
            const coworkLi = document.createElement("li")
            coworkLi.classList.add("cowork")

            const partenerName = document.createElement("p")
            const partenerNivel = document.createElement("p")

            partenerName.innerText = `${cowork.username}`
            partenerNivel.innerText = `${cowork.professional_level}`

            coworkLi.append(partenerName,partenerNivel)
           
            listCoworkers.appendChild(coworkLi)

            
        });
    }else{
        listCoworkers.appendChild(unemployedLi)
    }
}

const renderCompanyAndDepartName = async ()=> {
    const companyId = getInfoCoworkers[0]
    
    
    if(companyId){
    const companyById = await getCompanyByUuid(companyId.company_uuid)
    const jobInfo = document.querySelector(".job-info")

    jobInfo.insertAdjacentHTML("afterbegin", `
    <div class="company-info">
        <p>${companyById.name} - </p>
        <p>${companyId.name}</p>
    </div>
    `)
}
}
export {
    renderUserInfos,
    renderCoworkers,
    renderCompanyAndDepartName,
}
import { getInfosLogedUser } from "../global/requests.js"

const infoUserLoged = await getInfosLogedUser()

const renderUserInfos = async () => {
    const profile = document.querySelector(".user-settings")

    const profileInfo = document.createElement("div")
    const profileUsername = document.createElement("h2")
    const profileEmail = document.createElement("p")
    const profileNivel = document.createElement("p")
    const profileTypeWork = document.createElement("p")
    const profileButton = document.createElement("button")

    profileUsername.innerText = `${infoUserLoged.username}`
    profileEmail.innerText = `${infoUserLoged.email}`
    profileNivel.innerText = `${infoUserLoged.professional_level}`
    profileTypeWork.innerText = `${infoUserLoged.kind_of_work}`
    profileButton.classList.add("edit")
    profileInfo.classList.add("profile-info")

    profileInfo.append(profileEmail,profileNivel,profileTypeWork)
    profile.append(profileUsername,profileInfo,profileButton)

}

export {
    renderUserInfos,
}
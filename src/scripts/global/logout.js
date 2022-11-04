import { verify } from "./verifyLocalStorage.js"

export const logout = () => {
    const logout = document.getElementById("logout")
    logout.addEventListener("click", ()=>{
        localStorage.removeItem("token")
        verify()
        window.location.assign("../../../index.html")
    })
}

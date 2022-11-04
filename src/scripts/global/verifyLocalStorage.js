import { getLocalStorage } from "./localStorage.js"

export const verify = () => {
    const user = getLocalStorage("token")
    if(user == ""){
        window.location.assign("../pages/login.html")
    }
}
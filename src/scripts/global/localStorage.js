export const getLocalStorage = (key) => {
    const user = JSON.parse(localStorage.getItem(key)) || ""
    return user
}
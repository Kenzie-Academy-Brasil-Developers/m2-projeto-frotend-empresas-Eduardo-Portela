import { getLocalStorage } from "./localStorage.js"
import { toast } from "./toast.js"

const baseUrl = "http://localhost:6278"
const localToken = getLocalStorage("token")

async function getSectors(){
    try{
        const request = await fetch(`${baseUrl}/sectors`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const response = await request.json()
        
        return response

    }catch(err){
        console.log(err)
    }
}

async function getFullCompanies(){
    try{
        const request = await fetch(`${baseUrl}/companies`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const response = await request.json()

        return response

    }catch(err){
        console.log(err)
    }
}

async function registerUser(body1){
    try {
        const request = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body1)
        })
        if(request.ok){
            const response = await request.json()

            toast("Sucesso!", "Cadastro realizado com sucesso", "../assets/img/check.png")

            setTimeout(()=> {
                window.location.assign("../pages/login.html")
            },4000)

        }else{
            toast("Opss!", "Algo Deu errado", "../assets/img/error.png")
        }

    } catch(error) {
        console.log(error)
    }
}

async function loginRequest(body1){
    try {
        const request = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body1)
        })

        if(request.ok){
            const response = await request.json()
            localStorage.setItem("token", JSON.stringify(response))

            toast("Sucesso!", "Login realizado com sucesso", "../assets/img/check.png")
            isAdmim()

        }else{
            toast("Opss!", "Algo Deu errado", "../assets/img/error.png")
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function isAdmim(){
    try {
        const request = await fetch(`${baseUrl}/auth/validate_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            }
        })
        const response = await request.json()
        console.log(response)
        if(response.is_admin){
            setTimeout(()=> {
                window.location.assign("../pages/dashboardAdm.html")
            }, 4000)
        }else if(!response.is_admin){
            setTimeout(()=> {
                window.location.assign("../pages/dashBoardUser.html")
            }, 4000)
        }

    } catch (error) {
        console.log(error)
    }
}

async function createDepartmentRequest(body1){

    try {
        const request = await fetch(`${baseUrl}/departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}` 
            },
            body: JSON.stringify(body1)
        })
        if(request.ok){
            toast("Sucesso!", "Departamento cadastrado com sucesso", "../assets/img/check.png" )
        const response = await request.json()
        return response
    }
        
    } catch (error) {
        console.log(error)
    }
}

async function getAllDepartments(){
    try {
        const request = await fetch(`${baseUrl}/departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            }
        })

        const response = await request.json()
        return response
        
    } catch (error) {
        console.log(error)
    }
}

async function editDepartment(body1,uuid){
    try {
        const request = await fetch(`${baseUrl}/departments/${uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            },
            body: JSON.stringify(body1) 
        })
        
        const response = await request.json()
        return response

    } catch (error) {
        console.log(error)
    }
}

async function deleteDepartment(uuid){
    try {
        const request = await fetch(`${baseUrl}/departments/${uuid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            }
        })
        
    } catch (error) {
        console.log(error)
    }
}

async function getAllUsers(){
    try {
        const request = await fetch(`${baseUrl}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            }
        })

        const response = await request.json()

        return response
    } catch (error) {
        console(error)
    }
}

export{
    getSectors,
    getFullCompanies,
    registerUser,
    loginRequest,
    isAdmim,
    createDepartmentRequest,
    getAllDepartments,
    editDepartment,
    deleteDepartment,
    getAllUsers,
}
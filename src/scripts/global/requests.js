import { getLocalStorage } from "./localStorage.js"
import { toast } from "./toast.js"

const baseUrl = "http://localhost:6278"
const localToken =  getLocalStorage("token")

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
            console.log(request.json())
            toast("Opss!", "Algo Deu errado", "../assets/img/error.png")
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function isAdmim(){
    const localTokenV =  await getLocalStorage("token")
    try {
        const request = await fetch(`${baseUrl}/auth/validate_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localTokenV.token}`
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

async function listDepartmentsByCompany(uuid){
    try {
        const request = await fetch(`${baseUrl}/departments/${uuid}`,{
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            }
        })
        const response = await request.json()
        return response
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
    }else{
        console.log(request.json())
        toast("Opss!", "Algo Deu errado", "../assets/img/error.png")
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

        if(request.ok){
            const response = await request.json()
            toast("Sucesso!", "Departamento editado com sucesso", "../assets/img/check.png")
            return response
        }else{
            console.log(request.json())
            toast("Opss!", "Algo Deu errado", "../assets/img/error.png")
        }
        

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

async function editUser(body1,uuid){
    try {
        const request = await fetch(`${baseUrl}/admin/update_user/${uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            },
            body: JSON.stringify(body1)
        })

        if(request.ok){
            const response = await request.json()
            toast("Sucesso!", "Usuário editado com sucesso", "../assets/img/check.png")
            return response
        }else{
            console.log(request.json())
            toast("Opss!", "Algo Deu errado", "../assets/img/error.png")
        }
    } catch (error) {
        console.log(error)
        
    }
}

async function deleteUser(uuid){
    try {
        const request = await fetch(`${baseUrl}/admin/delete_user/${uuid}`, {
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

async function getUmployedUsers(){
    const request = await fetch(`${baseUrl}/admin/out_of_work`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localToken.token}`
        }
    })

    const response = await request.json()
    return response
}

async function hireUser(body1){
    try {
        const request = await fetch(`${baseUrl}/departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            },
            body: JSON.stringify(body1)
        })

        if(request.ok){
            const response = await request.json()
            toast("Sucesso!", "Usuario contratado com sucesso!", "../assets/img/check.png")
            return response

        }else{
            console.log("Algo deu errado")
        }
    } catch (error) {
        console.log(error)
    }
}

async function getInfosLogedUser(){
    try {
        const request = await fetch(`${baseUrl}/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${localToken.token}`
            }
        })
        const response = await request.json()
        return response

    } catch (error) {
        console.log(error)
    }
}

async function editInfosLogedUser(body1){
    try {
        const request = await fetch(`${baseUrl}/users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            },
            body: JSON.stringify(body1)
        })
        if(request.ok){
            const response = await request.json()
            toast("Sucesso!", "Dados Alterados com sucesso", "../assets/img/check.png")
            return response
        }


        
    } catch (error) {
        console.log(error)
    }
}

async function getCoworkers(){
    try {
        const request = await fetch(`${baseUrl}/users/departments/coworkers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            }
        })

        if(request.ok){
            const response = await request.json()
            return response
        }

    } catch (error) {
        console.log(error)
    }
}

async function getCompanyByUuid(uuid){
    const companies = await getFullCompanies()
    let company = {}
    companies.forEach(element => {
        if(element.uuid == uuid){
            company = element

        }
    });

    return company
}

async function dismissWorker(uuid){
    try {
        const request = await fetch(`${baseUrl}/departments/dismiss/${uuid}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localToken.token}`
            }
        })
        if(request.ok){
            toast("Sucesso!", "Funcionario demitido com sucesso", "../assets/img/check.png")
            const response = await request.json()
            return response
        }else{
            toast("Opss!", "Algo Deu errado", "../assets/img/error.png")
        }


    } catch (error) {
        console.log(error)
    }
}

async function listCompaniesBySector(sector){
    try {
        const request = await fetch(`${baseUrl}/companies/${sector}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await request.json()

        return response
    } catch (error) {
        console.log(error)
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
    editUser,
    deleteUser,
    getUmployedUsers,
    hireUser,
    getInfosLogedUser,
    editInfosLogedUser,
    getCoworkers,
    getCompanyByUuid,
    dismissWorker,
    listCompaniesBySector,
    listDepartmentsByCompany,

}
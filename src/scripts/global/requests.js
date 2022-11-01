import { toast } from "./toast.js"

const baseUrl = "http://localhost:6278"

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

        }else{
            toast("Opss!", "Algo Deu errado", "../assets/img/error.png")
        }
        
    } catch (error) {
        console.log(error)
    }
}

export{
    getSectors,
    getFullCompanies,
    registerUser,
    loginRequest
}
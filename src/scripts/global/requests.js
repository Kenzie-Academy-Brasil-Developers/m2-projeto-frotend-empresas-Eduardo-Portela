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

export{
    getSectors,
    getFullCompanies,
}
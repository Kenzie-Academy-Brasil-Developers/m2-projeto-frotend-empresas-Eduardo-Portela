
async function render(list){
    const companyList =document.createElement("ul")
    companyList.classList.add("list-companies")

    const selectSetor = document.querySelector(".select-by-setor")
    console.log(companyList)
    

    const select = document.createElement("select")
    select.setAttribute("name", "setor")
    select.id = "select-setor"

    select.insertAdjacentHTML("beforeend", `
    <option value="">Selecionar Setor</option>
                <option value="">Selecionar Setor</option>
                <option value="">Selecionar Setor</option>
                <option value="">Selecionar Setor</option>
    `)


    const cardLi = document.createElement("li")
    cardLi.classList.add("company")

    const companyName = document.createElement("h3")
    const companyTime = document.createElement("p")
    const companySetor = document.createElement("span")

    companyName.innerText = "Empresa name"
    companyTime.innerText = "10 Horas"
    companySetor.innerText = "setor"

    cardLi.append(companyName, companyTime, companySetor)
    companyList.appendChild(cardLi)
    selectSetor.append(select, companyList)
}

export {
    render,

}

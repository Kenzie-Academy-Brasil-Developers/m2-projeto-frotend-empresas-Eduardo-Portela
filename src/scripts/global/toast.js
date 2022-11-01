const toast = (title, message,imgPath) => {
    const body = document.querySelector("body")

    const container = document.createElement("div")
    container.classList.add("toast-container")

    const divImg2 = document.createElement("div")
    divImg2.classList.add("div-img2")

    const icon = document.createElement("img")
    icon.alt = `mensagem de ${title}`

    if(title == "Sucesso!"){
        container.classList.add("sucess-toast")
        icon.src = imgPath
    } else{
        container.classList.add("error-toast")
        icon.src = imgPath
    }

    const textContainer = document.createElement("div")

    const h3 = document.createElement("h3")
    h3.innerText = title

    const span = document.createElement("span")
    span.innerText = message

    divImg2.appendChild(icon)

    textContainer.append(h3, span)

    container.append(divImg2,textContainer)

    body.appendChild(container)
}

export{
    toast
}
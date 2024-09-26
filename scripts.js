// Selecionando todos os inputs para validá-los 
 const inputText = document.querySelectorAll('input[type="text"]')
 // Validando os inputs 
 inputText.forEach(input => {
     input.oninput = () => {
         // Remove caracteres que não são números
         let value = input.value.replace(/[^0-9]/g, "");
         // Atualiza o valor do input
         input.value = value.trim();
        };
    });

    // selecionando cada input separadamente para captura de dados
const amountNumbers = document.getElementById("draw")
const initialValue = document.getElementById("initial")
const finalValue = document.getElementById("final")

    // Selecionando elementos do main 
    const main = document.querySelector("main")
const form = document.querySelector("form")
const section = document.querySelector("section")

form.onsubmit = (event) => {
    event.preventDefault()

const draw = {
    amount: amountNumbers.value,
initialSample: initialValue.value,
finalSample: finalValue.value,
}

drawNumbers(draw)


}


function drawNumbers(draw) {

    try {
    //Removendo parte do main para executar o código 
    section.classList.add("remove")
    form.classList.add("remove")
    
    // Criando a div que irá conter os itens do sorteio
 const space = document.createElement("div")
 space.classList.add("space", "container")

 // Criando o título da div 
const result = document.createElement("h1")
result.textContent = `Resultado do sorteio`
result.classList.add("result")

// Criando o sub-título 
const subTitle = document.createElement("h2")
subTitle.textContent = `1º resultado`
subTitle.classList.add("sub-title")

// Criando uma caixa para unir os dois acima 
const title = document.createElement("div")
title.append(result, subTitle)

// Criando o botão 
const button = document.createElement("button")
button.innerHTML = `SORTEAR NOVAMENTE  <img src="./assets/Frame.svg" alt="rotate arrow">`

 // Adicionando a div no main e os itens na div 
space.append(title)

 main.append(space, button)

    } catch (error) {
        alert("Não foi possível realizar o sorteio")
        console.log(error)
    }
    
}


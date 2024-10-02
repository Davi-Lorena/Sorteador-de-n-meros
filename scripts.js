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
const checkbox = document.querySelector('input[type="checkbox"]')

form.onsubmit = (event) => {
    event.preventDefault() // Tira a atualização da página com o envio do formulário 

    // Objeto que guardará os dados 
const draw = {
    amount: parseInt(amountNumbers.value),
initialSample: parseInt(initialValue.value),
finalSample: parseInt(finalValue.value),
} // O parceInt transforma strings em números inteiros 

// Condição de existência do sorteio, garantindo que não haverão mais números a serem sorteados do que a quantidade disponível no espaço amostral
if (draw.amount > (draw.initialSample + draw.finalSample + 1)) {
    alert("O valor de números a serem selecionados é maior que o espaço amostral")
    return
} 
    


var spaceSample = []

for(let i = draw.initialSample; i <= draw.finalSample; i++) {
    spaceSample.push(i)
}

drawStructure(draw, spaceSample)

}


function drawStructure(draw, spaceSample) {

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

// Criando as divs para exibir os números 
const divSortedNumbers = document.createElement("div")
divSortedNumbers.classList.add("div-sorted-numbers")

 // Adicionando a div no main e os itens na div 
space.append(title, divSortedNumbers)
 main.append(space)

 // Criando a const que realizará o sorteio 
const sortedNumbers = drawNumbers(draw.amount, spaceSample)
let i = 0 

function showNumbers() {
    if(i < sortedNumbers.length) {
        const numberSorted = document.createElement("span")
        numberSorted.classList.add("number-sorted")
        numberSorted.textContent = sortedNumbers[i]
    const animationDiv = document.createElement("div")
    animationDiv.classList.add("animation-number")
    animationDiv.append(numberSorted)
        divSortedNumbers.append(animationDiv)
        i++ 

        setTimeout(showNumbers, 3500)
    } else {
        const button = document.createElement("button")
        button.classList.add("appear-button")
        button.innerHTML = `SORTEAR NOVAMENTE  <img src="./assets/Frame.svg" alt="rotate arrow">`

        // Um pequeno atraso antes de mudar a opacidade para 1
setTimeout(() => {
    button.style.opacity = 1; // Transição de opacidade
}, 50); // Atraso pequeno para permitir que o botão seja renderizado antes de mudar a opacidade

        
        button.onclick = () => {
        main.innerHTML = ""
        
        drawStructure(draw, spaceSample)
        }
        
        main.append(button)
        
    }
}


  

// Executa a função que exibe os números 
setTimeout(showNumbers, 500)


    } catch (error) {
        alert("Não foi possível realizar o sorteio")
        console.log(error)
    }
    
}





function drawNumbers(amount, spaceSample) {
const sortedNumbers = []
const copySpaceSample = [...spaceSample] // Cópia para não modificar o array original, que terá um re-sorteio

// Sorteando números únicos 
while (sortedNumbers.length < amount) {
    const random = Math.floor(Math.random() * copySpaceSample.length)
    const selectedNumber = copySpaceSample[random]
    sortedNumbers.push(selectedNumber)

if (checkbox.checked) {
    copySpaceSample.splice(random, 1)
}

}

return sortedNumbers

}

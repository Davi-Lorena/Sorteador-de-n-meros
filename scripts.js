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


//Evento de "envio" do formulário
form.onsubmit = (event) => {
    event.preventDefault() // Tira a atualização da página com o envio do formulário 

    // Objeto que guardará os dados 
const draw = {
    amount: parseInt(amountNumbers.value),
initialSample: parseInt(initialValue.value),
finalSample: parseInt(finalValue.value),
} // O parceInt transforma strings em números inteiros 

// Condição de existência do sorteio, garantindo que não haverão mais números a serem sorteados do que a quantidade disponível no espaço amostral
if (draw.amount > (draw.finalSample - draw.initialSample)) {
    alert("O valor de números a serem sorteados é maior que o espaço amostral")
    return
} 
// Condição que garante que o espaço amostral exista 
if (draw.initialSample >= draw.finalSample) {
    alert("Space amostral não correspondente")
    return
}
    

// Array que conterá o espaço amostral selecionado pelo usuário
var spaceSample = []

// Adiciona os valores dos inputs que determinam o espaço amostral ao array 
for(let i = draw.initialSample; i <= draw.finalSample; i++) {
    spaceSample.push(i)
}

// Executando a função do sorteio 
drawStructure(draw, spaceSample)

}

// Variável que apresentará o número de resultados do sorteio
let execute = 0 

// Função que realizará o sorteio, em parênteses estão os parâmetros capturados para essa função, sendo "draw" os valores do objeto e "spaceSample" os valores do array
function drawStructure(draw, spaceSample) {

    try {
    //Removendo o conteúdo do main para executar o código 
    main.classList.remove("grid")
   main.innerHTML = ""
    
    // Criando a div que irá conter os itens do sorteio
 const space = document.createElement("div")
 space.classList.add("space", "container")

 // Criando o título da div 
const result = document.createElement("h1")
result.textContent = `Resultado do sorteio`
result.classList.add("result")

// Criando o sub-título 
const subTitle = document.createElement("h2")
execute++ // Aqui faz com que seja apresentado o número de resultados 
subTitle.textContent = `${execute}º resultado` 
subTitle.classList.add("sub-title")

// Criando uma caixa para unir os dois acima 
const title = document.createElement("div")
title.append(result, subTitle)

// Criando a div para exibir os números 
const divSortedNumbers = document.createElement("div")
divSortedNumbers.classList.add("div-sorted-numbers")

 // Adicionando o título e o espaço de apresentação dos números ao main por meio de uma div intermediária 
space.append(title, divSortedNumbers)
 main.append(space)

 // Criando a const que realizará o sorteio
const sortedNumbers = drawNumbers(draw.amount, spaceSample)

// Criando uma variável que auxiliará na captura dos números sorteados 
let i = 0 

// Função que exibirá os números sorteados 
function showNumbers() {
    // condição de existência para sortear novamente. 
    if(i < sortedNumbers.length) {
        // Criando e estilizando a span que conterá um número sorteado
        const numberSorted = document.createElement("span")
        numberSorted.classList.add("number-sorted")
        numberSorted.textContent = sortedNumbers[i] // O conteúdo dela será o número sorteado que estará, nesse momento, na variável "i"

        // Criando e estilizando a div realizará a animação de exibição 
    const animationDiv = document.createElement("div")
    animationDiv.classList.add("animation-number")
    // Adicionando o span na div 
    animationDiv.append(numberSorted)
    // Adicionando a div individual dos números ao espaço de todos eles 
        divSortedNumbers.append(animationDiv)
        // Incrementando mais um número para continuar o processo, até que o valor da variável seja igual ao dos números sorteados e finalize a exibição 
        i++ 

        // Método que exibirá os números com um atraso para a animação 
        setTimeout(showNumbers, 3500)

    } else { // Criando o botão "sortear novamente" somente após os números sorteados serã exibidos 
        const button = document.createElement("button")
        button.classList.add("appear-button")
        button.innerHTML = `SORTEAR NOVAMENTE  <img src="./assets/Frame.svg" alt="rotate arrow">`

        // Um pequeno atraso antes de mudar a opacidade para 1
setTimeout(() => {
    button.style.opacity = 1; // Transição de opacidade
}, 50); // Atraso pequeno para permitir que o botão seja renderizado antes de mudar a opacidade

        // Adicionando o evento para sortear novamente 
        button.onclick = () => {
            // Limpando o conteúdo do main para que não haja mais de um sorteio realizado na tela 
        main.innerHTML = ""
        // Realiza a função novamente, com os mesmos parâmetros 
        drawStructure(draw, spaceSample)
        }

        // Adiciona o botão ao main 
        main.append(button)
        
    }
}

  

// Executa a função que exibe os números com um pequeno atraso 
setTimeout(showNumbers, 500)

// Mensagem de erro que será exibida se algo der errado 
    } catch (error) {
        alert("Não foi possível realizar o sorteio")
        console.log(error)
    }
    
}

// Função que sorteará os números, de fato 
function drawNumbers(amount, spaceSample) {
    // Constante que irá capturar os números sorteados 
const sortedNumbers = []
// Cópia para não modificar o array original, que poderá ter um novo sorteio 
const copySpaceSample = [...spaceSample] 

// Sorteando números únicos enquanto o comprimento do array de números sorteados for menor que a quantidade desejada de números sorteados
while (sortedNumbers.length < amount) {
    // Essa constante realiza uma operação matemática que multiplica valores do espaço amostral transformando-os em casas decimais e os arredondando para o valor inteiro mais próximo (Realizado pelo math.floor)
    const random = Math.floor(Math.random() * copySpaceSample.length)
    // Seleciona um número sorteado e o adiciona no array de números sorteados 
    const selectedNumber = copySpaceSample[random]
    sortedNumbers.push(selectedNumber)

    // Se o usuário não desejar repetir números, essa condição retira o número já exibido do array 
if (checkbox.checked) {
    copySpaceSample.splice(random, 1)
}

}
// Retorna o array de números sorteados 
return sortedNumbers

}

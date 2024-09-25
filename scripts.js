// Selecionando elementos
 const inputText = document.querySelectorAll('input[type="text"]')
const form = document.querySelector("form")

 // Validando o forms 
 inputText.forEach(input => {
    input.oninput = () => {
        // Remove caracteres que não são números
        let value = input.value.replace(/[^0-9]/g, "");
        // Atualiza o valor do input
        input.value = value.trim();
    };
});

form.onsubmit = (event) => {
event.preventDefault()

}
 


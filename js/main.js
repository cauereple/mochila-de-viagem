const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')

form.addEventListener("submit", evento => {
    evento.preventDefault()

    const nome = evento.target.elements['nome'].value
    const quantidade = evento.target.elements['quantidade'].value

    criaElemento(nome, quantidade)
})

function criaElemento(nome, quantidade) {

    // <li class="item"><strong>7</strong>Camisa</li>
    const novoItem = document.createElement('li')
    const numeroItem = document.createElement('strong')
    
    novoItem.classList.add("item")
    
    // innerHTML recebe o que está dentro da variável quantidade, ou seja, aquilo que estamos escrevendo dentro do input quantidade na nossa página
    numeroItem.innerHTML = quantidade
    // appendChild nos deixa colocar um elemento HTML dentro de outro. No nosso caso, queremos que a tag <strong> fique dentro da tag <li>
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += nome
    
    lista.appendChild(novoItem)
}
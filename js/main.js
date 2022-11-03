const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || [];

console.log(itens)
console.log([])

itens.forEach( elemento => {
    console.log(elemento.nome, elemento.quantidade)
})


form.addEventListener("submit", evento => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    criaElemento(nome.value, quantidade.value)

    nome.value = ""
    quantidade.value = ""
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

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }
    
    // push serve para inserir algo dentro de um array
    itens.push(itemAtual)

    localStorage.setItem("itens", JSON.stringify(itens)) //JSON.stringfy transforma o objeto em uma string

}
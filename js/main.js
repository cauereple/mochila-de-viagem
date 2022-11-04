const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []; // usamos o JSON.parse para transformar de volta o nosso objeto transformado em string lá embaixo, em objeto


itens.forEach( elemento => {
    criaElemento(elemento)
})


form.addEventListener("submit", evento => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const requerimento = document.querySelector(".requerimento")
    const existe = itens.find(elemento => elemento.nome === nome.value) //fazemos um find no nosso Array tentando encontrar os 2 nomes, e se o nome é encontrado, atualizamos o elemento, se ele nao é encontrado, criamos o elemento

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[existe.id] = itemAtual

    } else {
        if(nome.value != "" && quantidade.value != "") {

            itemAtual.id = itens.length

            criaElemento(itemAtual)
            
            // push serve para inserir algo dentro de um array
            itens.push(itemAtual)
    
            localStorage.setItem("itens", JSON.stringify(itens)) //JSON.stringfy transforma o objeto em uma string

            form.removeChild(requerimento)
    
        } else {
            if(!requerimento){
                criaParagrafo()
            }
        }
    }

    nome.value = ""
    quantidade.value = ""

    nome.focus()
})

function criaElemento(item) {

    // <li class="item"><strong>7</strong>Camisa</li>
    const novoItem = document.createElement('li')
    const numeroItem = document.createElement('strong')
    
    novoItem.classList.add("item")
    
    // innerHTML recebe o que está dentro da variável quantidade, ou seja, aquilo que estamos escrevendo dentro do input quantidade na nossa página
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    // appendChild nos deixa colocar um elemento HTML dentro de outro. No nosso caso, queremos que a tag <strong> fique dentro da tag <li>
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    
    lista.appendChild(novoItem)
}

function criaParagrafo() {
    const paragrafo = document.createElement('p')
    paragrafo.classList.add("requerimento")
    const texto = document.createTextNode("Você deve escrever alguma coisa!")

    form.appendChild(paragrafo)
    paragrafo.appendChild(texto)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
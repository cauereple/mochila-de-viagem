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

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {
        if(nome.value != "" && quantidade.value != "") {

            itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0

            criaElemento(itemAtual)
            
            // push serve para inserir algo dentro de um array
            itens.push(itemAtual)
    
            // usamos essa linha para escrever no localStorage
            localStorage.setItem("itens", JSON.stringify(itens)) //JSON.stringfy transforma o objeto em uma string

            if(requerimento) {
                form.removeChild(requerimento)
            }
    
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

    novoItem.appendChild(botaoDeleta(item.id))
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

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button')
    const lixeira = document.createElement('img')
    
    elementoBotao.classList.add("botao")
    lixeira.classList.add("lixeira")

    lixeira.setAttribute("src", "/img/cesto-de-lixo.png")

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    elementoBotao.appendChild(lixeira)

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    // remove um item do array
    // o splice busca o que quer remover e a partir dali, remove X itens (no nosso caso será apenas 1 item removido)
    // o findIndex retorna um index de um elemento qualquer, vamos passar o elemento e buscamos o elemento.id e comparamos para ver se é igual ao id que estamos passando
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
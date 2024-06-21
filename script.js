const btnAdicionarItem = document.querySelector('.direita__bt-novo-item')
const formulario = document.querySelector('.formulario')
const textArea = document.querySelector('textarea')
const uLista = document.querySelector('ul')
const excluirTodas = document.querySelector('.apagar-tudo')
const cancelar = document.querySelector('.cancelar')
const vazio = document.querySelector('.vazio')
const mais = document.querySelector('.mais')
const menos = document.querySelector('.menos')
const quantidade = document.querySelector('.numero')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

let numero = 1
mais.addEventListener('click', (evento) => { 
    debugger
    evento.preventDefault()
    if (numero < 20) {
        numero = numero + 1
        quantidade.innerHTML = numero
    }
})
menos.addEventListener('click', (evento) => { 
    evento.preventDefault()
    if (numero > 1) {
        numero = numero - 1
        quantidade.innerHTML = numero
    }
})

function estaVazio() {
    if ( document.querySelector('.item-lista') === null) {
        uLista.classList.add('hidden')
        vazio.classList.remove('hidden')
    } else {
        uLista.classList.remove('hidden')
        vazio.classList.add('hidden')
    }
}

btnAdicionarItem.addEventListener('click', () => {
    formulario.classList.toggle('hidden')
})

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('item-lista')
    if (tarefa.completa) {
        li.classList.add('completo')
    }

    const button = document.createElement('button')
    button.classList.add('completo')
    button.onclick = () => {
        tarefa.completa = !tarefa.completa
        li.classList.toggle('completo')
        atualizarTarefas()
    }

    const text = document.createElement('p')
    text.classList.add('lista__p')
    text.innerHTML = numero + 'x ' + tarefa.descricao

    const button2 = document.createElement('button')
    button2.classList.add('excluir')
    button2.onclick = () => {
        li.remove()
        tarefas = tarefas.filter(tarefaItem => tarefaItem.descricao !== tarefa.descricao)
        estaVazio()
        atualizarTarefas()
    }

    li.append(button, text, button2)

    return li
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()
    console.log('Submit');
    const tarefa = {
        descricao: textArea.value,
        completa: false
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa)
    uLista.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = ''
    formulario.classList.add('hidden')
    numero = 1
    quantidade.innerHTML = numero
    estaVazio()
})

cancelar.onclick = (evento) => {
    evento.preventDefault();
    textArea.value = ''
    numero = 1
    quantidade.innerHTML = 1
    formulario.classList.add('hidden')
}

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    uLista.append(elementoTarefa);
});

excluirTodas.onclick = () => {
    document.querySelectorAll('.item-lista').forEach(elemento => {
        elemento.remove()
    })
    tarefas = []
    estaVazio()
    atualizarTarefas()
}

estaVazio()
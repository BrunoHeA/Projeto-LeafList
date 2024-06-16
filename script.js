const btnAdicionarItem = document.querySelector('.direita__bt-novo-item')
const formulario = document.querySelector('.formulario')
const textArea = document.querySelector('textarea')
const uLista = document.querySelector('ul')
const excluirTodas = document.querySelector('.apagar-tudo')
const cancelar = document.querySelector('.cancelar')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
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
    text.innerHTML = tarefa.descricao

    const button2 = document.createElement('button')
    button2.classList.add('excluir')
    button2.onclick = () => {
        li.remove()
        tarefas = tarefas.filter(tarefaItem => tarefaItem.descricao !== tarefa.descricao)
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
})

cancelar.onclick = (evento) => {
    evento.preventDefault();
    textArea.value = ''
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
    atualizarTarefas()
}
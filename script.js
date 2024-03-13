let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefas = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');


inputNovaTarefa.addEventListener('keypress', (e) =>{
    
    if(e.keyCode == 13){
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        //TODO:: Adicionar a tarefa ao HTML
    }
});

btnAddTarefas.addEventListener('click', (e) => {

    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    }
    //TODO:: Adicionar a tarefa ao HTML
});



function gerarId() {
    return Math.floor(Math.random() * 30000);
}

function adicionarTarefa(tarefa) {
    let li = criarTagLi();
    listaTarefas.appendChild(li);
}

function criarTagLi() {
    let li = document.createElement('li');

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"  ></i>';

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = ' <i class="fa fa-trash"></i>';

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    div.appendChild(div);
    return li
}
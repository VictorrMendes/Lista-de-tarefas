//variaveis.
let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefas = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
let btnExcluirTarefas = document.querySelector('#btnExcluirTarefas');


let dbTarefas = [];
const KEY_LOCAL_STORAGE = 'listaTarefas';
obterTarefasLocalStorage();
renderizarListaTarefaHtml();

//Eventos
inputNovaTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        };
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e)=>{
    alternarJanelaEdicao();
});

btnAddTarefas.addEventListener('click', (e) => {
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    };
    adicionarTarefa(tarefa);
});

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa = {
        nome:inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefaAtual){

    const indeceTarefa = obterIndiceTarefasPorId(idTarefa);
    dbTarefas[indeceTarefa] = tarefa;
    salvarTarefasLocalStorage();

    let li = criarTagLi(tarefa);
    listaTarefas.replaceChild(li,tarefaAtual);
    alternarJanelaEdicao()
    } else{
        alert('Elemento Html Não encontrado');
    }

})
btnExcluirTarefas.addEventListener('click', ()=>{
    apagarTodasTarefas();
    

})

//funções

function gerarId() {
    return Math.floor(Math.random() * 30000);
}

function adicionarTarefa(tarefa) {
    dbTarefas.push(tarefa);
    salvarTarefasLocalStorage();
    renderizarListaTarefaHtml();
    
}

function criarTagLi(tarefa) { 
    let li = document.createElement('li');
    li.id =tarefa.id

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"  ></i>';
    btnEditar.setAttribute('onclick' , 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = ' <i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick' , 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div); 
    return li;
}

 function editar(idTarefa){
        let li = document.getElementById('' + idTarefa + "");
        
        if(li){
            idTarefaEdicao.innerHTML = '#' + idTarefa;
            inputTarefaNomeEdicao.value = li.innerText;
            alternarJanelaEdicao()

    } else{
        alert('Elemento Html Não encontrado');
    }
}

function excluir(idTarefa){

    let confirmacao = window.confirm('Tem certeza que deseja excluir?');

    if(confirmacao){

       const indeceTarefa = obterIndiceTarefasPorId(idTarefa);

        dbTarefas.splice(indeceTarefa, 1);
        salvarTarefasLocalStorage();


        let li =document.getElementById('' + idTarefa + '')
        if(li){
            listaTarefas.removeChild(li);
            localStorage.setItem('KEY_LOCAL_STORAGE' , JSON.stringify(dbTarefas));

        } else{
        alert('Elemento Html Não encontrado');
         }
    }
}

function alternarJanelaEdicao() {

    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}

function salvarTarefasLocalStorage(){
    localStorage.setItem('KEY_LOCAL_STORAGE' , JSON.stringify(dbTarefas));

}

function renderizarListaTarefaHtml() {
    listaTarefas.innerHTML = ''
    for( let i=0 ; i < dbTarefas.length ; i++) {
        let li = criarTagLi(dbTarefas[i]); 
        listaTarefas.appendChild(li);
    }
    inputNovaTarefa.value = "";
}

function obterIndiceTarefasPorId(idTarefa){
    const indeceTarefa = dbTarefas.findIndex(t => t.id == idTarefa);

        if(indeceTarefa < 0){
            throw new Error('Id da tarefa não encontrado', idTarefa);
        }
        return indeceTarefa;
        
}

function obterTarefasLocalStorage() {

    if(localStorage.getItem('KEY_LOCAL_STORAGE')) {
        dbTarefas = JSON.parse(localStorage.getItem('KEY_LOCAL_STORAGE')); 
    }
}
function apagarTodasTarefas(){
    localStorage.clear(KEY_LOCAL_STORAGE);
    dbTarefas = [];
    renderizarListaTarefaHtml();
}
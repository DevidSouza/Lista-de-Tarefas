let id = 0;

function add_tarefa() {
    let input = document.getElementById("input").value;
    let capitaliza = String(input[0]).toUpperCase() + String(input).substring(1)

    document.getElementById("area-tarefa").innerHTML +=
        "<div id='item" + id + "' class='tarefa-e-button-del'><input id='btn-checkout" + id + "' class='btn-checkout' name='card' type='radio'><div onclick='executa_complete_task()' id='tarefa" + id + "' class='tarefa'><h4 id='texto" + id + "' class='texto'>" + capitaliza + "</h4></div></div><button onclick='executa_del_tarefa()' id='button" + id + "' class='del-button'><img src='icons/lixeira.png'style='max-width: 15%; color: white;'>Deletar</button>";

    id += 1;

};

// CAPTURA ID DE UMA TAG FILHO E DELETA
function executa_del_tarefa() {
    var area_tarefa = document.getElementById('area-tarefa');
    area_tarefa.onclick = area_tarefa.addEventListener('click', del_tarefa)
}

function del_tarefa(e) {
    let button_id = String(e.target.id);
    let item_id = String("item" + get_number(button_id));

    if (button_id.includes('button')) {
        remove_id(item_id);
        remove_id(button_id);
    }
    else {
        return
    }
}

function remove_id(tarefa_id) {
    document.getElementById(tarefa_id).remove();
}

function get_number(str) {
    number = ''
    for (caracter in str) {
        if ('1234567890'.includes(String(str[caracter]))) {
            number += String(str[caracter])
        }
    }
    return number
}


// =============================================================


function executa_complete_task() {
    let area_tarefa = document.getElementById('area-tarefa');
    area_tarefa.onclick = area_tarefa.addEventListener('click', complete_task);
}

function complete_task(e) {
    let tarefa_id = String(e.target.id);
    let checked_btn_id = 'btn-checkout' + get_number(tarefa_id);
    let item_id = 'item' + get_number(checked_btn_id);

    if (tarefa_id.includes('tarefa')) {
        task_checked(item_id, checked_btn_id);
    }
    else {
        return
    }
}

function task_checked(tarefa, btn_id) {
    if (document.getElementById(tarefa).style.backgroundColor === 'rgba(16, 233, 81, 0.808)') {
        console.log('Deu certo');
        document.getElementById(tarefa).style.backgroundColor = 'white';
        document.getElementById('texto' + get_number(tarefa)).style.textDecoration = 'none'
        document.getElementById(tarefa).style.opacity = '1';
        document.getElementById(btn_id).checked = false;
        return
    };
    document.getElementById(tarefa).style.backgroundColor = 'rgba(16, 233, 81, 0.808)';
    document.getElementById(tarefa).style.opacity = '0.7';
    document.getElementById('texto' + get_number(tarefa)).style.textDecoration = 'line-through';
    document.getElementById(btn_id).checked = true;
}



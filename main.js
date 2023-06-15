let id = 0;
let todas_as_tarefas = [];
let btn_add = document.getElementById("add-button");
let input = document.getElementById("input"); 

// Adiciona uma tarefa ao clicar na tecla Enter
document.addEventListener('keydown', (e)=> {
    if(e.key == "Enter"){
        e.preventDefault()
      btn_add.click();
    }
});


function add_task() {
    let capitaliza = String(input.value);
    if (input !== '') {
        capitaliza = capitaliza[0].toUpperCase() + capitaliza.substring(1);
    };
    todas_as_tarefas.unshift("<div onclick='execute_complete_task()' id='item" + id + "' class='tarefa-e-button-del'><input id='btn-checkout" + id + "' class='btn-checkout' name='card' type='radio'><div id='tarefa" + id + "' class='tarefa'><h4 id='texto" + id + "' class='texto'>" + capitaliza + "</h4></div></div><button onclick='execute_del_task()' id='button" + id + "' class='del-button'><img src='icons/lixeira.png'style='max-width: 15%; color: white;'>Deletar</button>");

    document.getElementById("area-tarefa").innerHTML = ''

    for (tarefa in todas_as_tarefas) {
        document.getElementById("area-tarefa").innerHTML += todas_as_tarefas[tarefa]
    }

    input.value = ""
    input.focus()

    id += 1;
};

// CAPTURA ID DE UMA TAG FILHO E DELETA
function execute_del_task() {
    let area_tarefa = document.getElementById('area-tarefa');
    area_tarefa.onclick = area_tarefa.addEventListener('click', del_task)
}

function del_task(e) {
    let button_id = String(e.target.id);
    let item_id = String("item" + get_number(button_id));

    if (button_id.includes('button')) {
        for (task in todas_as_tarefas) {
            if (todas_as_tarefas[task].includes(item_id)) {
                remove_id(item_id);
                remove_id(button_id);
                delete todas_as_tarefas[task]
                return
            }
        }
    }
    else {
        return
    }
}

function remove_id(id_from_task) {
    document.getElementById(id_from_task).remove();
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


function execute_complete_task() {
    let area_tarefa = document.getElementById('area-tarefa');
    area_tarefa.onclick = area_tarefa.addEventListener('click', complete_task);
}

function complete_task(e) {
    let id_from_task = String(e.target.id);
    let checked_btn_id = 'btn-checkout' + get_number(id_from_task);
    let item_id = 'item' + get_number(checked_btn_id);

    if (id_from_task.includes('tarefa')) {
        checked_task(item_id, checked_btn_id);
    }
    else {
        checked_task(item_id, checked_btn_id);
        return
    }
}

function checked_task_to_down(item, list, button, checked) {
    let task_and_button = '';
    for (task_index in list) {
        if (list[task_index].includes(String(item.id)) && checked == true) {

            task_and_button = item.outerHTML + button.outerHTML;
            list.splice(task_index, 1);
            list.push(String(task_and_button));
            return list;
        }

        if (list[task_index].includes(String(item.id)) && checked == false) {

            task_and_button = item.outerHTML + button.outerHTML;
            list.splice(task_index, 1, task_and_button);
            return list;
        }
    }
}

function checked_task(item_id, btn_id) {
    if (document.getElementById(item_id).style.backgroundColor === 'rgba(16, 233, 81, 0.808)') {
        document.getElementById(item_id).style.backgroundColor = 'white';
        document.getElementById('texto' + get_number(item_id)).style.textDecoration = 'none'
        document.getElementById(item_id).style.opacity = '1';

        let object_item = document.querySelector('#' + item_id);
        let object_button = document.querySelector('#button' + get_number(btn_id));

        let task_list = checked_task_to_down(object_item, todas_as_tarefas, object_button, false);
        document.getElementById("area-tarefa").innerHTML = ''
        for (task in task_list) {
            document.getElementById("area-tarefa").innerHTML += task_list[task]
        }

        document.getElementById(btn_id).checked = false;
        return
    };

    document.getElementById(item_id).style.backgroundColor = 'rgba(16, 233, 81, 0.808)';
    document.getElementById(item_id).style.opacity = '0.7';
    document.getElementById('texto' + get_number(item_id)).style.textDecoration = 'line-through';

    let object_item = document.querySelector('#' + item_id);
    let object_button = document.querySelector('#button' + get_number(btn_id));

    let task_list = checked_task_to_down(object_item, todas_as_tarefas, object_button, true);
    document.getElementById("area-tarefa").innerHTML = ''
    for (task in task_list) {
        document.getElementById("area-tarefa").innerHTML += task_list[task]
    }

    document.getElementById(btn_id).checked = true;
}



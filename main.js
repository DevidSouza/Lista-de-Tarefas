let id = 0;
let all_task = [];
let main = document.getElementById("task-area");
let btn_add = document.getElementById("add-button");
let input = document.getElementById("input");


// Adiciona uma tarefa ao clicar na tecla Enter
document.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        e.preventDefault()
        btn_add.click();
    }
});


function add_task() {
    let input_value = String(input.value);
    if ((input_value !== '') && (input_value !== "null") && (input_value !== "undefined")) {
        let capitalize = input_value[0].toUpperCase() + input_value.substring(1);

        all_task.unshift(`
            <div id='task${id}' class='task'>
                <div onclick='marked_task(task${id})' class='task-verification'>
                    <i id='icone${id}' class="mdi mdi-circle-outline"></i>
                </div>

                <div id='task_content${id}' onclick='marked_task(task${id})' class='task-content'>
                    ${capitalize}
                </div>

                <div class="task-del-button">
                    <button onclick='delete_task(task${id})' class='del-button'>Deletar</button>
                </div>
            </div>
    `);

        main.innerHTML = ''

        for (task in all_task) {
            main.innerHTML += all_task[task]
        }

        input.value = ""
        input.focus()

        id += 1;

    }
    else {
        return
    };
};


function marked_task(object) {
    let task = object;

    if (task.getAttribute('class') == 'task') {
        task.classList.add('marked');

        let task_content = document.getElementById('task_content' + get_number(String(object.id)))
        task_content.classList.add('marked')

        let icone_id = 'icone' + get_number(String(object.id));
        let icone_object = document.getElementById(icone_id);

        icone_object.classList.remove('mdi-circle-outline')
        icone_object.classList.add('mdi-checkbox-marked-circle')

        marked_task_to_down(all_task, object, true);
    }
    else {
        task.classList.remove('marked')

        let task_content = document.getElementById('task_content' + get_number(String(object.id)))
        task_content.classList.remove('marked')

        let icone_id = 'icone' + get_number(String(object.id));
        let icone_object = document.getElementById(icone_id);

        icone_object.classList.remove('mdi-checkbox-marked-circle')
        icone_object.classList.add('mdi-circle-outline')

        marked_task_to_down(all_task, object, false);
    }
}

function delete_task(id) {
    id.remove()

    let id_task = id.id
    delete all_task[get_number(String(id_task))]
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

function marked_task_to_down(list, task, marked) {
    for (task_index in list) {
        if (list[task_index].includes(task.id) && marked == true) {
            list.splice(task_index, 1)
            list.push(task.outerHTML)
        }
        else if (list[task_index].includes(task.id) && marked == false) {
            console.log(list[task_index])
            list.splice(task_index, 1, task.outerHTML)
        }
    }

    main.innerHTML = ''
    for (task_index in list) {
        main.innerHTML += list[task_index];
    }

}


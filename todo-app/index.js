const msg = document.getElementById('msg');
const add = document.getElementById('add-btn');
const msg_list = document.getElementById('msg-list');
const clear_todo = document.getElementById('clear');
const task_p = document.getElementById('task_p');
const done_list = document.getElementById("done-list");
const clear_done = document.getElementById('clear-done');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let done = JSON.parse(localStorage.getItem("done")) || [];
let new_msg = '';

msg.onchange = function(){
    new_msg = this.value
}

msg.onkeydown = function(e){
    if(e.key === 'Enter'){
        console.log(this.value);
    }
}

add.onclick = function(){
    new_msg = new_msg.trim();
    if (new_msg == '') return ;
    tasks.push(new_msg);
    msg.value='';
    new_msg = '';
    saveTasks();
    readTasks();
}

clear_todo.onclick = function(){
    tasks = [];
    saveTasks();
    readTasks();
}

window.onload = function(){
    readTasks();
    readDone();
}

function readTasks(){
    let lists = '';
    for(let i=0; i< tasks.length; i++){
        lists += `<li><p id='task_p'> ${tasks[i]} </p><span><button onclick='doneTasks(${i})'>✓</button><button onclick='editTasks(${i})'>edit</button><button onclick='deleteTasks(${i}, tasks)'>X</button></span></li>`;
    }
    msg_list.innerHTML = lists;
}



function deleteTasks(i,arr){
    arr.splice(i,1);
    saveTasks();
    readTasks();
    readDone();
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("done", JSON.stringify(done));
}

function editTasks(i){
    // let edit_msg = prompt("edit msg", tasks[i]);
    // if(edit_msg == null) return tasks[i];
    // tasks[i] = edit_msg;
    // msg.value = tasks[i];
    const new_input = document.createElement('input');
    const save_btn = document.createElement('button');
    let list_item = msg_list.children[i];

    let edit_text = list_item.querySelector("p");
    let edit_btn = list_item.querySelector("span");

    new_input.value = tasks[i];
    save_btn.innerText = 'save';

    edit_text.replaceWith(new_input);
    edit_btn.replaceWith(save_btn);

    save_btn.addEventListener('click', function(){
        tasks[i] = new_input.value;
        saveTasks();
        readTasks();
    });
}

function doneTasks(i){
    done.push(tasks[i]);
    readDone();
    deleteTasks(i,tasks);
}

function readDone(){
    let done_li = '';
    for(let i=0; i< done.length; i++){
        done_li += "<li><p>" + done[i] + "</p> <button onclick='unDo("+i+")'>undo</button> </li>";
    }
    done_list.innerHTML = done_li;
    saveTasks();
}

function unDo(i){
    tasks.push(done[i]);
    deleteTasks(i,done);
    saveTasks();
    readTasks();
    readDone();
}

clear_done.onclick = function(){
    done = [];
    saveTasks();
    readDone();
}
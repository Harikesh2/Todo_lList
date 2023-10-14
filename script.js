const inputBox = document.getElementById('inputBox');
const AddBtn = document.getElementById('AddBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

//  function to add and delete
const addTodo = ()=>{
   
    const inputText = inputBox.value.trim();
    if(inputText.length <=0){
    alert("You must have write something in your To Do!!");
    return false;
    }
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
     
    if (AddBtn.value === "Edit"){
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        AddBtn.value = "Add";
        inputBox.value = "";
    }
    else{
    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.classList.add("btn", "editbtn");
    li.appendChild(editbtn);

    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Remove";
    deletebtn.classList.add("btn", "deletebtn");
    li.appendChild(deletebtn);

    todoList.appendChild(li);
    inputBox.value = "";
    saveLocalTodos(inputText);
    }
}

const UpdateTodo = (e)=>{
    // console.log(e.target.innerHTML)
    if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }
    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        AddBtn.value = "Edit";
        editTodo = e;
    }
}
const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}  

const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {

            //Creating p tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);


            // Creating Edit Btn
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            // Creating Delete Btn
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}
  
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // Array functions : slice / splice
    console.log(todoIndex);
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
AddBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', UpdateTodo);
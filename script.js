const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoContainer = document.querySelector(".todo-container");
const filterOption = document.querySelector(".todo-filter");

//date
let dateToday = document.getElementById("date-today");
let today = new Date();
let day = `${today.getDate() < 10 ? "0": ""}${today.getDate()}`;
let month = `${(today.getMonth()) < 10 ? "0": ""}${today.getMonth() + 1}`;
let year = today.getFullYear();
dateToday.textContent = `Сегодня, ${day}.${month}.${year}`;
let todayDate = `${year}-${month}-${day}`;

//listeners
// document.addEventListener("DOMContentLoaded", getLocalTodos);
// todoButton.addEventListener("click", addTodo);
// todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("change", filterTodo);


//functions
function renderTodo(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.value;
    newTodo.setAttribute("id", todo.value);
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

// function addTodo(event) {
//     event.preventDefault();
//     if (todoInput.value !== "") {

//         const todo = {
//             value: todoInput.value,
//             date: todayDate,
//             checked: false
//         }

//         saveLocalTodos(todo);

//         renderTodo(todo);

//         todoInput.value = "";
//     }
// }

// function deleteCheck(e) {
//     const item = e.target;

//     if(item.classList[0] === "trash-btn") {
//         const todo = item.parentElement;
//         todo.classList.add("slide");

//         removeLocalTodos(todo);

//         todo.addEventListener("transitionend", function() {
//             todo.remove();
//         });
//     }


//     if(item.classList[0] === "complete-btn") {
//         const todo = item.parentElement;
//         todo.classList.toggle("completed");
//         toogleUpdateTodo(todo);
//     }
// }

// function toogleUpdateTodo(todo) {
//     let todos = setCurrentTodos();
//     todos.forEach((_todo)=>{
//         if(_todo.value === todo.innerText) {
//             _todo.checked = !_todo.checked;
//         }
//     });
// }

// function filterTodo(e) {
//     const todos = todoList.childNodes;
//     todos.forEach(function(todo) {
//         switch(e.target.value) {
//             case "all":
//                 todo.style.display = "flex";
//                 break;
//             case "completed": 
//                 if(todo.classList.contains("completed")) {
//                     todo.style.display = "flex";
//                 } else {
//                     todo.style.display = "none";
//                 }
//                 break;
//             case "incomplete":
//                 if(!todo.classList.contains("completed")) {
//                     todo.style.display = "flex";
//                 } else {
//                     todo.style.display = "none";
//                 }
//                 break;
//         }
//     });
// }

// // function saveData() {
// //     localStorage.setItem("todayData", todoList.innerHTML);
// // }

// // function getData() {
// //     localStorage.getItem("todayData");
// // }

// function setCurrentTodos() {
//     let todos;
//     if(localStorage.getItem("todos") === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem("todos"))
//     }
//     return todos;
// }

// function saveLocalTodos(todo) {
//     let todos = setCurrentTodos();
//     todos.push(todo);
//     localStorage.setItem("todos", JSON.stringify(todos));
// }

// function getLocalTodos() {
//     let todos = setCurrentTodos();

//     todos.forEach(function(todo) {
//         const todoDiv = document.createElement("div");
//         todoDiv.classList.add("todo");
//         const newTodo = document.createElement("li");
//         newTodo.innerText = todo.value;
//         newTodo.classList.add("todo-item");
//         if(todo.checked === true) {
//             newTodo.classList.add("completed");
//         }
//         todoDiv.appendChild(newTodo);

//         const completedButton = document.createElement("button");
//         completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
//         completedButton.classList.add("complete-btn");
//         todoDiv.appendChild(completedButton);

//         const trashButton = document.createElement("button");
//         trashButton.innerHTML = '<i class="fas fa-trash"></i>';
//         trashButton.classList.add("trash-btn");
//         todoDiv.appendChild(trashButton);

//         // if(isCompleted) {
//         //     todoDiv.classList.add("completed")
//         // }

//         todoList.appendChild(todoDiv);

//         console.log(todos);
//     });
// }

// function removeLocalTodos(todo) {
//     let todos = setCurrentTodos();

//     const todoIndex = todo.children[0].innerText;
//     todos.splice(todos.indexOf(todoIndex), 1);
//     localStorage.setItem("todos", JSON.stringify(todos));
// }


// HEADER

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sideBar = document.querySelector(".sidebar");
// const main = document.getElementsByTagName("main");

menuBtn.addEventListener("click", () => {
    sideBar.classList.toggle('active');
    menuBtn.style.visibility = "hidden";
});
closeBtn.addEventListener("click", () => {
    sideBar.classList.remove('active');
    menuBtn.style.visibility = "visible";
});

const profileBtn = document.querySelector(".profile-btn");
const dialog = document.querySelector(".dialog");

profileBtn.addEventListener("click", () => {
    dialog.classList.toggle('active');
    $('body').css({'opacity': 0.3, 'pointer-events': 'none'})
});

//CRUD

const addTodoBtn = document.querySelector(".add-todo");

const addTodoInput = document.querySelector(".add-todo-input");
const datePicker = document.querySelector(".date-picker");
const cancelModalBtn = document.querySelector(".cancel-btn");
const commitTodoBtn = document.querySelector(".commit-btn");
const msg = document.getElementById("msg");

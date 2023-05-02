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
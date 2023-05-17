import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, set, ref, update, get, child, remove } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getFirestore, addDoc, query, collection, where, getDocs, getDoc, updateDoc, deleteDoc, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDPsyWdiuQW4k6pBi-XtkBLgpJpd-AnxDQ",
    authDomain: "itaddp-bc790.firebaseapp.com",
    databaseURL: "https://itaddp-bc790-default-rtdb.firebaseio.com",
    projectId: "itaddp-bc790",
    storageBucket: "itaddp-bc790.appspot.com",
    messagingSenderId: "595680875480",
    appId: "1:595680875480:web:758148ae095f45f7d398ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const store = getFirestore(app);
const provider = new GoogleAuthProvider(app);

var usernameBlock = document.querySelector(".display-username");
var emailBlock = document.querySelector(".display-email");
var photoBlock = document.querySelectorAll(".account-photo");


onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(user.displayName + "/" + user.email);

      usernameBlock.innerText = user.displayName;
      emailBlock.innerText = user.email;
      photoBlock.forEach((item) => {
        item.src = user.photoURL;
      });

      // ...
    } else {
        window.location.href("login.html");
        console.log("...");
        // usernameBlock.innerText = "";
        // emailBlock.innerText = "";
      // User is signed out
      // ...
    }
  });

//Setup a register 

// const registerBtn = document.querySelector(".register-form-submit");
// const loginBtn = document.querySelector(".login-form-submit");

// const msg = document.getElementById("msg");
// const form = document.querySelector(".login-form");

function register() {
    var username = document.getElementById("username-field");
    var email = document.getElementById("email-field");
    var password = document.getElementById("password-field");
    var confirmPassword = document.getElementById("confirm-password-field");

    console.log("hi!");
    console.log(email.value);
    if (password.value !== confirmPassword.value) {
        msg.innerText = "Пароли не совпадают.";
    } else {
        msg.innerText = "";
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential)=>{
            const user = userCredential.user;

            const user_data = {
                username: username.value,
                email: email.value,
                lastLogin: Date.now()
            };

            set(ref(database, 'users/' + user.uid), user_data);
            
            login();

        })
        .catch((error)=>{
            const error_message = error.message;
            alert(error_message);
        });
    }
}

function goWithGoogle() {
    
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            
            // const user_data = {
            //     email: ,
            //     lastLogin: Date.now()
            // };

            // set(ref(database, 'users/' + user.uid), user_data);

            alert(`User loged in! Hello ${user.displayName}`);          

            window.location.href = 'index.html';

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorMessage);
        });
}

function login() {
    var email = document.getElementById("email-field");
    var password = document.getElementById("password-field");
    
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        const user = userCredential.user;

        update(ref(database, 'users/' + user.uid),{
            lastLogin: Date.now()
        });

        alert('User loged in!');
        window.location.href = 'index.html';
    })
    .catch((error) => {
        const error_message = error.message;
        alert(error_message);
    });
};

function signOut() {
    auth.signOut()
    .then(() => {
        alert('user loged out');
        window.location.href = "login.html";
    }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
};



// CRUD

// const addTodoInput = document.querySelector(".add-todo-input");
// const datePicker = document.querySelector(".date-picker");
// const cancelModalBtn = document.querySelector(".cancel-btn");
const msg = document.getElementById("msg");

// FIRESTORE

function addTodayData(e) {
    e.preventDefault();
    var todayTodoInput = document.querySelector(".todo-input");

    if (todayTodoInput.value !== "") {
        let todo = {
            value: todayTodoInput.value,
            status: "active",
            date: todayDate
        };
    
        console.log(todo);
    
        addDoc(collection(store, "todo-items"), todo);
        addDoc(collection(store, "journal"), {
            value: `Добавлена новая задача: ${todo.value} на ${todo.date}`,
            date: Date.now()
        });
    
        todayTodoInput.value = "";
        
        let todoHTML = ` 
                <div class="todo ${todo.status === "completed" ? "completed": ""}">
                    <li class="todo-item">${todo.value}</li>
                    <button data-id=${todo.id} class="complete-btn">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button class="trash-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `
        document.querySelector(".todo-list").innerHTML += todoHTML;
    
        getData();
    }
}

function addData(e) {
    e.preventDefault();

    var addTodoInput = document.querySelector(".add-todo-input");
    var datePicker = document.querySelector(".date-picker");

    if (addTodoInput.value === "") {
        msg.innerText = "Заполните поле ввода";
    } else {
        console.log({
            value: addTodoInput.value,
            status: "active",
            date: datePicker.value
        });
    
        addDoc(collection(store, "todo-items"), {
            value: addTodoInput.value,
            status: "active",
            date: datePicker.value
        });
        addDoc(collection(store, "journal"), {
            value: `Добавлена новая задача: ${todo.value} на ${todo.date}`,
            date: Date.now()
        });
    
        addTodoInput.value = "";
        datePicker.value = "";
    
        getData();
        getAllData();
    }
}

let today = new Date();
let day = `${today.getDate() < 10 ? "0": ""}${today.getDate()}`;
let month = `${(today.getMonth()) < 10 ? "0": ""}${today.getMonth() + 1}`;
let year = today.getFullYear();
let todayDate = `${year}-${month}-${day}`;
const todayTodos = query(collection(store, "todo-items"), where("date", "==", todayDate));
const allTodos = query(collection(store, "todo-items"));
const journal = query(collection(store, "journal"));
// let numberToday;

function getData() {
    getDocs(todayTodos).then(snapshot => {

        let todos = [];

        snapshot.forEach((doc) => {
            todos.push({
                id: doc.id,
                ...doc.data()
            });
        })
        console.log(todos);
        generateData(todos);

        var numberToday = document.querySelector(".number");
        numberToday.innerText = `${todos.length}`;
    });
}

function getJournal() {

    getDocs(journal).then(snapshot => {
        let notes = [];

        snapshot.forEach((doc) => {
            notes.push({
                id: doc.id,
                ...doc.data()
            });
        })
        console.log(notes);
        generateJournal(notes);

        // var numberToday = document.querySelector(".number");
        // numberToday.innerText = `${todos.length}`;
    });
}

function getAllData() {
    getDocs(allTodos).then(snapshot => {

        let todos = [];

        snapshot.forEach((doc) => {
            todos.push({
                id: doc.id,
                ...doc.data()
            });
        })
        console.log(todos);
        generateAllData(todos);
    });
}

function generateData(todos) {

    let todosHTML = "";

    todos.forEach((todo) => {
        // console.log(todo);
        todosHTML += ` 
            <div class="todo ${todo.status === "completed" ? "completed": ""}">
                <li class="todo-item">${todo.value}</li>
                <button data-id=${todo.id} class="complete-btn">
                    <i class="fas fa-check-circle"></i>
                </button>
                <button data-id=${todo.id} class="trash-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
    });

    document.querySelector(".main-todo-list").innerHTML = todosHTML;
    createEventListeners();
}

function generateAllData(todos) {

    let todosHTML = "";

    todos.forEach((todo) => {
        // console.log(todo);
        todosHTML += ` 
            <div class="todo ${todo.status === "completed" ? "completed": ""}">
                <li class="todo-item">${todo.value}</li>
                <button data-id=${todo.id} class="complete-btn">
                    <i class="fas fa-check-circle"></i>
                </button>
                <button data-id=${todo.id} class="trash-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
    });

    document.querySelector(".todo-list").innerHTML = todosHTML;
    createEventListeners();
}

function generateJournal(notes) {
    
    let notesHTML = "";

    notes.forEach((note) => {
        console.log(note);
        notesHTML += ` 
            <div class="todo">
                <li class="todo-item">${note.value}</li>
            </div>`
    });

    document.querySelector(".note-list").innerHTML = notesHTML;
}

function createEventListeners() {
    let todoChecks = document.querySelectorAll(".todo .complete-btn");
    console.log(todoChecks);
    todoChecks.forEach(check => {
        check.addEventListener("click", () => {
            todoComplete(check.dataset.id);
            check.parentElement.classList.toggle("completed");
        });
    })

    let todoTrashes = document.querySelectorAll(".todo .trash-btn");
    todoTrashes.forEach(trash => {
        trash.addEventListener("click", () => {
            todoDelete(trash.dataset.id);
            const todo = trash.parentElement;
            todo.classList.add("slide");
            todo.addEventListener("transitionend", () => {
                todo.remove();
            });
        })
    })
}

function todoComplete(id) {

    console.log(id);
    getDoc(doc(store, "todo-items", id)).then(d => {
        if(d.exists) {
            let status = d.data().status;
            if (status === "active") {
                console.log("in active case")
                updateDoc(doc(store, "todo-items", id), {
                    status: "completed"
                });
                addDoc(collection(store, "journal"), {
                    value: `Статус задачи "${d.data().value}" изменен на "Выполнена"`,
                    date: Date.now()
                });
            } else {
                updateDoc(doc(store, "todo-items", id), {
                    status: "active"
                });
                addDoc(collection(store, "journal"), {
                    value: `Статус задачи "${d.data().value}" изменен на "Активна"`,
                    date: Date.now()
                });
            }
        }
    })
}

function todoDelete(id) {
    console.log(id);
    getDoc(doc(store, "todo-items", id)).then(d => {
        if(d.exists) {
            deleteDoc(doc(store, "todo-items", id));
            addDoc(collection(store, "journal"), {
                value: `Задача "${d.data().value}" удалена`,
                date: Date.now()
            });
        }
    })

    getData();
    getAllData();
}



// REALTIME DATEBASE

// function insertData(){

//     if(addTodoInput.value === "") {
//         msg.innerText = "Заполните поле ввода."
//     } else {
//         msg.innerText = "";
//         set(ref(database, "Todos/" + addTodoInput.value), {
//             value: addTodoInput.value,
//             checked: false,
//             date: datePicker.value,
//         })
//         .then(()=>{
//             alert("insert success!");
//         })
//         .catch((error)=>{
//             error_message=error.message;
//             alert(error_message);
//         });
//     }
// }

// function selectData() {
//     const db_ref = ref(database);

//     get(child(db_ref, "Todos/"+ ))
// }

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;

//     } else {
//         // User is signed out
//         // ...
//     }
//   });

export { register, login, signOut, addData, addTodayData, getData, getAllData, todoComplete, goWithGoogle, getJournal };

// loginBtn.addEventListener("click", login());

// registerBtn.addEventListener("click", () => {
//     var username = document.getElementById("username-field");
//     var email = document.getElementById("email-field");
//     var password = document.getElementById("password-field");
//     var confirmPassword = document.getElementById("confirm-password-field");

//     console.log("hi!");
//     console.log(email.value);
//     if (password.value !== confirmPassword.value) {
//         msg.innerText = "Пароли не совпадают.";
//     } else {
//         msg.innerText = "";
//         createUserWithEmailAndPassword(auth, email.value, password.value)
//         .then((userCredential)=>{
//             const user = userCredential.user;

//             const user_data = {
//                 username: username.value,
//                 email: email.value
//             };

//             set(ref(database, 'users/' + user.uid), user_data);
            
//             login();

//         })
//         .catch((error)=>{
//             const error_message = error.message;
//             alert(error_message);
//         });
//     }
// });
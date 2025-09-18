// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ⚡️ CONFIGURA AQUÍ TUS CREDENCIALES
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

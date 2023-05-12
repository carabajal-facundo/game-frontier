import Videojuego from "./classVideojuego.js";
import { sumarioValidaciones } from "./helpers.js";

//variables globales
let formularioVideojuego = document.getElementById("formVideojuego");
let codigo = document.getElementById("codigo"),
  nombre = document.getElementById("nombre"),
  precio = document.getElementById("precio"),
  categoria = document.getElementById("categoria"),
  imagen = document.getElementById("imagen"),
  descripcion = document.getElementById("descripcion"),
  requisitos = document.getElementById("requisitos"),
  desarrollador = document.getElementById("desarrollador"),
  reseñas = document.getElementById("reseñas");

let modalVideojuego = new bootstrap.Modal(document.getElementById('adminModal'));
let verificarCrearVideojuego = true; //  verificarCrearVideojuego = true entonces creo la Videojuego, cuando sea false tengo que editar la Videojuego
const btnAgregarVideojuego = document.getElementById('btnAgregarVideojuego');

//si quiero trabajar con una array de objetos normales
// let listaVideojuegos =  JSON.parse(localStorage.getItem('listaVideojuegos')) || [];

//si quiero trabajar con un array de objetos de tipo Videojuego
let listaVideojuegos = localStorage.getItem("listaVideojuegos");
// si listaVideojuegos esta vacio
if (!listaVideojuegos) {
  listaVideojuegos = [];
} else {
  listaVideojuegos = JSON.parse(listaVideojuegos).map(
    (videojuego) =>
      new Videojuego(
        videojuego.codigo,
        videojuego.nombre,
        videojuego.precio,
        videojuego.categoria,
        videojuego.imagen,
        videojuego.descripcion,
        videojuego.requisitos,
        videojuego.desarrollador,
        videojuego.reseñas
      )
  );
}

console.log(listaVideojuegos);

// manejadores de eventos
formularioVideojuego.addEventListener("submit", prepararFormulario);






function prepararFormulario(e) {
  e.preventDefault();

  crearVideojuego();

}

function crearVideojuego() {
  //validar el formulario
  let resumeErrores = sumarioValidaciones(
    nombre.value,
    descripcion.value,
    imagen.value,
    categoria.value
  );

  if (resumeErrores.length === 0) {
    //creo  el videojuego
    mostrarAlert(false, "");
    let nuevoVideojuego = new Videojuego(      
      nombre.value,
      precio.value,
      categoria.value,      
      imagen.value,
      descripcion.value,
      requisitos.value,      
      desarrollador.value,
      reseñas.value      
    );
    console.log(nuevoVideojuego);
    //guardar el videojuego en el array
    listaVideojuegos.push(nuevoVideojuego);
    console.log(listaVideojuegos);
    //guardar el array en localstorage
    guardarEnLocalstorage();
    //limpiar el formulario
    limpiarFormulario();
    //mostrar un mensaje
    Swal.fire(
      "Videojuego creado",
      "El Videojuego fue correctamente almacenado",
      "success"
    );
    //dibuja la fila

  } else {
    //falla la validacion
    mostrarAlert(true, resumeErrores);
  }
}


function mostrarAlert(estado, resumeErrores) {
  //estado = true muestro el alert, caso contrario oculto
  let alerta = document.getElementById("alertMsjError");
  if (estado) {
    alerta.className = "alert alert-danger";
    alerta.innerHTML = resumeErrores;
  } else {
    alerta.className = "alert alert-danger d-none";
  }
}

function limpiarFormulario() {
  formularioVideojuego.reset();
}



window.prepararVideojuego = (codigoBuscado)=>{
  console.log(codigo,'desde preparar Videojuego');
  //mostrar la ventana modal con los datos de la Videojuego
  modalVideojuego.show();
  //buscar la Videojuego y cargarla en el formulario
  let VideojuegoBuscado = listaVideojuegos.find((Videojuego)=> Videojuego.codigo === codigoBuscado );
  console.log(VideojuegoBuscado)
  codigo.value = VideojuegoBuscado.codigo;
  nombre.value = VideojuegoBuscado.nombre;
  precio.value = VideojuegoBuscado.precio;
  imagen.value = VideojuegoBuscado.imagen;
  desarrollador.value = VideojuegoBuscado.desarrollador;
  categoria.value = VideojuegoBuscado.categoria;
  requisitos.value = VideojuegoBuscado.requisitos;
  descripcion.value = VideojuegoBuscado.descripcion;
  reseñas.value = VideojuegoBuscado.reseñas;
  //cambio la variable para editar una peli en el submit
  verificarCrearVideojuego = false;
}



function mostrarModalVideojuego(){
  //limpiar el formulario
  limpiarFormulario();
  //mostrar modal
  modalVideojuego.show();
  //cambiar la variable booleana
 verificarCrearVideojuego = true;
}
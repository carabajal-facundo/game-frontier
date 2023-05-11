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

let modalVideojuego = new bootstrap.Modal(document.getElementById('modalAdministrarVideojuego'));
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
    (Videojuego) =>
      new Videojuego(
        Videojuego.codigo,
        Videojuego.nombre,
        Videojuego.precio,
        Videojuego.descripcion,
        Videojuego.categoria,
        Videojuego.imagen,
        Videojuego.desarrollador,
        Videojuego.reseñas,
        Videojuego.requisitos,
        Videojuego.reparto
      )
  );
}

console.log(listaVideojuegos);

// manejadores de eventos
formularioVideojuego.addEventListener("submit", prepararFormulario);
btnAgregarVideojuego.addEventListener('click', mostrarModalVideojuego);

cargaInicial();

//funciones
function cargaInicial() {
  if (listaVideojuegos.length > 0) {
    //dibujar las filas de la tabla
    listaVideojuegos.map((Videojuego, indice) => crearFila(Videojuego, indice + 1));
  }
  //le muestro el msj que no tengo elementos
}

function crearFila(Videojuego, indice) {
  let tablaVideojuego = document.querySelector("tbody");
  tablaVideojuego.innerHTML += `<tr>
  <th scope="row">${indice}</th>
  <td>${Videojuego.nombre}</td>
  <td class="text-truncate ancho pe-5">
    ${Videojuego.precio}
  </td>
  <td class="text-truncate ancho pe-5">
    ${Videojuego.categoria}
  </td>
  <td>${Videojuego.imagen}</td>
  <td>
    <button
      type="button"
      class="btn btn-warning mx-1"
      onclick="prepararVideojuego('${Videojuego.codigo}')"
    >
      <i class="bi bi-pencil-square"></i></button
    ><button type="button" class="btn btn-danger mx-1" onclick="borrarVideojuego('${Videojuego.codigo}')">
      <i class="bi bi-x-square"></i>
    </button>
  </td>
</tr>`;
}

function prepararFormulario(e) {
  e.preventDefault();
  if(verificarCrearVideojuego){
    crearVideojuego();
  }else{
    editarVideojuego();
  }
}

function crearVideojuego() {
  //validar el formulario
  let resumeErrores = sumarioValidaciones(
    nombre.value,
    precio.value,
    categoria.value,
    desarrollador.value,
    imagen.value
  );

  if (resumeErrores.length === 0) {
    //creo la peli
    mostrarAlert(false, "");
    let nuevaPeli = new Videojuego(
      undefined,
      nombre.value,
      precio.value,
      descripcion.value,
      categoria.value,
      imagen.value,
      desarrollador.value,
      reseñas.value,
      requisitos.value,
      reparto.value
    );
    console.log(nuevaPeli);
    //guardar la peli en el array
    listaVideojuegos.push(nuevaPeli);
    console.log(listaVideojuegos);
    //guardar el array en localstorage
    guardarEnLocalstorage();
    //limpiar el formulario
    limpiarFormulario();
    //mostrar un mensaje
    Swal.fire(
      "Videojuego creado",
      "El Videojuego fue correctamente almacenada",
      "success"
    );
    //dibuja la fila
    crearFila(nuevaPeli, listaVideojuegos.length);
  } else {
    //falla la validacion
    mostrarAlert(true, resumeErrores);
  }
}

function guardarEnLocalstorage() {
  localStorage.setItem("listaVideojuegos", JSON.stringify(listaVideojuegos));
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
  let VideojuegoBuscada = listaVideojuegos.find((Videojuego)=> Videojuego.codigo === codigoBuscado );
  console.log(VideojuegoBuscada)
  codigo.value = VideojuegoBuscada.codigo;
  nombre.value = VideojuegoBuscada.nombre;
  precio.value = VideojuegoBuscada.precio;
  imagen.value = VideojuegoBuscada.imagen;
  desarrollador.value = VideojuegoBuscada.desarrollador;
  categoria.value = VideojuegoBuscada.categoria;
  requisitos.value = VideojuegoBuscada.requisitos;
  reparto.value = VideojuegoBuscada.reparto;
  descripcion.value = VideojuegoBuscada.descripcion;
  reseñas.value = VideojuegoBuscada.reseñas;
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
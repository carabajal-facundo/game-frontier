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

// obtengo la etiqueta<tbody>
let tBody = document.querySelector('tbody');

for(let i = 0; i<listaVideojuegos.length; i++){
  tBody.innerHTML+=`
    <tr>
      <th scope="row">${i+1}</th>
      <td>${listaVideojuegos[i].nombre}</td>
      <td>${listaVideojuegos[i].precio}</td>
      <td>${listaVideojuegos[i].categoria}</td>
      <td>${listaVideojuegos[i].imagen}</td>
      <td>${listaVideojuegos[i].descripcion}</td>
      <td>${listaVideojuegos[i].requisitos}</td>
      <td>${listaVideojuegos[i].desarrollador}</td>
      <td>${listaVideojuegos[i].reseñas}</td>
      <td>
        <button type="button" class="btn btn-outline-warning mb-1" data-bs-toggle="modal" data-bs-target="#adminModal">
          <i class="bi bi-pencil-fill"></i>
        </button>
        <button type="button" class="btn btn-outline-danger mb-1" onclick="eliminarjuego('${listaVideojuegos[i].codigo}')">
        <i class="bi bi-trash3"></i>
        </button>
        
      </td>
    </tr>
  `;
}




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
      undefined,    
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


window.eliminarjuego = (codigo) => {
    Swal.fire({
      title: "¿Esta seguro de eliminar la juego?",
      text: "No puedes revertir posteriormente este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        //aqui agrego mi codigo
        //borrar del array un objeto
        let posicionjuego = listaVideojuegos.findIndex(
          (videojuego) => videojuego.codigo === codigo
        );
        listaVideojuegos.splice(posicionjuego, 1);
        //actualizar el localstorage
        guardarEnLocalstorage();

        //borrar la fila de la tabla
        let tablavideojuego = document.querySelector("tbody");
        tablavideojuego.removeChild(tablavideojuego.children[posicionjuego]);
        //todo agregar una funcion que actualice el primer td de cada fila con la cantidad de elementos del array
        Swal.fire("Juego eliminado", "El juego seleccionado fue eliminado correctamente", "success");
      }
    });
  };




function guardarEnLocalstorage() {
  localStorage.setItem("listaVideojuegos", JSON.stringify(listaVideojuegos));
}


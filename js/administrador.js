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
  osform = document.getElementById("os"), processorform = document.getElementById("processor"), memoryform = document.getElementById("memory"),graphicsform = document.getElementById("graphics"),directXform = document.getElementById("directX"),storageform = document.getElementById("storage"),additionalform = document.getElementById("additional"),
  desarrollador = document.getElementById("desarrollador"),
  reseñas = document.getElementById("reseñas");
  console.log(processorform.value)



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
      <td><span class="d-inline-block  truncarTexto">${listaVideojuegos[i].imagen}</span></td>
      <td><span class="d-inline-block truncarTexto">  ${listaVideojuegos[i].descripcion} </span></td>
      <td><span class="d-inline-block truncarTexto">SO:${listaVideojuegos[i].requisitos.os} <br> Procesador: ${listaVideojuegos[i].requisitos.processor} <br> RAM: ${listaVideojuegos[i].requisitos.memory} <br> Grafica: ${listaVideojuegos[i].requisitos.graphics} <br> DirectX: ${listaVideojuegos[i].requisitos.directX} <br> Almacenamiento: ${listaVideojuegos[i].requisitos.storage} <br> Adicionales: ${listaVideojuegos[i].requisitos.additional} <br> </span></td>
      <td>${listaVideojuegos[i].desarrollador}</td>
      <td><span class="d-inline-block truncarTexto">${listaVideojuegos[i].reseñas}</span></td>
      <td>
        <button type="button" class="btn btn-outline-warning mb-1" data-bs-toggle="modal" data-bs-target="#adminModal">
          <i class="bi bi-pencil-fill"></i>
        </button>
        <button type="button" class="btn btn-outline-danger">
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
  let requisitos = {
    os: osform.value,
    processor: `${processorform.value}`,
    memory: `${memoryform.value}`,
    graphics: `${graphicsform.value}`,
    directX: `12`,
    storage: `${storageform.value}`,
    additional: `${additionalform.value}`
  };
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
      requisitos,      
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



function guardarEnLocalstorage() {
  localStorage.setItem("listaVideojuegos", JSON.stringify(listaVideojuegos));
}


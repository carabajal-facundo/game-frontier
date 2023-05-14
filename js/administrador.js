import Videojuego from "./classVideojuego.js";
import { sumarioValidaciones } from "./helpers.js";

//variables globales
let formularioVideojuego = document.getElementById("formVideojuego");
let
  nombre = document.getElementById("nombre"),
  precio = document.getElementById("precio"),
  categoria = document.getElementById("categoria"),
  descripcion = document.getElementById("descripcion"),
  osform = document.getElementById("os"), processorform = document.getElementById("processor"), memoryform = document.getElementById("memory"),graphicsform = document.getElementById("graphics"),directXform = document.getElementById("directx"),storageform = document.getElementById("storage"),additionalform = document.getElementById("additional"),
  portadaform = document.getElementById("portada"), banerform=document.getElementById("baner"), 
  galeria1form = document.getElementById("galeria1"),
  galeria2form = document.getElementById("galeria2"),
  galeria3form = document.getElementById("galeria3"),
  galeria4form = document.getElementById("galeria4"),
  galeria5form = document.getElementById("galeria5"),
  galeria6form = document.getElementById("galeria6"),
  desarrollador = document.getElementById("desarrollador"),
  distribuidor = document.getElementById("distribuidor"),
  fechaLanzamiento = document.getElementById("fechaLanzamiento"),
  reseñaspositivas = document.getElementById("reseñasPositivas"),
  reseñasnegativas = document.getElementById("reseñasNegativas");
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
        videojuego.reseñas,
        videojuego.distribuidor,
        videojuego.fechaLanzamiento
      )
  );
}

console.log(listaVideojuegos);

// manejadores de eventos
formularioVideojuego.addEventListener("submit", prepararFormulario);

// obtengo la etiqueta<tbody>
let tBody = document.querySelector('tbody');

for(let i = 0; i<listaVideojuegos.length; i++){
  insertarFila(listaVideojuegos[i],i+1)
}

function insertarFila(juego, indice){
  tBody.innerHTML+=`
    <tr>
      <th scope="row">${indice}</th>
      <td>${juego.nombre}</td>
      <td>${juego.precio}</td>
      <td>${juego.categoria}</td>
      <td><span class="d-inline-block  truncarTexto">${juego.imagen.portada}</span></td>
      <td><span class="d-inline-block truncarTexto">${juego.descripcion}</span></td>
      <td><span class="d-inline-block truncarTexto">SO:${juego.requisitos.os} <br> Procesador: ${juego.requisitos.processor} <br> RAM: ${juego.requisitos.memory} <br> Grafica: ${juego.requisitos.graphics} <br> DirectX: ${juego.requisitos.directX} <br> Almacenamiento: ${juego.requisitos.storage} <br> Adicionales: ${juego.requisitos.additional} <br> </span></td>
      <td>${juego.desarrollador}</td>
      <td>${juego.distribuidor}</td>
      <td>${juego.fechaLanzamiento}</td>
      <td><span class="d-inline-block truncarTexto">${juego.reseñasPositivas}</span></td>
      <td><span class="d-inline-block truncarTexto">${juego.reseñasNegativas}</span></td>
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
  let reseñas = reseñaspositivas.value - reseñasnegativas.value
  console.log(reseñas)
  let imagen = {
    portada: portadaform.value, 
    baner: banerform.value, 
    galeria:[galeria1form.value,galeria2form.value,galeria3form.value,galeria4form.value,galeria5form.value,galeria6form.value]

  };
  let requisitos = {
    os: osform.value,
    processor: `${processorform.value}`,
    memory: `${memoryform.value}`,
    graphics: `${graphicsform.value}`,
    directX: directXform.value,
    storage: `${storageform.value}`,
    additional: `${additionalform.value}`
  };
  //validar el formulario
  let resumeErrores = sumarioValidaciones(
    nombre.value,
    descripcion.value,
    portadaform.value,
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
      imagen,
      descripcion.value,
      requisitos,      
      desarrollador.value,
      reseñas,
      distribuidor.value,
      fechaLanzamiento.value      
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
    insertarFila(nuevoVideojuego, listaVideojuegos.length);
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


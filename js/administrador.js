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



let modalVideojuego = new bootstrap.Modal(document.getElementById('adminModal'));
let verificarCrearVideojuego = true; //  verificarCrearVideojuego = true entonces creo el Videojuego, cuando sea false tengo que editar el Videojuego
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
        undefined,
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
btnAgregarVideojuego.addEventListener("click",mostrarModalJuego)

// obtengo la etiqueta<tbody>
let tBody = document.querySelector('tbody');

for(let i = 0; i<listaVideojuegos.length; i++){
  tBody.innerHTML+=`
    <tr>
      <th scope="row">${i+1}</th>
      <td>${listaVideojuegos[i].nombre}</td>
      <td>${listaVideojuegos[i].precio}</td>
      <td>${listaVideojuegos[i].categoria}</td>
      <td><span class="d-inline-block  truncarTexto">${listaVideojuegos[i].imagen.portada}</span></td>
      <td><span class="d-inline-block truncarTexto">${listaVideojuegos[i].descripcion}</span></td>
      <td><span class="d-inline-block truncarTexto">SO:${listaVideojuegos[i].requisitos.os} <br> Procesador: ${listaVideojuegos[i].requisitos.processor} <br> RAM: ${listaVideojuegos[i].requisitos.memory} <br> Grafica: ${listaVideojuegos[i].requisitos.graphics} <br> DirectX: ${listaVideojuegos[i].requisitos.directX} <br> Almacenamiento: ${listaVideojuegos[i].requisitos.storage} <br> Adicionales: ${listaVideojuegos[i].requisitos.additional} <br> </span></td>
      <td>${listaVideojuegos[i].desarrollador}</td>
      <td>${listaVideojuegos[i].distribuidor}</td>
      <td>${listaVideojuegos[i].fechaLanzamiento}</td>
      <td><span class="d-inline-block truncarTexto">${listaVideojuegos[i].reseñas}</span></td>      
      <td>
        <button type="button" class="btn btn-outline-warning mb-1" onclick="prepararJuegoEditar('${listaVideojuegos[i].codigo}')">
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
  if(verificarCrearVideojuego){
    crearVideojuego();
  }else{
    editarVideoJuego()
  }

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

window.prepararJuegoEditar =(codigoJuego) =>{
  modalVideojuego.show()
  let juegoBuscado = listaVideojuegos.find(juego => juego.codigo === codigoJuego)
  codigo.value = juegoBuscado.codigo
  nombre.value = juegoBuscado.nombre
  precio.value = juegoBuscado.precio
  categoria.value = juegoBuscado.categoria
  imagen.value = juegoBuscado.imagen
  descripcion.value =  juegoBuscado.descripcion
  requisitos.value = juegoBuscado.requisitos
  desarrollador.value = juegoBuscado.desarrollador
  reseñas.value = juegoBuscado.reseñas
  verificarCrearVideojuego = false
}

function editarVideoJuego() {
  let encontrarVideoJuego = listaVideojuegos.findIndex(juego => juego.codigo === codigo.value)
  console.log(encontrarVideoJuego)
  listaVideojuegos[encontrarVideoJuego].codigo = codigo.value
  listaVideojuegos[encontrarVideoJuego].nombre = nombre.value
  listaVideojuegos[encontrarVideoJuego].precio = precio.value
  listaVideojuegos[encontrarVideoJuego].categoria = categoria.value
  listaVideojuegos[encontrarVideoJuego].imagen = imagen.value
  listaVideojuegos[encontrarVideoJuego].descripcion = descripcion.value
  listaVideojuegos[encontrarVideoJuego].requisitos = requisitos.value
  listaVideojuegos[encontrarVideoJuego].desarrollador = desarrollador.value
  listaVideojuegos[encontrarVideoJuego].reseñas = reseñas.value

  guardarEnLocalstorage()
  let tBody = document.querySelector('tbody');
  tBody.children[encontrarVideoJuego].children[1].innerHTML = nombre.value
  tBody.children[encontrarVideoJuego].children[2].innerHTML = precio.value
  tBody.children[encontrarVideoJuego].children[3].innerHTML = categoria.value
  tBody.children[encontrarVideoJuego].children[4].innerHTML = imagen.value
  tBody.children[encontrarVideoJuego].children[5].innerHTML = descripcion.value
  tBody.children[encontrarVideoJuego].children[6].innerHTML = requisitos.value
  tBody.children[encontrarVideoJuego].children[7].innerHTML = desarrollador.value
  tBody.children[encontrarVideoJuego].children[8].innerHTML = reseñas.value
  Swal.fire(
    'VideoJuego editado',
    'El VideoJuego fue modificado correctamente',
    'success'
    )
    limpiarFormulario()
    modalVideojuego.hide();
}

function mostrarModalJuego() {
  limpiarFormulario()
  modalVideojuego.show()
  verificarCrearVideojuego = true;
}
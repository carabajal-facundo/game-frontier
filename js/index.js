import Videojuego from "./classVideojuego.js";

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

listaVideojuegos.map((juego) => crearArticleJuego(juego));

function crearArticleJuego(juego) {
  function precioJuego() {
    if (juego.precio === "" || juego.precio === 0) {
      return "Gratis";
    } else return `$${juego.precio}`;
  }
  let seccionJuegos = document.getElementById("seccionJuegos");
  seccionJuegos.innerHTML += `
        <article class="col-md-4 col-lg-3 mt-5">
            <a href="./pages/detalle.html?codigo=${
              juego.codigo
            }" class="container-img">
                <img src="${juego.imagen.portada}" alt="${juego.nombre}"
                class="img-portada img-fluid">
            </a>
            <a href="./pages/detalle.html?codigo=${
              juego.codigo
            }" class="text-decoration-none">
                <h3 class="mt-2 text-titulo-juego">${juego.nombre}</h3>
            </a>
            <p class="text-white fs-5">${precioJuego()}</p>
            <div class="btn btn-outline-primary" onclick="enviarCodigo('${
              juego.codigo
            }')">
                Ver mas
            </div>
        </article>
        `;
}

window.enviarCodigo = (codigo) => {
  window.location.href =
    window.location.origin + "/pages/detalle.html?codigo=" + codigo;
};

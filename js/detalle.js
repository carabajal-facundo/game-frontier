

const parametroCodigo = new URLSearchParams(window.location.search);

const listaVideojuegos = JSON.parse(localStorage.getItem('listaVideojuegos')) || [];

const videojuegoBuscado = listaVideojuegos.find((videojuego)=> videojuego.codigo === parametroCodigo.get('codigo'));
console.log(videojuegoBuscado.nombre)

const contenedor = document.getElementById('contenedorDetalle');

console.log(contenedor)

// ${videojuegoBuscado.}

contenedor.innerHTML = `
<section class="detallefondo">
<h1 class="title text-center py-4"> ${videojuegoBuscado.nombre}

  <article class="row w-100">
    <aside class="col-md-6 d-flex justify-content-center">
      <div class="card m-2 cb1 text-center">
        <div>
          <img src="${videojuegoBuscado.imagen}" alt="portada ${videojuegoBuscado.nombre}" width="100%">
        </div>
      </div>
    </aside>

    <article class="col-md-6 d-flex justify-content-center">
      <aside class="card m-2 cb1 text-center">
        <div class="card-body ">
          <h1 class="text-center text-white"> ${videojuegoBuscado.nombre}</h1>
          <div class="container text-center mb-4 stock">
            <div class="row">
              <div class="col-sm-1 col-md-3 col-lg-4">
                <img src="../img/origins.png" alt="" class="w-25">
                Origin
              </div>
              <div class="col-sm-1 col-md-3 col-lg-4">
                <i class="bi bi-check-lg text-success"></i>
                En Stock
              </div>
              <div class="col-sm-1 col-md-3 col-lg-4">
                <i class="bi bi-check-lg text-success"></i>
                Original
              </div>
            </div>
          </div>

          <article class="row">
          <div class="col-md-6 d-flex justify-content-center ">
          <div class="dropdown w-100">
            <a class="btn btn-secondary dropdown-toggle  w-100" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              PC
            </a>
            <ul class="dropdown-menu bg-secondary">
              <li><a class="dropdown-item  " href="#">Xbox Series X|S</a></li>
              <li><a class="dropdown-item" href="#">PS5</a></li>
            </ul>
          </div>
        </div>

        <div class="col-md-6 d-flex justify-content-center ">
          <div class="dropdown  w-100">
            <a class="btn btn-secondary dropdown-toggle w-100" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Standar Edición
            </a>
            <ul class="dropdown-menu bg-secondary ">
              <li><a class="dropdown-item" href="#">Standar Edicion</a></li>
              <li><a class="dropdown-item" href="#">Deluxe Edicion</a></li>
            </ul>
          </div>
      </div>
      </article>
    
      </div>
      <div class="text-center">
        <h3 class="text-white ">$ ${videojuegoBuscado.precio}</h3>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-secondary col-md-3 m-2" type="button"><i class="bi bi-cart-check"></i></button>
        <button class="btn btn-secondary col-md-6 m-2" type="button">Compra Ahora</button>
        
      </div>  
    </aside>
  </article>  
</article>
</section>
<hr/>

<section class="row my-5 w-100">
<article class="col-md-6 d-flex justify-content-center">
<div class="card m-2 cb1">
  <div class="card-body">
    <h5 class="card-title text-white">Acerca Del juego</h5>
    <span class="text-white-50">${videojuegoBuscado.descripcion}</span>
  </div>
</div>
</article>

<article class="col-md-6 d-flex justify-content-center">
<article class="card m-2 cb1">
  <aside class="card-body">
    <table class="table text-white">
      <tbody>
        <tr>
          <td class="text-secondary">Instalacion</td>
          <td>Como Activar tu juego</td>
        </tr>
        <tr>
          <td class="text-secondary">Desarrollador</td>
          <td>Electronic Arts, Respawn</td>
        </tr>
        <tr>
          <td class="text-secondary">Distruibuidor</td>
          <td>Electronic Arts</td>
        </tr>
        <tr>
          <td class="text-secondary">Fecha de Lanzamiento</td>
          <td>28 de Abril 2023</td>
        </tr>
        <tr>
          <td class="text-secondary">Genero</td>
          <td>${videojuegoBuscado.categoria}</td>
        </tr>
      </tbody>
    </table>
  </aside>
</article>
</article>

</section>

<section class="container">
<h2 class="card-title text-white pb-5">Configuracion</h2>
<article class="row">
<aside class="col-md-6">
<table class="table-responsive">
  <tbody>
    <tr>
        <h5>Minima</h5>
      <td class="text-secondary pe-auto">OS:</td>
      <td class="text-secondary ">Windows 10 64-bits</td>
    </tr>
    <tr>
      <td class="text-secondary pe-5">Processor:</td>
      <td class="text-secondary">4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400</td>
    </tr>
    <tr>
      <td class="text-secondary ">Memory:</td>
      <td class="text-secondary">8 GB RAM</td>
    </tr>
    <tr>
      <td class="text-secondary ">Graphics:</td>
      <td class="text-secondary">8 GB VRAM | GTX 1070 | RADEON RX 580</td>
    </tr>
    <tr>
      <td class="text-secondary ">DirecX:</td>
      <td class="text-secondary">Version 12</td>
    </tr>
    <tr>
      <td class="text-secondary ">Storage:</td>
      <td class="text-secondary">155 GB Avallable space</td>
    </tr>
    <tr>
      <td class="text-secondary ">Additional:</td>
      <td class="text-secondary">Online Play.</td>
    </tr>
  </tbody>
</table>
</aside>

<aside class="col-md-6">
<table class="table-responsive">
  <tbody>
    <tr>
        <h5>Recomendada*</h5>
      <td class="text-secondary pe-auto">OS:</td>
      <td class="text-secondary">Windows 10 64-bits</td>
    </tr>
    <tr>
      <td class="text-secondary  pe-5">Processor:</td>
      <td class="text-secondary">4 core / 8 threads | Intel Core i5 11600K | Ryzen 5 5600X</td>
    </tr>
    <tr>
      <td class="text-secondary ">Memory:</td>
      <td class="text-secondary">16 GB RAM</td>
    </tr>
    <tr>
      <td class="text-secondary ">Graphics:</td>
      <td class="text-secondary">8 GB VRAM | RTX 2070  | RX 6700 XT</td>
    </tr>
    <tr>
      <td class="text-secondary ">DirecX:</td>
      <td class="text-secondary">Version 12</td>
    </tr>
    <tr>
      <td class="text-secondary ">Storage:</td>
      <td class="text-secondary">155 GB Avallable spacee</td>
    </tr>
    <tr>
      <td class="text-secondary ">Additional:</td>
      <td class="text-secondary">Online Play.</td>
    </tr>
    </tbody>
    </table>
  </aside>
</article>
</section>


<section class="container py-5">
<h2 class="card-title text-white pb-5">Galeria</h2>
<article class="row">
<aside class="col-lg-4 p-2">
  <img src="../img/imgjedi/2.jpeg" class="img-rounded p-2" alt="Cinque Terre" width="304" height="236">
  <img src="../img/imgjedi/2.jpg" class="img-rounded p-2" alt="Cinque Terre" width="304" height="236">
</aside>
<aside class="col-lg-4 mb-3">
  <img src="../img/imgjedi/4.jpg" class="img-rounded p-2" alt="Cinque Terre" width="304" height="236">
  <img src="../img/imgjedi/3.jpg" class="img-rounded p-2" alt="Cinque Terre" width="304" height="236">
</aside>
<aside class="col-lg-4 mb-4">
  <img src="../img/imgjedi/1.jpg" class="img-rounded p-2" alt="Cinque Terre" width="304" height="236">
  <img src="../img/imgjedi/5.jpg" class="img-rounded p-2" alt="Cinque Terre" width="304" height="236">
</aside>
</article>
</section>
`
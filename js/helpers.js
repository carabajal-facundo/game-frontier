function validarCantidadCaracteres(texto, min, max) {
  if (texto.length >= min && texto.length <= max) {
    return true;
  } else {
    return false;
  }
}

function validarURLImagenes(texto) {
  const patron = /\.(jpe?g|png|gif)$/i;

  if (patron.test(texto)) {
    return true;
  } else {
    return false;
  }
}

function validarBaner(baner) {
  return baner === "" || validarURLImagenes(baner);
}

function validarGaleria(arrayGaleria) {
  let bandera = true;
  for (let imagen of arrayGaleria) {
    if (imagen === "" || validarURLImagenes(imagen)) {
      bandera = true;
    } else {
      return false;
    }
  }
  return bandera;
}

function validacioncategoria(categoria) {
  if (
    (categoria.length > 0 && categoria === "Accion") ||
    categoria === "Aventura" ||
    categoria === "Deporte" ||
    categoria === "Estrategia" ||
    categoria === "FPS" ||
    categoria === "RPG" ||
    categoria === "Simulacion"
  ) {
    return true;
  } else {
    return false;
  }
}
function validarPrecio(precio) {
  if (precio !== "") {
    return true;
  }
}

export function sumarioValidaciones(
  titulo,
  imagenPortada,
  baner,
  galeria,
  categoria
) {
  let resumen = "";
  //quiero preguntar si no cumple con la validacion
  if (!validarCantidadCaracteres(titulo, 2, 100)) {
    resumen = "El titulo debe tener entre 2 y 100 caracteres <br>";
  }
  if (!validarURLImagenes(imagenPortada)) {
    resumen +=
      "Debe ingresar una url de imagen valida, con terminacion (.jpg, .png, .gif)  para la portada <br>";
  }
  if (!validarBaner(baner)) {
    resumen +=
      "Debe ingresar una url de imagen valida, con terminacion (.jpg, .png, .gif)  para el baner <br>";
  }
  if (!validarGaleria(galeria)) {
    resumen +=
      "Debe ingresar una url de imagen valida, con terminacion (.jpg, .png, .gif) para la imagen de galeria <br>";
  }

  if (!validacioncategoria(categoria)) {
    resumen += "Tiene que seleccionar una categoria <br>";
  }

  return resumen;
}

function validarCantidadCaracteres(texto, min, max) {
  if (texto.length >= min && texto.length <= max) {

    return true;
  } else {

    return false;
  }
}

// https://pics.filmaffinity.com/vaya_vacaciones-957309987-large.jpg

function validarURLImagenes(texto) {
  const patron = /\.(jpe?g|png|gif)$/i;


  if (patron.test(texto)) {

    return true;
  } else {

    return false;
  }
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

export function sumarioValidaciones(titulo, descripcion, imagen, categoria) {
  let resumen = "";
  //quiero preguntar si no cumple con la validacion
  if (!validarCantidadCaracteres(titulo, 2, 100)) {
    resumen = "El titulo debe tener entre 2 y 100 caracteres <br>";
  }
  if (!validarURLImagenes(imagen)) {
    resumen +=
      "Debe ingresar una url de imagen valida, con terminacion (.jpg, .png, .gif) <br>";
  }

  if (!validacioncategoria(categoria)) {
    resumen += "Tiene que seleccionar una categoria <br>";
  }

  return resumen;
}

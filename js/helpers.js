function validarCantidadCaracteres(texto, min, max){
    if(texto.length >= min && texto.length <= max){
        console.log('aqui el texto tiene la cant. de caracteres correcto');
        return true;
    }else{
        console.log('aqui el texto no cumple la validacion');
        return false;
    }
}

// https://pics.filmaffinity.com/vaya_vacaciones-957309987-large.jpg

function validarURLImagenes(texto){
   const patron = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|gif)$/
   console.log(typeof patron);
    if(patron.test(texto)){
        console.log('la expresion regular fue valida');
        return true;
    }else{
        console.log('no cumplio con la expresion regular');
        return false;
    }
}

function validacionAnio(anio){
    // 1895 - (año actual + 1)
    const fecha = (new Date().getFullYear()) + 1;
    if(anio >= 1985 && anio <= fecha){
        return true;
    }else{
        return false;
    }
}
function validacionGenero(genero){
    if(genero.length > 0 && genero === 'Accion' || genero === 'Comedia' || genero === 'Terror' || genero === 'Drama' || genero === 'Aventura'){
        return true
    }else{
        return false
    }
}


export function sumarioValidaciones(titulo, descripcion, imagen, anio, genero ){
    let resumen = '';
    //quiero preguntar si no cumple con la validacion
    if(!validarCantidadCaracteres(titulo,2,100)){
        resumen = 'El titulo debe tener entre 2 y 100 caracteres <br>'
    }
    if(!validarURLImagenes(imagen)){
        resumen += 'Debe ingresar una url de imagen valida, con terminacion (.jpg, .png, .gif) <br>'
    }
    if(!validacionAnio(anio)){
        resumen += 'El año debe ser entre 1985 y '+ (new Date().getFullYear() + 1) +' <br>'
    }
    if(!validacionGenero(genero)){
        resumen += 'Tiene que seleccionar un genero <br>'
    }
    
    return resumen;
}
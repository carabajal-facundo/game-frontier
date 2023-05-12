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
   const patron = /^https?:\/\/(?:[a-z]+\.)+[a-z]{2,}(?:\/[\w-]+)*\/([\w.-]+\.(?:jpe?g|png|gif))(\?\S*)?$/

   console.log(typeof patron);
    if(patron.test(texto)){
        console.log('la expresion regular fue valida');
        return true;
    }else{
        console.log('no cumplio con la expresion regular');
        return false;
    }
}

function validacioncategoria(categoria){
    if(categoria.length > 0 && categoria === 'Accion' || categoria === 'Aventura' || categoria === 'Deporte' || categoria === 'Estrategia' || categoria === 'FPS'|| categoria === 'RPG'|| categoria === 'Simulacion'){
        return true
    }else{
        return false
    }
}


export function sumarioValidaciones(titulo, descripcion, imagen, categoria ){
    let resumen = '';
    //quiero preguntar si no cumple con la validacion
    if(!validarCantidadCaracteres(titulo,2,100)){
        resumen = 'El titulo debe tener entre 2 y 100 caracteres <br>'
    }
    if(!validarURLImagenes(imagen)){
        resumen += 'Debe ingresar una url de imagen valida, con terminacion (.jpg, .png, .gif) <br>'
    }

    if(!validacioncategoria(categoria)){
        resumen += 'Tiene que seleccionar una categoria <br>'
    }
    
    return resumen;
}
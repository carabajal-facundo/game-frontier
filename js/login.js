// import { mostrarAlert } from "./administrador.js"

const email = document.getElementById("email"),
contrasenia = document.getElementById("contrasenia"),
    formLogin = document.getElementById("form-login"),
    btnLogin = document.getElementById("btnLogin"),
    modalLogin = document.getElementById("loginModal")

console.log(contrasenia)
    
    // btnLogin.addEventListener("click",mostrarModal)
    formLogin.addEventListener("submit",login)


    const usuario = {
        email : "ejemplo@admin.com",
        password : "123456$Ab?"
    }

    function login(e) {
        e.preventDefault()
        const resumenErorres = sumarioValidaciones()
        if(resumenErorres.length === 0){
            mostrarAlert(false,"")
        }else{
            mostrarAlert(true,resumenErorres)
        }
    }

    function validarPassword() {
        const expresionRegular = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
        if(expresionRegular.test(contrasenia.value)){
            return true
        }else{
            return false
        }
    }

    function validarEmail(){
        const expresion = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(expresion.test(email.value)){
            return true
        }else{
            return false
        }
    }

    export function sumarioValidaciones( ){
        let resumen = '';
        if(!validarPassword()){
            resumen += "La contraseña debe contener 1 letra mayuscula, una minuscula, un numero, un caracter especial y como minimo 8 digitos. "
        }
        if(!validarEmail()){
            resumen += "El email ingresado no es valido. "
        }
        if(email.value !== usuario.email || contrasenia.value !== usuario.password){
            resumen = "Email o contraseña ingresados son incorrectos"
        }
        return resumen;
    }

    function mostrarAlert(estado, resumeErrores) {
        //estado = true muestro el alert, caso contrario oculto
        let alerta = document.getElementById("alertMsj");
        if (estado) {
          alerta.className = "alert alert-danger";
          alerta.innerHTML = resumeErrores;
        } else {
          alerta.className = "alert alert-danger d-none";
        }
      }
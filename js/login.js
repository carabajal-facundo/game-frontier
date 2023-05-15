const email = document.getElementById("email"),
  contrasenia = document.getElementById("contrasenia"),
  formLogin = document.getElementById("form-login"),
  btnLogin = document.getElementById("btnLogin"),
  modalLogin = new bootstrap.Modal(document.getElementById("loginModal")),
  botonCerrar = document.getElementById("botonCerrar");

btnLogin.addEventListener("click", mostrarModal);
formLogin.addEventListener("submit", login);
botonCerrar.addEventListener("click", limpiarFormulario);

const usuario = {
  email: "ejemplo@admin.com",
  password: "123456$Ab?",
};

verificarUsuario();

function login(e) {
  e.preventDefault();
  const resumenErorres = sumarioValidaciones();
  if (resumenErorres.length === 0) {
    mostrarAlert(false, "");
    localStorage.setItem("user", usuario.email);
    verificarUsuario();
    modalLogin.hide();
    Swal.fire(
      "Logueado correctamente",
      "Bienvenido " + usuario.email,
      "success"
    );
  } else {
    mostrarAlert(true, resumenErorres);
  }
  formLogin.reset();
}

function validarPassword() {
  const expresionRegular =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  if (expresionRegular.test(contrasenia.value)) {
    return true;
  } else {
    return false;
  }
}

function validarEmail() {
  const expresion =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (expresion.test(email.value)) {
    return true;
  } else {
    return false;
  }
}

function sumarioValidaciones() {
  let resumen = "";
  if (email.value !== usuario.email || contrasenia.value !== usuario.password) {
    resumen = "Email o contraseña ingresados son incorrectos <br/>";
  }
  if (!validarPassword()) {
    resumen +=
      "La contraseña debe contener 1 letra mayuscula, una minuscula, un numero, un caracter especial y como minimo 8 digitos. <br/>";
  }
  if (!validarEmail()) {
    resumen += "El email ingresado no es valido.<br/> ";
  }
  return resumen;
}

function mostrarAlert(estado, resumeErrores) {
  let alerta = document.getElementById("alertMsj");
  if (estado) {
    alerta.className = "alert alert-danger";
    alerta.innerHTML = resumeErrores;
  } else {
    alerta.className = "alert alert-danger d-none";
  }
}

function logout() {
  localStorage.removeItem("user");
  btnLogin.innerHTML = "Login";
  document.getElementById("admin").classList.add("d-none");
  window.location.href = window.location.origin;
}

function verificarUsuario() {
  let usuarioLocalStorage = localStorage.getItem("user");
  if (usuarioLocalStorage) {
    btnLogin.innerHTML = "Logout";
    document.getElementById("admin").classList.remove("d-none");
  } else {
    btnLogin.innerHTML = "Login";
    let paginaAdmin = window.location.origin + "/pages/administrador.html";
    if (window.location.href === paginaAdmin) {
      document.querySelector("main").innerHTML =
        "<h2> No puedes estar aqui, seras redireccionado al inicio";
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 5000);
    }
  }
}

function mostrarModal() {
  if (btnLogin.innerHTML === "Login") {
    modalLogin.show();
  } else {
    logout();
  }
}

function limpiarFormulario() {
  formLogin.reset();
}

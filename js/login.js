import { sumarioValidacionesLogin } from "./helpers.js";

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

  if (btnLogin.innerText.toLocaleLowerCase() === "login") {
    const resumenErorres = sumarioValidacionesLogin(email.value,contrasenia.value,usuario);
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
  } else {
    modalLogin.hide();
  }
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
  Swal.fire({
    title: "Cerrar sesion?",
    text: "Usted esta por cerrar sesion",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Cerrar Sesion",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("user");
      btnLogin.innerHTML = "Login";
      document.getElementById("admin").classList.add("d-none");
      window.location.href = window.location.origin;
    } else modalLogin.hide();
  });
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
  mostrarAlert(false,"")
}

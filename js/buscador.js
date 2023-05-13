const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = document.getElementById("seccionJuegos");
    let elementosjuegos = input.childNodes
    let inputbuscador = document.getElementById('buscador');
    let buscador = inputbuscador.value.toLowerCase();
    console.log(buscador)

    for (let i = 1; i < elementosjuegos.length; i+=2) {
    let article = elementosjuegos[i];
    let title = article.querySelector("h3").textContent.toLowerCase();
    
    if (title.indexOf(buscador) > -1) {
        article.style.display = "";
    } else {
        article.style.display = "none";
    }
    }
}
)
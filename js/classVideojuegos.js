export default class Pelicula {
    #codigo;
    #nombre;
    #precio;
    #categoria;
    #imagen;
    #descripcion;
    #requisitos;
    #desarrollador;
    #reseñas;
   
  
    constructor(codigo = uuidv4(), nombre, precio, categoria, imagen, descripcion, requisitos, desarrollador, reseñas) {
      this.#codigo = codigo;
      this.#nombre = nombre;
      this.#precio = precio;
      this.#categoria = categoria;
      this.#imagen = imagen;
      this.#descripcion = descripcion;
      this.#requisitos = requisitos;
      this.#desarrollador = desarrollador;
      this.#reseñas = reseñas;
    }
  
    // Getters
    get codigo() {
      return this.#codigo;
    }
  
    get nombre() {
      return this.#nombre;
    }
  
    get precio() {
      return this.#precio;
    }
  
    get categoria() {
      return this.#categoria;
    }
  
    get imagen() {
      return this.#imagen;
    }
  
    get descripcion() {
      return this.#descripcion;
    }
  
    get requisitos() {
      return this.#requisitos;
    }
  
    get desarrollador() {
      return this.#desarrollador;
    }
  
    get reseñas() {
      return this.#reseñas;
    }
  

  
    // Setters
    set codigo(codigo) {
      this.#codigo = codigo;
    }
  
    set nombre(nombre) {
      this.#nombre = nombre;
    }
  
    set precio(precio) {
      this.#precio = precio;
    }
  
    set categoria(categoria) {
      this.#categoria = categoria;
    }
  
    set imagen(imagen) {
      this.#imagen = imagen;
    }
  
    set descripcion(descripcion) {
      this.#descripcion = descripcion;
    }
  
    set requisitos(requisitos) {
      this.#requisitos = requisitos;
    }
  
    set desarrollador(desarrollador) {
      this.#desarrollador = desarrollador;
    }
  
    set reseñas(reseñas) {
      this.#reseñas = reseñas;
    }
  

    toJSON(){
        return {
            codigo: this.codigo,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            requisitos: this.requisitos,
            reseñas: this.reseñas,
            desarrollador: this.desarrollador,
            categoria: this.categoria,
            imagen: this.imagen
        }
    }
  }


// let prueba = 'esto es una prueba'
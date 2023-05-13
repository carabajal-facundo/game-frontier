export default class Videojuego {
    #codigo;
    #nombre;
    #precio;
    #categoria;
    #imagen;
    #descripcion;
    #requisitos;
    #desarrollador;
    #reseñas;
    #distribuidor;
    #fechaLanzamiento
  
    constructor(codigo=uuidv4(), nombre, precio, categoria, imagen = {portada: "",baner: "",galeria1: "",galeria2: "",galeria3: "",galeria4: "",galeria5: "",galeria6: ""}, descripcion, requisitos = {os: "", processor: "", memory: "", graphics: "", directX: "", storage: "", additional: ""}, desarrollador, reseñas, distribuidor, fechaLanzamiento) {
      this.#codigo = codigo;
      this.#nombre = nombre;
      this.#precio = precio;
      this.#categoria = categoria;
      this.#imagen = imagen;
      this.#descripcion = descripcion;
      this.#requisitos = requisitos;
      this.#desarrollador = desarrollador;
      this.#reseñas = reseñas;
      this.#distribuidor = distribuidor;
      this.#fechaLanzamiento = fechaLanzamiento;
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
    get distribuidor() {
      return this.#distribuidor;
    }
    get fechaLanzamiento() {
      return this.#fechaLanzamiento;
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
    set distribuidor(distribuidor) {
      this.#distribuidor = distribuidor;
    }
    set fechaLanzamiento(fechaLanzamiento) {
      this.#fechaLanzamiento = fechaLanzamiento;
    }
  

    toJSON(){
        return {
            codigo: this.codigo,
            nombre: this.nombre,
            precio: this.precio,
            imagen: this.imagen,
            descripcion: this.descripcion,
            requisitos: this.requisitos,
            reseñas: this.reseñas,
            desarrollador: this.desarrollador,
            categoria: this.categoria,
            distribuidor: this.#distribuidor,
            fechaLanzamiento: this.fechaLanzamiento
            
        }
    }
  }


// let prueba = 'esto es una prueba'
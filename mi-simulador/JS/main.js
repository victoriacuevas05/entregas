// classes
class Pelicula {

    constructor(titulo, genero, vista, reseña, stock) {
        this.titulo = titulo;
        this.genero = genero;
        this.vista = vista;
        this.reseña = reseña;
        this.stock = stock;
    }

    marcarComoVista(reseña) {

        this.vista = true;
        this.reseña = reseña;

        return true;
    }
}
// arrays
const actores = JSON.parse(localStorage.getItem("actores")) || [];

const peliculasIniciales = [
    new Pelicula("obsesión", "Terror", false, "", 6),
    new Pelicula("son como niños", "Comedia", false, "", 0),
    new Pelicula("maze runner", "Ciencia ficción", false, "", 3),
    new Pelicula("e.t.", "Ciencia ficción", false, "", 0),
    new Pelicula("toy story", "Animación", false, "", 1),
    new Pelicula("Bajo la misma estrella", "Drama", false, "", 3),
    new Pelicula("Siempre el mismo día", "Romance", false, "", 5),
    new Pelicula("Hachiko", "Drama", false, "", 0),
    new Pelicula("Titanic", "Romance", false, "", 4),
    new Pelicula("La vida es bella", "Drama", false, "", 6)
];

let peliculas = [...peliculasIniciales];

// guardadas

const guardadas = localStorage.getItem("peliculas");

if (guardadas !== null) {
    peliculas = JSON.parse(guardadas).map(
        peli => new Pelicula(
            peli.titulo,
            peli.genero,
            peli.vista,
            peli.reseña,
            peli.stock
        )
    );
}
// todos los get element by id

const formulario = document.getElementById("formulario-pelicula");
const inputTitulo = document.getElementById("titulo");
const inputGenero = document.getElementById("genero");
const contenedor = document.getElementById("contenedorpeliculas");
const mensaje = document.getElementById("mensaje");
const selectAnimo = document.getElementById("estado-animo");
const botonRecomendar = document.getElementById("boton-recomendar");
const resultadoRecomendacion = document.getElementById("resultado-recomendacion");
const inputBuscar = document.getElementById("buscar-pelicula");
const botonBuscar = document.getElementById("boton-buscar");
const resultadoBusqueda = document.getElementById("resultado-busqueda")
const botonStock = document.getElementById("boton-stock");
const resultadoStock = document.getElementById("resultado-stock");
const inputActor = document.getElementById("actor-favorito");
const botonActor = document.getElementById("boton-actor");
const listaActores = document.getElementById("lista-actores");
const botonVaciar = document.getElementById("boton-vaciar");
const mensajeVaciar = document.getElementById("mensaje-vaciar");
const botonRecuperar = document.getElementById("boton-recuperar");
const formularioUsuario = document.getElementById("formulario-usuario");
const inputNombre = document.getElementById("nombre-usuario");
const inputAño = document.getElementById("año-nacimiento");
const mensajeBienvenida = document.getElementById("mensaje-bienvenida");
const estadoCarga = document.getElementById("estado-carga");
const botonCargar = document.getElementById("boton-cargar");


// localstorage pelis
function guardarPeliculas() {
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}
// vaciar function
function vaciarDiario() {

    const confirmar = confirm("¿Estás seguro de que querés vaciar tu diario?");

    if (confirmar) {

        peliculas.length = 0;

        localStorage.setItem("peliculas", JSON.stringify(peliculas));

        renderizarPeliculas();

        mensajeVaciar.textContent = "Tu diario fue vaciado correctamente.";
    }
}

botonVaciar.addEventListener("click", vaciarDiario);
// function recuperar

function recuperarDiario() {

    const confirmar = confirm("¿Querés recuperar las películas originales?");

    if (confirmar) {

        peliculas = peliculasIniciales.map(
            peli => new Pelicula(
                peli.titulo,
                peli.genero,
                peli.vista,
                peli.reseña,
                peli.stock
            )
        );

        guardarPeliculas();

        renderizarPeliculas();

        mensajeVaciar.textContent = "¡Diario recuperado correctamente!";
    }
}
botonRecuperar.addEventListener("click", recuperarDiario);
// Función para mostrar las películas 

function renderizarPeliculas() {

    contenedor.innerHTML = "";

    for (const pelicula of peliculas) {

        const { titulo, genero, vista } = pelicula;

        contenedor.innerHTML += `
            <article class="tarjeta-pelicula">

                <h3>${titulo}</h3>

                <p>Género: ${genero}</p>

                <p>Estado: ${vista ? "Vista" : "No vista"}</p>

                <textarea
                    class="input-resena"
                    placeholder="Escribí tu reseña..."
                ></textarea>

                <button class="boton-vista" data-titulo="${titulo}">
                    ${vista ? "Ya está vista" : "Guardar reseña y marcar como vista"}
                </button>

                <button class="boton-eliminar" data-titulo="${titulo}">
                    Eliminar
                </button>

            </article>
        `;
    

    // Mostrar las reseñas guardadas
    const tarjetas = contenedor.querySelectorAll(".tarjeta-pelicula");

    tarjetas.forEach((tarjeta, indice) => {

        tarjeta.querySelector(".input-resena").value =
            peliculas[indice].reseña || "";

    });
}
    }

//  formulario

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value.trim();

    if (titulo === "" || genero === "") {
        mensaje.textContent = "Completá el título y el género.";
        return;
    }

    const nuevaPelicula = new Pelicula(
        titulo,
        genero,
        false,
        "",
        0
    );

    peliculas.push(nuevaPelicula);

    guardarPeliculas();

    renderizarPeliculas();

    mensaje.textContent = "¡Película agregada a tu diario!";

    formulario.reset();
});

// click

    contenedor.addEventListener("click", function(event) {

    const titulo = event.target.dataset.titulo;

    if (!titulo) {
        return;
    }

    const indice = peliculas.findIndex(
        pelicula => pelicula.titulo === titulo
    );

    if (indice === -1) {
        return;
    }

    // ELIMINAR PELÍCULA
    if (event.target.classList.contains("boton-eliminar")) {

        peliculas.splice(indice, 1);

        guardarPeliculas();

        renderizarPeliculas();

        mensaje.textContent = "Película eliminada de tu diario.";
    }

    // MARCAR COMO VISTA Y GUARDAR RESEÑA
    if (event.target.classList.contains("boton-vista")) {

        const pelicula = peliculas[indice];

        if (pelicula.vista) {
            mensaje.textContent = "Esta película ya está marcada como vista.";
            return;
        }

        const tarjeta = event.target.closest(".tarjeta-pelicula");

        const inputResena = tarjeta.querySelector(".input-resena");

        const resena = inputResena.value.trim();

        pelicula.marcarComoVista(resena);

        guardarPeliculas();

        renderizarPeliculas();

        mensaje.textContent =
            "¡Película marcada como vista y reseña guardada!";
    }

});


// // Mostrar las películas iniciales al abrir la página
// renderizarPeliculas();


// function para buscarrrrr
function consultar() {

    const buscar = inputBuscar.value.trim();

    if (buscar === "") {
        resultadoBusqueda.textContent = "Ingresá una película.";
        return;
    }

    const buscaTUPELI = peliculas.find(
        peli => peli.titulo.toLowerCase() === buscar.toLowerCase()
    );

    if (buscaTUPELI) {

        resultadoBusqueda.innerHTML = `
            <h3>${buscaTUPELI.titulo}</h3>
            <p>Género: ${buscaTUPELI.genero}</p>
            <p>Stock disponible: ${buscaTUPELI.stock}</p>
            <p>Estado: ${buscaTUPELI.vista ? "Vista" : "No vista"}</p>
            <p>Reseña: ${buscaTUPELI.reseña || "Todavía no tiene reseña"}</p>
        `;

    } else {

        resultadoBusqueda.textContent =
            "No encontramos esa película. Revisá el nombre e intentá de nuevo.";
    }
}
botonBuscar.addEventListener("click", consultar);


function total() {

    const stockTotal = peliculas.reduce(
        (total, peli) => total + peli.stock,
        0
    );

    resultadoStock.textContent = "Stock total: " + stockTotal;
}

botonStock.addEventListener("click", total);
// function para recomendar por animo 3

function recomendarPorEstadoDeAnimo() {

    const genero = selectAnimo.value;

    const recomendadas = peliculas.filter(
        pelicula => pelicula.genero === genero
    );

    const titulos = recomendadas.map(
        pelicula => pelicula.titulo
    );

    resultadoRecomendacion.textContent =
        recomendadas.length > 0
            ? "Te recomendamos: " + titulos.join(", ")
            : "No tenemos películas de ese género.";
}
botonRecomendar.addEventListener("click", recomendarPorEstadoDeAnimo);

// actor function
function actorFavorito() {

    const actor = inputActor.value.trim();

    if (actor === "") {
        return;
    }

    actores.push(actor);

    localStorage.setItem("actores", JSON.stringify(actores));

    renderizarActores();

    inputActor.value = "";
}


function renderizarActores() {

    listaActores.innerHTML = "";

    for (const actor of actores) {

        const li = document.createElement("li");

        li.textContent = actor;

        listaActores.appendChild(li);
    }
}
botonActor.addEventListener("click", actorFavorito);

renderizarActores();
// Function CARGAR PELIZ
function cargarPeliculas() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Array.isArray(peliculas)) {
                resolve(peliculas);
            } else {
                reject(new Error("No se pudieron cargar las películas"));
            }
        }, 2000);
    });
}
async function mostrarDiario() {
    try {
        estadoCarga.textContent = " Cargando películas...";

        const peliculasCargadas = await cargarPeliculas();

        renderizarPeliculas();

        estadoCarga.textContent =
            ` ${peliculasCargadas.length} películas cargadas`;

    } catch (error) {
        estadoCarga.textContent =
            "No se pudo cargar el diario. Intentá nuevamente.";

        console.error(error);

    } finally {
        console.log("Proceso de carga finalizado");
    }
}

botonCargar.addEventListener("click", mostrarDiario);

// inicio
formularioUsuario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const añoNacimiento = Number(inputAño.value);

    const edad = new Date().getFullYear() - añoNacimiento;

    mensajeBienvenida.textContent =
        "¡Bienvenido a Film Journal, " + nombre + "!";

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("añoNacimiento", añoNacimiento);

    console.log("Edad aproximada:", edad);
});
const nombreGuardado = localStorage.getItem("nombre");

if (nombreGuardado !== null) {

    mensajeBienvenida.textContent =
        "¡Bienvenido nuevamente, " + nombreGuardado + "!";
}
//mod 9
// // setTimeout ( esto que esta adentro se va a ejecutar despues de tanto tiempo)
// console.log(prepearanadomotores)
// let largada=setTimeout(()=>{
//     console.log("largadaaa")
// },2000)

// // setInterval(() =( se ejecuta en un intervalo de tiempo)> {
    
// console.log("atencion banderas amarillas")
// let safety= setInterval(()=>{
//     console.log("banderas amarillsa,seguir")
// },1500)

// // para cancelar el interval se llama clear interval
// clearInterval(safety)
// clearTimeout


// let contador = 0;

// const intervalo = setInterval(() => {
//     contador++;
//     console.log(contador);

//     if (contador === 5) {
//         clearInterval(intervalo);
//     }
// }, 1000);


// Muestra 1, 2, 3, 4 y 5, aproximadamente uno por segundo.

// // promesas
//  function podioChecker (posicion) {
//     return new Promise((resolve, reject) => {
//         if(posicion > 3) {
//             return reject(`Terminaste en la posicion "${posicion}" no vas al podio`)
//         }
//         setTimeout(()=> {
//             resolve({
//                 posicion,
//                 result: "Felicitaciones! Vas al podio"
//             })
//         }, 1000)
        
//     })
// }

// podioChecker(5).then(data => console.log(data))  


// JavaScript es un lenguaje de un solo hilo, es decir, puede ejecutar una tarea a la vez. Sin embargo, gracias al Event Loop, puede manejar tareas que tardan sin detener toda la página.

// Call Stack (Pila de ejecución)
// Es donde JavaScript organiza las funciones que debe ejecutar.
// - Cuando se llama a una función, entra al Call Stack.
// - Cuando termina, sale.
// - Funciona con el sistema LIFO: el último en entrar es el primero en salir.

// . .then() y .catch()
// Son métodos utilizados para manejar el resultado de una promesa.

// .then() se ejecuta cuando la promesa se cumple.

// .catch() permite manejar los errores cuando la promesa se rechaza

// La palabra async se utiliza para declarar una función asíncrona.
// async function saludar() {
//     return "Hola Mundo";
// }

// La palabra await permite esperar a que una promesa termine para obtener su resultado.
// async function cargarUsuario() {
//     const usuario = await obtenerUsuario();
//     console.log(usuario);
// }

setTimeout(() => {
    const mensaje = document.getElementById("recordatorio");

    mensaje.textContent =
        " ¡No olvides registrar las películas que viste!";
}, 3000);
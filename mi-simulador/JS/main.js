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

let peliculasIniciales = [];
let peliculas = [];

// guardadas local

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

async function vaciarDiario() {

    const resultado = await Swal.fire({
        title: "¿Estás seguro de vaciar tu diario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    });

    if (resultado.isConfirmed) {
        peliculas.length = 0;
        guardarPeliculas();
        renderizarPeliculas();

        mensajeVaciar.textContent = "Tu diario fue vaciado correctamente.";
    }
}
botonVaciar.addEventListener("click", vaciarDiario);

// function recuperar

async function recuperarDiario() {
    if (peliculasIniciales.length === 0) {
        Swal.fire({
            title: "No hay películas disponibles",
            text: "No se pudieron cargar las películas originales",
            icon: "error"
        });
        return;
    }
    const resultado = await Swal.fire({
        title: "¿Querés recuperar las películas originales?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, recuperar",
        cancelButtonText: "Cancelar"
    });

    if (resultado.isConfirmed) {
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

//  formulario para agrgar

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

    Swal.fire({
        title: "¡Película agregada!",
        text: "La película se agregó correctamente a tu diario",
        icon: "success",
        timer: 1800,
        showConfirmButton: false
    });

    formulario.reset();
});

// click

contenedor.addEventListener("click", function (event) {

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

// function para sacar stock total

function total() {

    const stockTotal = peliculas.reduce(
        (total, peli) => total + peli.stock,
        0
    );

    resultadoStock.textContent = "Stock total: " + stockTotal;
}

botonStock.addEventListener("click", total);

// function para recomendar por animo 

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

// renderizarActores

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

// Function PROMESA

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

// asincronooo

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

botonCargar.addEventListener("click", obtenerPeliculas);

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

// settimeout

setTimeout(() => {
    const mensaje = document.getElementById("recordatorio");

    mensaje.textContent =
        " ¡No olvides registrar las películas que viste!";
}, 3000);


// MOD 10

const url = "./db/data.json";
async function obtenerPeliculas() {

    estadoCarga.textContent = "Cargando películas...";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("No se pudieron cargar las películas");
        }

        const data = await response.json();

        console.log(data);

        const peliculasDelJSON = data.map(peli =>
            new Pelicula(
                peli.titulo,
                peli.genero,
                peli.vista,
                peli.reseña,
                peli.stock
            )
        );

        console.log(peliculasDelJSON);
        peliculasIniciales = peliculasDelJSON;

        if (localStorage.getItem("peliculas") === null) {
            peliculas = peliculasDelJSON;
            guardarPeliculas();
        }

        renderizarPeliculas();
    }
    catch (error) {
        console.log("Hubo un error", error);
        estadoCarga.textContent = "No se pudieron cargar las películas.";
        Swal.fire({
            title: "Error",
            text: "No se pudieron cargar las películas",
            icon: "error"
        });
    }
    finally {
        if (estadoCarga.textContent === "Cargando películas...") {
            estadoCarga.textContent = "";
        }

        console.log("Finalizó la petición");
    }

}

obtenerPeliculas();
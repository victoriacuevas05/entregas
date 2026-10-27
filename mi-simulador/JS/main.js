
class Pelicula {
    constructor(titulo, genero, vista, reseña, stock) {
        this.titulo = titulo;
        this.genero = genero;
        this.vista = vista;
        this.reseña = reseña;
        this.stock = stock;
    }
}

// ARRAYS Y LOCALSTORAGE

const actores = JSON.parse(localStorage.getItem("actores")) || [];

let peliculas = [];
let hayPeliculasGuardadas = false;

const guardadas = localStorage.getItem("peliculas");

if (guardadas !== null) {
    try {
        peliculas = JSON.parse(guardadas);
        hayPeliculasGuardadas = true;
    } catch (error) {
        console.error("No se pudieron recuperar las películas guardadas:", error);
    }
}

// ELEMENTOS DEL HTML

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
const resultadoBusqueda = document.getElementById("resultado-busqueda");

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

const filtroGenero = document.getElementById("filtro-genero");

const botonCargar = document.getElementById("boton-cargar");
const estadoCarga = document.getElementById("estado-carga");

// GUARDAR PELÍCULAS

function guardarPeliculas() {
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    hayPeliculasGuardadas = true;
}

// FETCH - ENTREGA 10

async function leerCatalogo() {

    const respuesta = await fetch("./db/data.json");

    if (!respuesta.ok) {
        throw new Error("No se pudo leer db/data.json");
    }

    return await respuesta.json();
}

// CARGAR PELÍCULAS DESDE EL JSON

async function cargarPeliculas() {

    try {
        estadoCarga.textContent = "Cargando películas...";
        botonCargar.disabled = true;

        const datos = await leerCatalogo();

        // Si no hay datos guardados, usamos el JSON.
        // Las películas originales son objetos normales.

        if (!hayPeliculasGuardadas) {
            peliculas = datos;
            guardarPeliculas();
        }

        renderizarPeliculas();

        estadoCarga.textContent =
            peliculas.length + " películas disponibles";

    } catch (error) {

        estadoCarga.textContent =
            "No se pudo cargar el diario. Revisá el archivo JSON.";

        console.error(error);

    } finally {

        botonCargar.disabled = false;

    }
}

botonCargar.addEventListener("click", cargarPeliculas);

// MOSTRAR PELÍCULAS

function renderizarPeliculas() {

    contenedor.innerHTML = "";

    const generoSeleccionado = filtroGenero.value;

    const peliculasFiltradas = peliculas.filter(pelicula =>
        generoSeleccionado === "Todos" ||
        pelicula.genero === generoSeleccionado
    );

    peliculasFiltradas.forEach((pelicula, indice) => {

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-pelicula";

        const titulo = document.createElement("h3");
        titulo.textContent = pelicula.titulo;

        const genero = document.createElement("p");
        genero.textContent = "Género: " + pelicula.genero;

        const estado = document.createElement("p");
        estado.textContent =
            "Estado: " + (pelicula.vista ? "Vista" : "No vista");

        const resenaMostrada = document.createElement("p");
        resenaMostrada.textContent =
            "Reseña: " + (pelicula.reseña || "Sin reseña");

        const inputResena = document.createElement("textarea");
        inputResena.id = "resena-input-" + indice;
        inputResena.placeholder = "Escribí tu reseña...";
        inputResena.value = pelicula.reseña || "";

        const botonVista = document.createElement("button");
        botonVista.id = "vista-" + indice;
        botonVista.textContent = pelicula.vista
            ? "Marcar como no vista"
            : "Marcar como vista";

        const botonResena = document.createElement("button");
        botonResena.id = "resena-" + indice;
        botonResena.textContent = "Guardar reseña";

        const botonEliminar = document.createElement("button");
        botonEliminar.id = "eliminar-" + indice;
        botonEliminar.textContent = "Eliminar";

        // MARCAR COMO VISTA O NO VISTA

        botonVista.addEventListener("click", function () {

            pelicula.vista = !pelicula.vista;

            guardarPeliculas();
            renderizarPeliculas();

        });

        // GUARDAR RESEÑA

        botonResena.addEventListener("click", function () {

            pelicula.reseña = inputResena.value.trim();

            guardarPeliculas();
            renderizarPeliculas();

        });

        // ELIMINAR PELÍCULA

        botonEliminar.addEventListener("click", function () {

            peliculas = peliculas.filter(
                peli => peli !== pelicula
            );

            guardarPeliculas();
            renderizarPeliculas();

        });

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(genero);
        tarjeta.appendChild(estado);
        tarjeta.appendChild(resenaMostrada);
        tarjeta.appendChild(inputResena);
        tarjeta.appendChild(botonVista);
        tarjeta.appendChild(botonResena);
        tarjeta.appendChild(botonEliminar);

        contenedor.appendChild(tarjeta);

    });
}

filtroGenero.addEventListener("change", renderizarPeliculas);

// AGREGAR PELÍCULA NUEVA CON CONSTRUCTOR

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value;

    if (titulo.length < 2) {
        mensaje.textContent =
            "Ingresá un título de al menos dos caracteres.";
        return;
    }

    if (genero === "") {
        mensaje.textContent = "Seleccioná un género.";
        return;
    }

    const existente = peliculas.find(pelicula =>
        pelicula.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (existente) {
        mensaje.textContent = "Esta película ya está en tu diario.";
        return;
    }

    // SOLO ACÁ USAMOS NEW PELICULA

    const nuevaPelicula = new Pelicula(
        titulo,
        genero,
        false,
        "",
        0
    );

    peliculas.push(nuevaPelicula);

    filtroGenero.value = "Todos";

    guardarPeliculas();
    renderizarPeliculas();

    mensaje.textContent = "";
    formulario.reset();

    Swal.fire({
        title: "¡Película agregada!",
        text: "La película se guardó correctamente.",
        icon: "success"
    });

});

// VACIAR DIARIO

function vaciarDiario() {

    Swal.fire({
        title: "¿Querés vaciar tu diario?",
        text: "Se eliminarán las películas de tu colección.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"

    }).then(resultado => {

        if (resultado.isConfirmed) {

            peliculas = [];

            guardarPeliculas();
            renderizarPeliculas();

            mensajeVaciar.textContent =
                "Tu diario fue vaciado correctamente.";

        }

    });
}

botonVaciar.addEventListener("click", vaciarDiario);

// RECUPERAR PELÍCULAS DESDE EL JSON

async function recuperarDiario() {

    const resultado = await Swal.fire({
        title: "¿Querés recuperar las películas originales?",
        text: "Se reemplazará tu colección actual.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, recuperar",
        cancelButtonText: "Cancelar"
    });

    if (!resultado.isConfirmed) {
        return;
    }

    try {

        const datos = await leerCatalogo();

        peliculas = datos;

        filtroGenero.value = "Todos";

        guardarPeliculas();
        renderizarPeliculas();

        mensajeVaciar.textContent =
            "¡Diario recuperado correctamente!";

        Swal.fire({
            title: "¡Diario recuperado!",
            text: peliculas.length + " películas restauradas.",
            icon: "success"
        });

    } catch (error) {

        console.error(error);

        Swal.fire({
            title: "Error al recuperar",
            text: "Revisá que db/data.json exista y usá Live Server.",
            icon: "error"
        });

    }
}

botonRecuperar.addEventListener("click", recuperarDiario);

// BUSCAR PELÍCULA

function consultar() {

    const buscar = inputBuscar.value.trim().toLowerCase();

    if (buscar === "") {
        resultadoBusqueda.textContent = "Ingresá una película.";
        return;
    }

    const pelicula = peliculas.find(
        peli => peli.titulo.toLowerCase() === buscar
    );

    if (pelicula) {

        resultadoBusqueda.innerHTML = "";

        const titulo = document.createElement("h3");
        titulo.textContent = pelicula.titulo;

        const detalle = document.createElement("p");

        detalle.textContent =
            "Género: " + pelicula.genero +
            " | Stock: " + pelicula.stock +
            " | Estado: " + (pelicula.vista ? "Vista" : "No vista") +
            " | Reseña: " + (pelicula.reseña || "Sin reseña");

        resultadoBusqueda.appendChild(titulo);
        resultadoBusqueda.appendChild(detalle);

    } else {

        resultadoBusqueda.textContent =
            "No encontramos esa película.";

    }
}

botonBuscar.addEventListener("click", consultar);

// STOCK TOTAL

function total() {

    const stockTotal = peliculas.reduce(
        (total, peli) => total + peli.stock,
        0
    );

    resultadoStock.textContent = "Stock total: " + stockTotal;

}

botonStock.addEventListener("click", total);

// RECOMENDAR POR ESTADO DE ÁNIMO

function recomendarPorEstadoDeAnimo() {

    const genero = selectAnimo.value;

    const recomendadas = peliculas.filter(
        pelicula => pelicula.genero === genero
    );

    const titulos = [];

    recomendadas.forEach(pelicula => {
        titulos.push(pelicula.titulo);
    });

    resultadoRecomendacion.textContent =
        recomendadas.length > 0
            ? "Te recomendamos: " + titulos.join(", ")
            : "No tenemos películas de ese género.";

}

botonRecomendar.addEventListener(
    "click",
    recomendarPorEstadoDeAnimo
);

// MOSTRAR, EDITAR Y ELIMINAR ACTORES

function renderizarActores() {

    listaActores.innerHTML = "";

    actores.forEach((actor, indice) => {

        const li = document.createElement("li");

        const nombreActor = document.createElement("span");
        nombreActor.textContent = actor;

        const botonEditar = document.createElement("button");
        botonEditar.id = "editar-actor-" + indice;
        botonEditar.textContent = "Editar";

        const botonEliminar = document.createElement("button");
        botonEliminar.id = "eliminar-actor-" + indice;
        botonEliminar.textContent = "Eliminar";

        // ELIMINAR ACTOR

        botonEliminar.addEventListener("click", function () {

            actores.splice(indice, 1);

            localStorage.setItem(
                "actores",
                JSON.stringify(actores)
            );

            renderizarActores();

        });

        // EDITAR ACTOR

        botonEditar.addEventListener("click", function () {

            const inputEditar = document.createElement("input");
            inputEditar.type = "text";
            inputEditar.value = actor;

            const botonGuardar = document.createElement("button");
            botonGuardar.textContent = "Guardar";

            li.innerHTML = "";

            li.appendChild(inputEditar);
            li.appendChild(botonGuardar);

            botonGuardar.addEventListener("click", function () {

                const nuevoNombre = inputEditar.value.trim();

                if (
                    nuevoNombre === "" ||
                    !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/.test(nuevoNombre)
                ) {
                    inputEditar.value = "";
                    inputEditar.placeholder = "Ingresá un nombre válido";
                    return;
                }

                actores[indice] = nuevoNombre;

                localStorage.setItem(
                    "actores",
                    JSON.stringify(actores)
                );

                renderizarActores();

            });

        });

        li.appendChild(nombreActor);
        li.appendChild(botonEditar);
        li.appendChild(botonEliminar);

        listaActores.appendChild(li);

    });

}

// AGREGAR ACTOR FAVORITO

function actorFavorito() {

    const actor = inputActor.value.trim();

    if (
        actor === "" ||
        !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/.test(actor)
    ) {
        inputActor.value = "";
        inputActor.placeholder = "Ingresá un nombre válido";
        return;
    }

    actores.push(actor);

    localStorage.setItem("actores", JSON.stringify(actores));

    renderizarActores();

    inputActor.value = "";

}

botonActor.addEventListener("click", actorFavorito);

// FORMULARIO DE USUARIO

formularioUsuario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const añoTexto = inputAño.value.trim();
    const añoNacimiento = Number(añoTexto);

    if (
        nombre === "" ||
        !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(nombre)
    ) {
        mensajeBienvenida.textContent =
            "Ingresá un nombre válido, sin números.";
        return;
    }

    if (
        añoTexto.length !== 4 ||
        isNaN(añoNacimiento) ||
        añoNacimiento < 1900 ||
        añoNacimiento > new Date().getFullYear()
    ) {
        mensajeBienvenida.textContent =
            "Ingresá un año de nacimiento válido.";
        return;
    }

    mensajeBienvenida.textContent =
        "¡Bienvenido a Film Journal, " + nombre + "!";

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("añoNacimiento", añoNacimiento);

});

const nombreGuardado = localStorage.getItem("nombre");

if (nombreGuardado !== null) {
    mensajeBienvenida.textContent =
        "¡Bienvenido nuevamente, " + nombreGuardado + "!";
}

// TEMPORIZADOR - ENTREGA 9

setTimeout(() => {

    document.getElementById("recordatorio").textContent =
        "¡No olvides registrar las películas que viste!";

}, 3000);

// INICIAR SIMULADOR

renderizarActores();
renderizarPeliculas();

estadoCarga.textContent =
    "Presioná Cargar mi diario para leer el catálogo.";

// classes
class Pelicula {

    constructor(titulo, genero, vista, reseña, stock) {
        this.titulo = titulo;
        this.genero = genero;
        this.vista = vista;
        this.reseña = reseña;
        this.stock = stock;
    }

    marcarComoVista() {
    const resena = prompt("¿Qué te pareció " + this.titulo + "?");

    if (resena === null) {
        return false;
    }

    this.vista = true;
    this.reseña = resena;

    return true;
}
}
// arrays
const actores = [];

const peliculas = [
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
const formulario = document.getElementById("formulario-pelicula");
const inputTitulo = document.getElementById("titulo");
const inputGenero = document.getElementById("genero");
const contenedor = document.getElementById("contenedorpeliculas");
const mensaje = document.getElementById("mensaje");

// Función para mostrar las películas 
function renderizarPeliculas() {
    contenedor.innerHTML = "";

    for (const pelicula of peliculas) {
        contenedor.innerHTML += `
            <article class="tarjeta-pelicula">
                <h3>${pelicula.titulo}</h3>
                <p>Género: ${pelicula.genero}</p>
                <p>Estado: ${pelicula.vista ? "Vista" : "No vista"}</p>
                <button class="boton-vista" data-titulo="${pelicula.titulo}">
                    ${pelicula.vista ? "Ya está vista" : "Marcar como vista"}
                </button>
                <button class="boton-eliminar" data-titulo="${pelicula.titulo}">
                    Eliminar
                </button>
            </article>
        `;
    }
}

//  formulario
formulario.addEventListener("submit", function(event) {
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

    if (event.target.classList.contains("boton-eliminar")) {
        peliculas.splice(indice, 1);

        renderizarPeliculas();
        mensaje.textContent = "Película eliminada de tu diario.";
    }

    if (event.target.classList.contains("boton-vista")) {
        const pelicula = peliculas[indice];

        if (pelicula.vista) {
            mensaje.textContent = "Esta película ya está marcada como vista.";
            return;
        }

        pelicula.marcarComoVista();

        renderizarPeliculas();
        mensaje.textContent = pelicula.vista
            ? "¡Película marcada como vista!"
            : "No se modificó el estado de la película.";
    }
});

// Mostrar las películas iniciales al abrir la página
renderizarPeliculas();
// // MOSTRAR PELÍCULAS EN EL HTML
// const titulo1 = document.getElementById("contenedorpeliculas")
// console.log(titulo1) 
// const parrafos = document.getElementsByClassName("descripcion-principal")
// console.log(parrafos)

// // crearelementos
// const parrafo = document.createElement('p')
// parrafo.textContent= "Este párrafo fue creado con JavaScript"
// document.body.appendChild(parrafo)

// // eliminar elementoK
// const titulo = document.querySelector('h1')
// titulo.remove() 

// // click
// const boton = document.getElementById("submit");

// boton.addEventListener("click", (event) => {
//     event.preventDefault();
//     console.log("Hiciste clic");
// });

// // tecla
// const input = document.querySelector('input')
// input.addEventListener('keydown', () => {console.log('Tecla presionada')})

// ;

// // flecha
// document.addEventListener('keydown', function(event) {
//  if (event.key === 'ArrowUp') {
//  console.log("Moviendo al personaje hacia arriba...");
//  }
// });



// function de actor
function actorFavorito(mensaje) {

    let actor = prompt(mensaje);

    actores.push(actor);

    console.log(actores);
}

// function paara mostrar pelis 1
function disponibilidad() {
    let necesito = prompt(
        "¿Qué necesitas?\n" +
        "1. Ver la lista completa\n" +
        "2. Ver películas según género\n" +
        "3. Buscar una película específica"
    );

    switch (necesito) {
        case "1":
            verPeliculas();
            break;

        case "2":
            recomendarPorGenero();
            break;

        case "3":
            consultar();
            break;

        default:
            alert("Elegí una opción válida.");
            break;
    }
}


// function verPeliculas() {

//     let lista = "";
//     let numero = 1;

//     for (const pelicula of peliculas) {
//         lista += numero + ". " + pelicula.titulo;

//         if (pelicula.vista === true) {
//             lista += " (Vista)";
//         } else {
//             lista += " (No vista)";
//         }

//         lista += "\n";
//         numero++;
//     }

//     alert("Películas disponibles:\n\n" + lista);

//     let eleccion = prompt(
//         "Ingresá el número de la película que querés marcar como vista"
//     );

//     if (eleccion === null) {
//         return;
//     }

//     let indice = parseInt(eleccion) - 1;

//     if (isNaN(indice) || indice < 0 || indice >= peliculas.length) {
//         alert("Elegiste un número inválido.");
//         return;
//     }

//     const peliculaElegida = peliculas[indice];

//     if (peliculaElegida.vista) {
//         alert("Ya marcaste esta película como vista. Tu reseña es: " + peliculaElegida.reseña);
//     } else {
//         peliculaElegida.marcarComoVista();

//         alert("¡Película marcada como vista y reseña guardada!");
//     }
// }

// function para recomendar por genero
function recomendarPorGenero() {

    let genero = prompt(
        "¿Qué género querés ver?\n" +
        "1. Terror\n" +
        "2. Comedia\n" +
        "3. Ciencia ficción\n" +
        "4. Animación\n" +
        "5. Drama\n" +
        "6. Romance"
    );

    let generoElegido = "";

    switch (genero) {
        case "1":
            if (edad >= 18) {

                generoElegido = "Terror";

            } else {

                alert("No podés ver este g porque es para mayores de 18 años.");
            }

            break;

        case "2":
            generoElegido = "Comedia";
            break;

        case "3":
            generoElegido = "Ciencia ficción";
            break;

        case "4":
            generoElegido = "Animación";
            break;

        case "5":
            generoElegido = "Drama";
            break;

        case "6":
            generoElegido = "Romance";
            break;

        default:
            alert("No elegiste una opción válida.");
            return;
    }

    const recomendadas = peliculas.filter(
        peli => peli.genero.toLowerCase() === generoElegido.toLowerCase()
    );

    if (recomendadas.length > 0) {

       let lista = recomendadas.map(
    peli => peli.titulo.toUpperCase()
).join("\n");

console.log(lista);

alert("Películas de " + generoElegido + ":\n\n" + lista);

    } else {

        alert("No tenemos películas de ese género.");
    }
}

// function para buscarrrrr
function consultar() {
    const buscar = prompt("¿Qué película querés buscar?");

    if (buscar === null) {
        return;
    }

    const buscaTUPELI = peliculas.find(
        peli => peli.titulo.toLowerCase() === buscar.toLowerCase()
    );

    if (buscaTUPELI) {
        alert(
            "¡Película encontrada!\n\n" +
            "Título: " + buscaTUPELI.titulo +
            "\nGénero: " + buscaTUPELI.genero +
            "\nStock disponible: " + buscaTUPELI.stock +
            "\nEstado: " + (buscaTUPELI.vista ? "Vista" : "No vista") +
            "\nReseña: " + (buscaTUPELI.reseña || "Todavía no tiene reseña")
        );
    } else {
        alert("No encontramos esa película. Revisá el nombre e intentá de nuevo.");
    }
}

// functon de modificar peli 2
function modificarPeliculas() {

    let accion = prompt(
        "¿Qué querés hacer?\n" +
        "1. Agregar una película\n" +
        "2. Quitar una película\n" +
        "3. Consultar stock\n"
    );

    switch (accion) {
        case "1":
            agregarPelicula()
            break;

        case "2":
            quitarPelicula()
            break;

        case "3": total()

            break;
        default:
            alert("No elegiste una opción válida.");
            return;
    }
}

// function para agragar

function agregarPelicula() {

    let titulo = prompt("Ingresá el nombre de la película");
    let genero = prompt("Ingresá el género");
    let stock = parseInt(prompt("¿Cuántas unidades hay en stock?"));

    const nuevaPelicula = new Pelicula(
        titulo, genero, false, "", stock
    );

    peliculas.push(nuevaPelicula);

    alert("Película agregada correctamente.");
}

// fuction para quitar

function quitarPelicula() {

    let pelicula = prompt("Ingresá el número de la película que querés quitar");

    peliculas.splice(parseInt(pelicula) - 1, 1);

    alert("Película eliminada correctamente.");
}

// fuction para saber total de stock 

function total() {

    const confirmarStock = prompt(
        "¿Querés saber el stock total de todas las películas? (si/no)"
    );

    if (confirmarStock.toLowerCase() === "si") {

        const stockTotal = peliculas.reduce(
            (total, peli) => total + peli.stock,
            0
        );

        console.log("Stock total:", stockTotal);

        alert("Stock total:"+ stockTotal);

    } else {
        console.log("No se calculó el stock total.");
    }

}
// function para recomendar por animo 3

function recomendarPorEstadoDeAnimo() {
    let animo = prompt(
        "¿Cómo te sentís hoy?\n" +
        "1. Feliz\n" +
        "2. Triste\n" +
        "3. Con ganas de emocionarme\n" +
        "4. Con ganas de aventura\n" +
        "5. Con ganas de reírme"
    );

    let genero;

    switch (animo) {
        case "1":
            genero = "Comedia";
            break;
        case "2":
            genero = "Drama";
            break;
        case "3":
            genero = "Romance";
            break;
        case "4":
            genero = "Ciencia ficción";
            break;
        case "5":
            genero = "Comedia";
            break;
        default:
            alert("Elegí una opción válida.");
            return;
    }

    const recomendadas = peliculas.filter(
        pelicula => pelicula.genero === genero
    );

    if (recomendadas.length > 0) {
        const titulos = recomendadas.map(
            pelicula => pelicula.titulo
        );

        alert("Te recomendamos estas películas:\n" + titulos.join("\n"));
    } else {
        alert("No tenemos películas de ese género.");
    }
}
// function para salir 

function salir() {

    alert("¡Gracias por usar el simulador, " + nombre + "!");

    continuar = false;
}


// inicio
alert("Bienvenido a mi sitio web de pelis");

const nombre = prompt("Hola, ¿cuál es tu nombre?");

console.log(nombre);

let añoNacimiento = parseInt(
    prompt("Ingrese el año de su nacimiento")
);

let edad = 2026 - añoNacimiento;

console.log(edad);

alert("Hola, " + nombre);


let continuar = true;

actorFavorito("Ingresá tu actor favorito para guardarlo en la lista");


// menu
while (continuar) {

    let opcion = prompt(
        "¿Qué querés hacer?\n" +
        "1. Ver películas\n" +
        "2. Agregar / Quitar una película\n" +
        "3.  Recomendación por estado de ánimo\n" +
        "4.  Salir"
    );


    switch (opcion) {

        case "1":
            disponibilidad()

            break;

        case "2":
            modificarPeliculas();
            break;

        case "3":
            recomendarPorEstadoDeAnimo();

            break;


        case "4":
            salir();
            break;


        default:
            alert("Opción inválida. Elegí del 1 al 4");
    }
}
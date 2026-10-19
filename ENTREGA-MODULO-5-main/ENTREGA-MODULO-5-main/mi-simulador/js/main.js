// arrays
const peliculas = ["obsesión", "son como niños", "maze runner", "e.t.", "toy story"];

const actores = [];

// classes
class Pelicula {

    constructor(titulo, genero, vista, reseña) {
        this.titulo = titulo;
        this.genero = genero;
        this.vista = vista;
        this.reseña = reseña;
    }

    marcarComoVista() {
        this.vista = true;
        this.reseña = prompt("¿Qué te pareció " + this.titulo + "?");
    }
}

// functions
function actorFavorito(mensaje) {

    let actor = prompt(mensaje);

    actores.push(actor);

    console.log(actores);
}

function verPeliculas() {

    let lista = "";
    let numero = 1;

    for (const pelicula of peliculas) {
        lista += numero + ". " + pelicula + "\n";
        numero++;
    }

    alert("Películas disponibles:\n\n" + lista);
}

function modificarPeliculas() {

    let accion = prompt(
        "¿Qué querés hacer?\n" +
        "1. Agregar una película\n" +
        "2. Quitar una película"
    );

    if (accion === "1") {

        agregarPelicula();

    } else if (accion === "2") {

        quitarPelicula();

    } else {

        alert("Opción inválida.");
    }
}

function agregarPelicula() {

    let nuevaPelicula = prompt("Ingresá el nombre de la película");

    peliculas.push(nuevaPelicula);

    alert("Película agregada correctamente.");
}

function quitarPelicula() {

    let pelicula = prompt("Ingresá el número de la película que querés quitar");

    peliculas.splice(parseInt(pelicula) - 1, 1);

    alert("Película eliminada correctamente.");
}

function recomendarPorGenero() {

    let genero = prompt(
        "¿Qué género querés ver?\n" +
        "1. Terror\n" +
        "2. Comedia\n" +
        "3. Romance\n" +
        "4. Acción"
    );
    switch (genero) {

        case "1":

            if (edad >= 18) {

                alert("Te recomiendo: Obsesión");

            } else {

                alert("No podés ver esta película porque es para mayores de 18 años.");
            }

            break;

        case "2":

            if (tiempo >= 90) {

                alert("Te recomiendo: Son como niños");

            } else {

                alert("No tenés suficiente tiempo para ver esta película.");
            }

            break;

        case "3":

            alert("Te recomiendo: Mensajes de voz para Isabelle");

            break;

        case "4":

            alert("Te recomiendo: Maze Runner");

            break;

        default:

            alert("No elegiste una opción válida.");
    }
}

function recomendarPorEstadoDeAnimo() {

    let animo = prompt(
        "¿Cómo estás de ánimo?\n" +
        "1. Feliz\n" +
        "2. Romántico/a\n" +
        "3. Con energía\n" +
        "4. Con ganas de asustarme"
    );

    let peliculaRecomendada = recomendarPorAnimo(animo);

    alert("Te recomiendo ver: " + peliculaRecomendada);
}

function recomendarPorAnimo(animo) {

    switch (animo) {

        case "1":
            return "Una de Adam Sandler";

        case "2":
            return "Una de Sofía Carson";

        case "3":
            return "Liam Neeson";

        case "4":
            return "Johnny Depp";

        default:
            return "Opción no válida";
    }
}

function crearPelicula() {

    let titulo = prompt("¿Cuál es el título de la película?");
    let genero = prompt("¿Cuál es el género? (terror, comedia, romance, acción)");
    let yaLaVio = prompt("¿Ya la viste? (si/no)").toLowerCase();

    let vista = yaLaVio === "si";
    let reseña = "";

    if (vista) {
        reseña = prompt("¿Qué te pareció " + titulo + "?");
    }

    return new Pelicula(titulo, genero, vista, reseña);
}

function salir() {

    alert("¡Gracias por usar el simulador, " + nombre + "!");

    continuar = false;
}

// inicio
alert("Bienvenido a mi sitio web de pelis");

const nombre = prompt("Hola, ¿cuál es tu nombre?");

console.log(nombre);

let añoNacimiento = parseInt(prompt("Ingrese el año de su nacimiento"));

let edad = 2026 - añoNacimiento;
console.log(edad);
alert("Hola, " + nombre);

let tiempo = parseInt(prompt("¿Cuántos minutos tenés disponibles?"));

let continuar = true;

actorFavorito("Ingresá tu actor favorito");

// instanciación 
const pelicula1 = new Pelicula("obsesión", "terror", false, "");
const pelicula2 = new Pelicula("son como niños", "comedia", true, "Muy divertida");
const pelicula3 = new Pelicula("maze runner", "acción", false, "");

console.log(pelicula1);
console.log(pelicula2);
console.log(pelicula3);

// menu
while (continuar) {

    let opcion = prompt(
        "¿Qué querés hacer?\n" +
        "1. Ver películas\n" +
        "2. Agregar / Quitar una película\n" +
        "3. Recomendación por género\n" +
        "4. Recomendación por estado de ánimo\n" +
        "5. Agregar película con reseña\n" +
        "6. Salir"
    );

    switch (opcion) {

        case "1":
            verPeliculas();
            break;

        case "2":
            modificarPeliculas();
            break;

        case "3":
            recomendarPorGenero();
            break;

        case "4":
            recomendarPorEstadoDeAnimo();
            break;

        case "5":
            let nuevaPeliculaConReseña = crearPelicula();
            console.log(nuevaPeliculaConReseña);
            break;

        case "6":
            salir();
            break;

        default:
            alert("Opción inválida. Elegí del 1 al 6");
    }
}
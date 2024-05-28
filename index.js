import Preguntas from './js/preguntas.js';

// Función para inicializar la aplicación
function inicializarPreguntapi() {

    const gestor = new Preguntas();
    gestor.obtenerInfo();
}

// Llama a la función para inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarPreguntapi);

import Info from './llamadasAPI.js';

class Preguntas {
    constructor() {
        this.categorias = [];
        this.preguntasFiltradas = [];
        this.categoriaSeleccionada = null;
        this.dificultadSeleccionada = null;
        this.preguntaActualIndex = 0;
        this.respuestasCorrectas = 0;
        this.info = new Info();
        this.preguntaContainer = document.getElementById('pregunta-container');
        }
    
    async obtenerInfo() {
        try {
            this.categorias = await this.info.extraerCategoria();
            this.mostrarCategorias();
            this.iniciarJuego();
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    }

    mostrarCategorias() {
        const resultadoContainer = document.getElementById('resultado-container');
        resultadoContainer.style.display = 'none';
        const preguntaContainer = document.getElementById('pregunta-container');
        preguntaContainer.style.display = 'none';
        //Seleccion el elemento de mi html select-categoria
        const selectCategoria = document.getElementById('select-categoria');
        //Se deja en blanco el elemento antes de agregar las categorias, de manera que evitamos posibles duplicados si se vuelve a llamar a la funcion
        selectCategoria.innerHTML = '';
        //Para que sea intuitivo de cara al usuario se agrega un opcion que simplemente indica que seleccione la categoria,
        // le insertamos texto pero no tiene un valor real
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Selecciona un lenguaje';
        defaultOption.value = ''; // Valor vacío
        selectCategoria.add(defaultOption);
        //Por cada categoria obtenida de la api creamos una opcion en el desplegable
        this.categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.text = categoria.nombre;            
            option.value = categoria.link;
            //Aqui es importante diferenciar que se iguala el valor del texto a mostrar al nombre de la categoria, pero el valor del campo es el link
            //que nos redirige a las preguntas de la categoria seleccionada
            selectCategoria.add(option);
        });
    }

    iniciarJuego() {
        const selectCategoria = document.getElementById('select-categoria');
        //Se asocia las variables a los elementos del html
        const selectDificultad = document.getElementById('select-dificultad');
        //De manera que sea intuitivo de cara al usuario en un primer momento se iguala el valor de las dos variables a 0
        //Siendo 0 un mensaje de texto dando a entender que tiene que elegir la categoria y la dificultad
        selectCategoria.selectedIndex = 0;
        selectDificultad.selectedIndex = 0;

        selectCategoria.addEventListener('change', (event) => {
            //Con el metodo .find cuando el usuario elige la dificultad igualamos el valor de this.categoriaseleccionada unicamente al elemento seleccionado
            //que contiene el nombre y el link de la categoria unicamente
            this.categoriaSeleccionada = this.categorias.find(categoria => categoria.link === event.target.value);
            console.log(this.categoriaSeleccionada)
        });
        //Los valores de la dificultad estan definidas en el html, aqui solo se iguala el valor de this.dificultadSeleccionada a la opcion elegida por el usuario
        selectDificultad.addEventListener('change', (event) => {
            this.dificultadSeleccionada = event.target.value;
        });
        //Al hacer click en el boton de empezar llamamos a otra funcion
        const btnEmpezar = document.getElementById('btn-empezar');
        btnEmpezar.addEventListener('click', async () => {
            await this.iniciarJuegoSiListo();
        });
    }

    async iniciarJuegoSiListo() {
        //Esta primera parte solo sirve para cuando no es la primera vez que se usa el boton empezar,
        // se oculta el resultado anterior y se reinician los contadores de preguntaActualIndex y respuestasCorrectas
        const resultadoContainer = document.getElementById('resultado-container');
        resultadoContainer.style.display = 'none';        
        this.preguntaActualIndex = 0;
        this.respuestasCorrectas = 0;
        //Si hay categoria y dificultad seleccionadas, llamamos a filtrar preguntas, si no lanzamos una alerta al usuario  
        if (this.categoriaSeleccionada && this.dificultadSeleccionada) {
            this.preguntaContainer.style.display = 'block';
            await this.filtrarPreguntas();
        } else {
            alert('Por favor, selecciona una categoría y una dificultad antes de empezar.');
        }
    }

    async filtrarPreguntas() {
        //Llamamos a la funcion obtenerPreguntasPorCategoria en base al link asociado a cada categoria y hacemos una llamada a la api para que
        //devuelva las preguntas con sus respuestas
        try {
            const preguntas = await this.info.obtenerPreguntasPorCategoria(this.categoriaSeleccionada.link);
            //Unicamente nos quedamos con las preguntas que en base a la dificultad seleccionada nos interesen
            this.preguntasFiltradas = preguntas.filter(pregunta => pregunta.nivel === this.dificultadSeleccionada && pregunta.aceptada === "Acepted");
            //Una vez tenemos las preguntas filtradas por categoria y dificultad, llamamos a la funcion mostrarPregunta
            console.log(this.preguntasFiltradas)
            this.mostrarPregunta();
        } catch (error) {
            console.error('Error al filtrar las preguntas:', error);
            throw error;
        }
    }

    mostrarPregunta() {
        // Cada vez que se muestra una pregunta se verifica si es la ultima
        if (this.preguntaActualIndex < this.preguntasFiltradas.length) {
            // Mostrar la pregunta que corresponde con el indice de la pregunta actual
            const preguntaActual = this.preguntasFiltradas[this.preguntaActualIndex];
            //Se obtiene el elemento del html pregunta-container y se vacia, de manera que si hay una pregunta anterior se limpie el contenedor
            const preguntaContainer = document.getElementById('pregunta-container');
            preguntaContainer.innerHTML = '';
            //Se crea un elemento div y le igualamos el valor a la pregunta actual, arriba hay un console log de this.preguntasFiltradas
            //inicia el juego para ver el formato en el que se reciben las preguntas
            const preguntaElement = document.createElement('div');
            preguntaElement.textContent = preguntaActual.pregunta;
            preguntaContainer.appendChild(preguntaElement);
            //Se crea un elemento div donde se almacenaran todas las opciones disponibles a cada pregunta
            const opcionesContainer = document.createElement('div');
            opcionesContainer.id = 'opciones-container';
            //Utilizando Object.values, nos devuelve un nuevo array con las respuestas disponibles para cada pregunta
            const respuestas = Object.values(preguntaActual.respuestas);
            //Con el metodo forEach se crea un elemento div por cada respuesta disponible, se le añade un listener
            //de manera que cuando haces click en una respuesta se llama a la funcion verificarRespuesta.
            respuestas.forEach((respuesta, index) => {
                const opcionElement = document.createElement('div');
                //A cada opcion le igualamos su valor de texto a la respuesta
                opcionElement.textContent = respuesta;
                opcionElement.addEventListener('click', () => this.verificarRespuesta(index));
                //Metemos todas las opciones que tenga la pregunta en el elemento opcionesContainer
                opcionesContainer.appendChild(opcionElement);
            });
            //Metemos las opciones dentro del contenedor de pregunta
            preguntaContainer.appendChild(opcionesContainer);
        } else { // Si no hay mas preguntas llamamos a la funcion mostrarResultado
            console.log("No hay más preguntas disponibles. Mostrando el resultado final.");
            this.mostrarResultado();
        }
    }

    async verificarRespuesta(indexRespuestaSeleccionada) {
        const preguntaActual = this.preguntasFiltradas[this.preguntaActualIndex];
        const respuestas = preguntaActual.respuestas;
                //La forma en la que se estructuran las respuestas con claves por lo que se tiene que utilizar Object.keys
        //Esto es asi por que respuestacorrecta:answer_x es un campo respuestas siendo answer_x una clave
        const respuestaSeleccionada = Object.keys(respuestas)[indexRespuestaSeleccionada];
        const respuestaCorrecta = preguntaActual.respuestaCorrecta;
        
        // Sumar las respuestas correctas al contador
        if (respuestaSeleccionada === respuestaCorrecta) {
            this.respuestasCorrectas++;
        }
        
        const opciones = document.querySelectorAll('#opciones-container div');
        opciones.forEach((opcion, index) => {
            opcion.classList.remove('success', 'error');
            
            if (index === indexRespuestaSeleccionada) {
                if (respuestaSeleccionada === respuestaCorrecta) {
                    opcion.classList.add('success');
                    console.log("Respuesta correcta. Respuestas correctas hasta ahora:", this.respuestasCorrectas);
                } else {
                    opcion.classList.add('error');
                    console.log("Respuesta incorrecta. Respuestas correctas hasta ahora:", this.respuestasCorrectas);
                }
            }
        });
        await new Promise(resolve => setTimeout(resolve, 500));
        this.preguntaActualIndex++;
        this.mostrarPregunta();
    }
    
   
    mostrarResultado() {// Aqui se muestra en pantalla la cantidad de respuestas correctas y la cantidad de preguntas contestadas
        const resultadoContainer = document.getElementById('resultado-container');
        resultadoContainer.style.display = 'block';
        const preguntaContainer = document.getElementById('pregunta-container');
        preguntaContainer.style.display = 'none';
        resultadoContainer.innerHTML = `Respuestas correctas: ${this.respuestasCorrectas} / ${this.preguntasFiltradas.length}`;
    }


}

export default Preguntas;

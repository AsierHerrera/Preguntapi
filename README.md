# PREGUNTAPI
Este proyecto consiste en una página web dedicada a proporcionar una experiencia interactiva de preguntas y respuestas. La página utiliza una API pública para obtener datos sobre diferentes preguntas en una variedad de temas.

## Características principales

1. **Preguntas**: Esta sección muestra una serie de preguntas en diferentes categorías, como historia, ciencia, deportes, entre otros.

2. **Respuestas**: Aquí se pueden seleccionar las opciones de respuesta para cada pregunta y recibir retroalimentación sobre la corrección de la respuesta.

3. **Resultados**: En esta sección se muestra el puntaje total obtenido después de responder todas las preguntas, junto con la cantidad de respuestas correctas e incorrectas.

## Tecnologías utilizadas

- **HTML/CSS**: Para la estructura y diseño de la página web.

- **JavaScript**: Para interactuar con la API y mostrar los datos dinámicamente.

- **PREGUNTAPI**: Se utiliza una API pública para obtener preguntas y respuestas actualizadas en diferentes categorías.
  
-  **Node.js y Express:** Para crear y gestionar la API que proporciona las preguntas y respuestas.
    
- **MongoDB y Mongoose:** Para gestionar la base de datos de usuarios y preguntas.
  
- **JSON Web Token (JWT):** Para la autenticación de usuarios.

## Instrucciones de uso

1. Clona este repositorio en tu máquina local.

2. Abre el archivo `index.html` en tu navegador web.

3. Explora las diferentes categorías de preguntas y selecciona las respuestas correspondientes.

4. Después de responder todas las preguntas, se mostrará tu puntaje total y la cantidad de respuestas correctas e incorrectas.

¡Disfruta desafiando tus conocimientos con nuestra página web de preguntas y respuestas!

## API Endpoints

La API ofrece varios endpoints para manejar las preguntas y la autenticación de usuarios.

### Categorías de Preguntas

Endpoint: `GET /api/categories`

### Preguntas por categoria

Endpoint: `GET /api/questions/categories/css`

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar esta página web o agregar nuevas características, no dudes en enviar un pull request.

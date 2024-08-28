class Info {
  constructor() {
    this.url = "http://localhost:3015/api/categories";
    this.userId = localStorage.getItem('userId');
  }


  async obtenerInfoAPI(url) {

    try {
      if (this.userId == undefined) {
        alert("Por favor, inicia sesión para jugar");
        window.location.href = 'login.html';
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API: Respuesta no válida');
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error('Error al obtener los datos de la API: Respuesta sin datos válidos');
      }

      return data;
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error.message);
      throw error;
    }      
  }

  async extraerCategoria() {
      try {
        const data = await this.obtenerInfoAPI(this.url);
        //Aqui se obtiene el nombre de cada categoria y el endpoint para luego capturar las preguntas
        const categoriasConSubcategorias = await Promise.all(data.categories.map(async categoria => {
          return {
            nombre: categoria.name,
            link: categoria.link            
          };
        }));

        return categoriasConSubcategorias;
      } catch (error) {
        console.error('Error al extraer las categorías:', error.message);
        throw error;
      }
    }
    async obtenerPreguntasPorCategoria(link) {
      try {
          const url = `${link}`;
          const data = await this.obtenerInfoAPI(url);
          
          const preguntasDetalladas = data.map(pregunta => ({
            categoria: pregunta.category,
            nivel: pregunta.level,
            pregunta: pregunta.question,
            respuestas: pregunta.answers,
            respuestaCorrecta: pregunta.correct_answer,
            aceptada: pregunta.status
        }));

          return preguntasDetalladas;
      } catch (error) {
          console.error('Error al obtener las preguntas de la categoría:', error.message);
          throw error;
      }
  }

  async obtenerMejoresPuntuaciones(category, difficulty) {
    try {
      const response = await fetch(`http://localhost:3015/api/score/category/${category}`);

      if (!response.ok) {
        throw new Error('Error al obtener las mejores puntuaciones');
      }
      const data = await response.json();
      const mejoresPuntuaciones = data.data.filter(puntuacion => puntuacion.difficulty === difficulty);
      mejoresPuntuaciones.sort((a, b) => b.score - a.score);
      return mejoresPuntuaciones.slice(0, 3);
    } catch (error) {
      console.error('Error al obtener las mejores puntuaciones:', error.message);
      throw error;
    }
  }
}



export default Info;

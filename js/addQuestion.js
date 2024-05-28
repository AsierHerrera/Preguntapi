document.getElementById('addQuestionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const category = document.getElementById('category').value;
    const question = document.getElementById('question').value;
    const answer_a = document.getElementById('answer_a').value;
    const answer_b = document.getElementById('answer_b').value;
    const answer_c = document.getElementById('answer_c').value || null;
    const answer_d = document.getElementById('answer_d').value || null;
    const correct_answer = document.getElementById('correct_answer').value;

    // Obtener el owner del localStorage
    const owner = localStorage.getItem('userId');

    const data = {
        category,
        question,
        answers: { answer_a, answer_b, answer_c, answer_d },
        correct_answer,
        owner // Agregar el owner al objeto data
    };


    try {
        const response = await fetch('http://localhost:3015/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al crear la pregunta');
        }
        
        const result = await response.json();
        alert(`Pregunta añadida correctamente. ID de la pregunta: ${result.data._id}`);
        document.getElementById('addQuestionForm').reset(); // Resetea el formulario después de añadir la pregunta
        
    } catch (error) {
        console.error('Error al agregar la pregunta:', error.message);
        alert('Error al agregar la pregunta');
    }
});

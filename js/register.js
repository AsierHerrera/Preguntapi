document.getElementById('register-form').addEventListener('submit', async function(event){
    event.preventDefault(); // Evitar el comportamiento de envío predeterminado del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('passwordRepeat').value;

    const registerData = {
        username,
        password,
        passwordRepeat // Assuming the user confirms the password
    };

    try {
        const response = await fetch('http://localhost:3015/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const data = await response.json();
        console.log("la data es:", data)
        if (response.ok) {
            alert('Registro realizado, inicia sesion para jugar');
            window.location.href = 'index.html';
        } else {
            alert('El registro ha fallado: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

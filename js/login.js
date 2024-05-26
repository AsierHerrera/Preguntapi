// login.js
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        username,
        password
    };
    console.log("LOGIN DATA ES:", loginData)

    try {
        const response = await fetch('http://localhost:3015/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();
        console.log("La data es:",data)

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user);
            localStorage.setItem('username', data.username);

            window.location.href = 'index.html';
        } else {
            alert('Login failed: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Lógica para el logout
// login.js




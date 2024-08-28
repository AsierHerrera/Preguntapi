import { API_URL } from "../config.js";
// login.js
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        username,
        password
    };


    try {
        const response = await fetch(API_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();


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




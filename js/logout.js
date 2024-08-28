// Función para el logout
const logout = async () => {
    try {

        const response = await fetch('http://localhost:3015/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });


        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        } else {
            // Maneja el caso en que el logout falle
            const data = await response.json();
            alert('Logout failed: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Establecer el evento para el botón de logout
document.addEventListener('DOMContentLoaded', function() {

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    } else {
        console.error('No se encontró el botón de logout');
    }
});

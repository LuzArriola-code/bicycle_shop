// ==========================================
// 1. CONSTANTES GLOBALES
// ==========================================
const formLogin = document.getElementById('formLogin');
const loginUser = document.getElementById('loginUser');
const loginPassword = document.getElementById('loginPassword');
const mensajeError = document.getElementById('mensajeError');

const btnAlternarPassword = document.getElementById('btnAlternarPassword');

//-------------------------------------------------------------------------------

// ==========================================
// 3. EVENTO PRINCIPAL DEL DOCUMENTO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {

    // Hacemos foco automático en el campo de usuario al entrar
    loginUser.focus();

    // Escuchamos el envío del formulario
    formLogin.addEventListener('submit', procesarLogin);


// Escuchador exclusivo para el ojito
btnAlternarPassword.addEventListener('click', function () {

    if (loginPassword.type === 'password') {

        // Mostrar contraseña
        loginPassword.type = 'text';

        // Cambiar icono
        btnAlternarPassword.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        // Ocultar contraseña
        loginPassword.type = 'password';

        // Volver al icono original
        btnAlternarPassword.innerHTML =
            '<i class="fa-regular fa-eye"></i>';
    }
});
  

});


//---------------------------------------------------------------------------------

// ==========================================
// 2. FUNCIONES GLOBALES DE ACCIÓN
// ==========================================

async function procesarLogin(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Limpiamos errores previos y lo ocultamos
    mensajeError.classList.add('oculto');
    mensajeError.innerHTML = "";

    const loginData = {
        user_Name: loginUser.value,
        password: loginPassword.value
    };

    try {
        const respuesta = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            // Guardamos los datos en el navegador para saber quién inició sesión (ID, Nombre y Rol)
            localStorage.setItem('usuarioLogueado', JSON.stringify(resultado.usuario));

            // REDIRECCIÓN COMPLETA A INDEX
            window.location.href = 'inicio.html';
        } else {
            // ACCIÓN: Si las credenciales fallan, mostramos el cuadro rojo con el error del backend
            mensajeError.textContent = `❌ ${resultado.error}`;
            mensajeError.className = 'alerta-error'; // Le aplicamos el CSS de acción
            loginPassword.value = ""; // Limpiamos solo la clave para que intente de nuevo
            loginPassword.focus();
        }

    } catch (error) {
        console.error('Error en la conexión del login:', error);
        mensajeError.textContent = '⚠️ No se pudo conectar con el servidor.';
        mensajeError.className = 'alerta-error';
    }
}

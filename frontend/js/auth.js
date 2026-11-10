function actualizarNavUsuario() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const nav = document.querySelector('.navbar nav');

    if (usuarioGuardado && nav) {
        const usuario = JSON.parse(usuarioGuardado);
        const btnLogin = document.querySelector('.btn-login-nav');
        if (btnLogin) {
            btnLogin.remove();
        }

        const userWidget = document.createElement('div');
        userWidget.className = 'user-logged-info';

        const enlacePerfil = document.createElement('a');
        enlacePerfil.className = 'user-badge';
        enlacePerfil.href = 'perfil.html';
        enlacePerfil.textContent = `🛡️ ${usuario.username}`;

        const btnLogout = document.createElement('button');
        btnLogout.id = 'btn-logout';
        btnLogout.className = 'btn-logout';
        btnLogout.textContent = 'Salir';

        userWidget.appendChild(enlacePerfil);
        userWidget.appendChild(btnLogout);
        nav.appendChild(userWidget);

        document.getElementById('btn-logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            window.location.href = 'index.html'; // Redirige a la página principal tras cerrar sesión
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarNavUsuario();

    const loginForm = document.getElementById('login-form');
    const registroForm = document.getElementById('registro-form');
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al iniciar sesión');
                }

                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));

                window.location.href = 'index.html';
            } catch (err) {
                if (errorMsg) {
                    errorMsg.textContent = err.message;
                    errorMsg.classList.remove('hidden');
                }
            }
        });
    }

    if (registroForm) {
        registroForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/registro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al registrar usuario');
                }

                if (errorMsg) errorMsg.classList.add('hidden');

                if (successMsg) {
                    successMsg.textContent = '¡Cuenta creada con éxito! Redirigiendo al login...';
                    successMsg.classList.remove('hidden');
                }

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1800);

            } catch (err) {
                if (successMsg) successMsg.classList.add('hidden');
                if (errorMsg) {
                    errorMsg.textContent = err.message;
                    errorMsg.classList.remove('hidden');
                }
            }
        });
    }
});
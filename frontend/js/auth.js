
function actualizarNavUsuario() {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    const nav = document.querySelector('.navbar nav');

    if (!nav) return;

    nav.querySelector('.btn-login-nav')?.remove();
    nav.querySelector('.user-logged-info')?.remove();

    const adminLink = document.getElementById('admin-link');

    if (!token || !usuarioGuardado) {
        if (adminLink) {
            adminLink.style.display = 'none';
        }

        const login = document.createElement('a');
        login.href = 'login.html';
        login.className = 'btn-login-nav';
        login.textContent = 'Iniciar sesión';
        nav.appendChild(login);
        return;
    }

    let usuario;

    try {
        usuario = JSON.parse(usuarioGuardado);
    } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        if (adminLink) {
            adminLink.style.display = 'none';
        }

        const login = document.createElement('a');
        login.href = 'login.html';
        login.className = 'btn-login-nav';
        login.textContent = 'Iniciar sesión';
        nav.appendChild(login);
        return;
    }

    const esAdmin = String(usuario.rol).toUpperCase() === 'ADMIN';

    if (adminLink) {
        adminLink.style.display = esAdmin ? 'inline-flex' : 'none';
    }

    const userWidget = document.createElement('div');
    userWidget.className = 'user-logged-info';

    const enlacePerfil = document.createElement('a');
    enlacePerfil.className = 'user-badge';
    enlacePerfil.href = 'perfil.html';
    enlacePerfil.textContent = `🛡️ ${usuario.username || 'Usuario'}`;

    const btnLogout = document.createElement('button');
    btnLogout.id = 'btn-logout';
    btnLogout.className = 'btn-logout';
    btnLogout.textContent = 'Salir';

    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    });

    userWidget.appendChild(enlacePerfil);
    userWidget.appendChild(btnLogout);
    nav.appendChild(userWidget);
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
                    headers: {
                        'Content-Type': 'application/json'
                    },
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
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al registrar usuario');
                }

                if (errorMsg) {
                    errorMsg.classList.add('hidden');
                }

                if (successMsg) {
                    successMsg.textContent = '¡Cuenta creada con éxito! Redirigiendo al login...';
                    successMsg.classList.remove('hidden');
                }

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1800);
            } catch (err) {
                if (successMsg) {
                    successMsg.classList.add('hidden');
                }

                if (errorMsg) {
                    errorMsg.textContent = err.message;
                    errorMsg.classList.remove('hidden');
                }
            }
        });
    }
});

window.addEventListener('storage', (event) => {
    if (event.key === 'token' || event.key === 'usuario') {
        actualizarNavUsuario();
    }
});

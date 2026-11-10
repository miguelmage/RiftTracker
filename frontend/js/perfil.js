document.addEventListener('DOMContentLoaded', () => {

    const token = localStorage.getItem('token');

    const form = document.getElementById('perfil-form');
    const errorMsg = document.getElementById('perfil-error');
    const successMsg = document.getElementById('perfil-success');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    function mostrarError(mensaje) {
        errorMsg.textContent = mensaje;
        errorMsg.classList.remove('hidden');
        successMsg.classList.add('hidden');
    }

    function mostrarExito(mensaje) {
        successMsg.textContent = mensaje;
        successMsg.classList.remove('hidden');
        errorMsg.classList.add('hidden');
    }

    async function cargarPerfil() {
        try {
            const response = await fetch('/api/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                window.location.href = 'login.html';
                return;
            }

            if (!response.ok) {
                throw new Error(data.error || 'No se pudo cargar el perfil');
            }

            const usuario = data.usuario;

            document.getElementById('perfil-username').textContent =
                usuario.username;

            document.getElementById('perfil-rol').textContent =
                usuario.rol.toUpperCase();

            document.getElementById('username').value =
                usuario.username;

            document.getElementById('email').value =
                usuario.email;

            document.getElementById('rol').value =
                usuario.rol.toUpperCase();

            const fecha = usuario.created_at
                ? new Date(usuario.created_at).toLocaleDateString('es-ES')
                : 'No disponible';

            document.getElementById('created-at').value = fecha;

        } catch (error) {
            console.error(error);
            mostrarError(error.message);
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!username || !email) {
            mostrarError('Todos los campos son obligatorios');
            return;
        }

        const boton = form.querySelector('.btn-guardar');
        boton.disabled = true;
        boton.textContent = 'GUARDANDO...';

        try {
            const response = await fetch('/api/perfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, email })
            });

            const data = await response.json();

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                window.location.href = 'login.html';
                return;
            }

            if (!response.ok) {
                throw new Error(data.error || 'Error al actualizar el perfil');
            }

            localStorage.setItem(
                'usuario',
                JSON.stringify(data.usuario)
            );

            document.getElementById('perfil-username').textContent =
                data.usuario.username;

            const enlacePerfil = document.querySelector('.user-badge');

            if (enlacePerfil) {
                enlacePerfil.textContent = `🛡️ ${data.usuario.username}`;
            }

            mostrarExito('¡Tu perfil se ha actualizado correctamente!');

        } catch (error) {
            console.error(error);
            mostrarError(error.message);
        } finally {
            boton.disabled = false;
            boton.textContent = 'GUARDAR CAMBIOS';
        }
    });

    cargarPerfil();

});

document.addEventListener('DOMContentLoaded', iniciarAdmin);

const API_URL = '/api/admin';

const secciones = {
    ligas: {
        titulo: 'Gestión de ligas',
        descripcion: 'Administra las competiciones disponibles.',
        singular: 'liga',
        endpoint: 'ligas',
        columnas: [
            { campo: 'id', titulo: 'ID' },
            { campo: 'logo_url', titulo: 'Logo', tipo: 'imagen' },
            { campo: 'nombre', titulo: 'Nombre' },
            { campo: 'region', titulo: 'Región' }
        ],
        campos: [
            { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
            { nombre: 'region', etiqueta: 'Región', requerido: true },
            { nombre: 'logo_url', etiqueta: 'URL del logo', tipo: 'url' }
        ]
    },
    equipos: {
        titulo: 'Gestión de equipos',
        descripcion: 'Administra los equipos y sus respectivas ligas.',
        singular: 'equipo',
        endpoint: 'equipos',
        columnas: [
            { campo: 'id', titulo: 'ID' },
            { campo: 'logo_url', titulo: 'Logo', tipo: 'imagen' },
            { campo: 'nombre', titulo: 'Nombre' },
            { campo: 'acronimo', titulo: 'Acrónimo' },
            { campo: 'liga_nombre', titulo: 'Liga' }
        ],
        campos: [
            { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
            { nombre: 'acronimo', etiqueta: 'Acrónimo', requerido: true },
            { nombre: 'logo_url', etiqueta: 'URL del logo', tipo: 'url' },
            { nombre: 'historia', etiqueta: 'Historia', tipo: 'textarea' },
            { nombre: 'id_liga', etiqueta: 'Liga', tipo: 'select', requerido: true }
        ]
    },
    jugadores: {
        titulo: 'Gestión de jugadores',
        descripcion: 'Administra los jugadores y sus equipos.',
        singular: 'jugador',
        endpoint: 'jugadores',
        columnas: [
            { campo: 'id', titulo: 'ID' },
            { campo: 'foto_url', titulo: 'Foto', tipo: 'imagen' },
            { campo: 'nickname', titulo: 'Nickname' },
            { campo: 'nombre_real', titulo: 'Nombre real' },
            { campo: 'rol', titulo: 'Posición' },
            { campo: 'equipo_nombre', titulo: 'Equipo' }
        ],
        campos: [
            { nombre: 'nickname', etiqueta: 'Nickname', requerido: true },
            { nombre: 'nombre_real', etiqueta: 'Nombre real' },
            {
                nombre: 'rol',
                etiqueta: 'Posición',
                tipo: 'select-fijo',
                opciones: ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'],
                requerido: true
            },
            { nombre: 'foto_url', etiqueta: 'URL de la fotografía', tipo: 'url' },
            { nombre: 'game_name', etiqueta: 'Riot ID' },
            { nombre: 'tag_line', etiqueta: 'Tag Line' },
            { nombre: 'id_equipo', etiqueta: 'Equipo', tipo: 'select', requerido: true }
        ]
    }
};

let seccionActual = 'ligas';
let registrosActuales = [];
let registroEditando = null;
let ligasDisponibles = [];
let equiposDisponibles = [];

const elementos = {
    tabs: document.querySelectorAll('.admin-tab'),
    titulo: document.getElementById('section-title'),
    descripcion: document.getElementById('section-description'),
    btnCreate: document.getElementById('btn-create'),
    alerta: document.getElementById('admin-alert'),
    formContainer: document.getElementById('form-container'),
    form: document.getElementById('admin-form'),
    formTitle: document.getElementById('form-title'),
    formFields: document.getElementById('form-fields'),
    btnClose: document.getElementById('btn-close-form'),
    btnCancel: document.getElementById('btn-cancel'),
    btnSave: document.getElementById('btn-save'),
    tableHead: document.getElementById('table-head'),
    tableBody: document.getElementById('table-body'),
    loading: document.getElementById('table-loading'),
    empty: document.getElementById('table-empty')
};

async function iniciarAdmin() {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!token || !usuarioGuardado) {
        window.location.href = 'login.html';
        return;
    }

    let usuario;

    try {
        usuario = JSON.parse(usuarioGuardado);
    } catch {
        cerrarSesion();
        return;
    }

    if (String(usuario.rol).toUpperCase() !== 'ADMIN') {
        window.location.href = 'index.html';
        return;
    }

    elementos.btnCreate.addEventListener('click', abrirFormularioNuevo);
    elementos.btnClose.addEventListener('click', cerrarFormulario);
    elementos.btnCancel.addEventListener('click', cerrarFormulario);
    elementos.form.addEventListener('submit', guardarRegistro);

    elementos.tabs.forEach(tab => {
        tab.addEventListener('click', () => cambiarSeccion(tab.dataset.section));
    });

    elementos.tableBody.addEventListener('click', gestionarAccionesTabla);

    await cargarDatosAuxiliares();
    await cambiarSeccion('ligas');
}

function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

async function peticionAPI(url, opciones = {}) {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(url, {
        ...opciones,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...opciones.headers
        }
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (respuesta.status === 401 || respuesta.status === 403) {
        if (respuesta.status === 401) {
            cerrarSesion();
        }

        throw new Error(datos.error || 'No tienes permisos para realizar esta operación.');
    }

    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se ha podido completar la operación.');
    }

    return datos;
}

async function cargarDatosAuxiliares() {
    try {
        const [ligas, equipos] = await Promise.all([
            peticionAPI(`${API_URL}/ligas`),
            peticionAPI(`${API_URL}/equipos`)
        ]);

        ligasDisponibles = ligas;
        equiposDisponibles = equipos;
    } catch (error) {
        mostrarAlerta(error.message, 'error');
    }
}

async function cambiarSeccion(nombre) {
    if (!secciones[nombre]) return;

    seccionActual = nombre;
    registroEditando = null;

    elementos.tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.section === nombre);
    });

    const configuracion = secciones[nombre];

    elementos.titulo.textContent = configuracion.titulo;
    elementos.descripcion.textContent = configuracion.descripcion;
    elementos.btnCreate.textContent = `+ Añadir ${configuracion.singular}`;

    cerrarFormulario();
    ocultarAlerta();

    await cargarRegistros();
}

async function cargarRegistros() {
    elementos.loading.hidden = false;
    elementos.empty.hidden = true;
    elementos.tableHead.innerHTML = '';
    elementos.tableBody.innerHTML = '';
    elementos.tableHead.closest('table').hidden = true;

    try {
        const configuracion = secciones[seccionActual];

        registrosActuales = await peticionAPI(
            `${API_URL}/${configuracion.endpoint}`
        );

        if (seccionActual === 'ligas') {
            ligasDisponibles = registrosActuales;
        }

        if (seccionActual === 'equipos') {
            equiposDisponibles = registrosActuales;
        }

        renderizarTabla();
    } catch (error) {
        mostrarAlerta(error.message, 'error');
    } finally {
        elementos.loading.hidden = true;
    }
}

function renderizarTabla() {
    const configuracion = secciones[seccionActual];

    elementos.tableHead.innerHTML = `
        <tr>
            ${configuracion.columnas.map(columna =>
        `<th>${escaparHTML(columna.titulo)}</th>`
    ).join('')}
            <th>Acciones</th>
        </tr>
    `;

    if (registrosActuales.length === 0) {
        elementos.tableBody.innerHTML = '';
        elementos.tableHead.closest('table').hidden = true;
        elementos.empty.hidden = false;
        return;
    }

    elementos.tableHead.closest('table').hidden = false;
    elementos.empty.hidden = true;

    elementos.tableBody.innerHTML = registrosActuales.map(registro => {
        const celdas = configuracion.columnas.map(columna => {
            const valor = registro[columna.campo];

            if (columna.tipo === 'imagen') {
                if (!valor) return '<td>Sin imagen</td>';

                return `
                    <td>
                        <img class="table-image"
                             src="${escaparHTML(valor)}"
                             alt=""
                             onerror="this.style.display='none'">
                    </td>
                `;
            }

            return `<td>${escaparHTML(valor ?? '—')}</td>`;
        }).join('');

        return `
            <tr>
                ${celdas}
                <td>
                    <div class="table-actions">
                        <button class="btn-edit" data-action="edit" data-id="${registro.id}">
                            Editar
                        </button>
                        <button class="btn-delete" data-action="delete" data-id="${registro.id}">
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, caracter => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[caracter]);
}

function abrirFormularioNuevo() {
    registroEditando = null;
    construirFormulario({});
    elementos.formTitle.textContent = `Añadir ${secciones[seccionActual].singular}`;
    elementos.btnSave.textContent = 'Crear';
    elementos.formContainer.hidden = false;
    elementos.formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function abrirFormularioEdicion(registro) {
    registroEditando = registro;
    construirFormulario(registro);
    elementos.formTitle.textContent = `Editar ${secciones[seccionActual].singular}`;
    elementos.btnSave.textContent = 'Guardar cambios';
    elementos.formContainer.hidden = false;
    elementos.formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function construirFormulario(registro) {
    const configuracion = secciones[seccionActual];

    elementos.formFields.innerHTML = configuracion.campos.map(campo => {
        const valor = registro[campo.nombre] ?? '';
        const requerido = campo.requerido ? 'required' : '';
        const ancho = campo.tipo === 'textarea' ? 'full-width' : '';

        if (campo.tipo === 'textarea') {
            return `
                <div class="form-field ${ancho}">
                    <label for="campo-${campo.nombre}">${escaparHTML(campo.etiqueta)}</label>
                    <textarea id="campo-${campo.nombre}"
                              name="${campo.nombre}"
                              ${requerido}>${escaparHTML(valor)}</textarea>
                </div>
            `;
        }

        if (campo.tipo === 'select' || campo.tipo === 'select-fijo') {
            const opciones = obtenerOpciones(campo);

            return `
                <div class="form-field">
                    <label for="campo-${campo.nombre}">${escaparHTML(campo.etiqueta)}</label>
                    <select id="campo-${campo.nombre}"
                            name="${campo.nombre}"
                            ${requerido}>
                        <option value="">Selecciona una opción</option>
                        ${opciones.map(opcion => `
                            <option value="${opcion.valor}"
                                ${String(opcion.valor) === String(valor) ? 'selected' : ''}>
                                ${escaparHTML(opcion.texto)}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;
        }

        const tipo = campo.tipo || 'text';

        return `
            <div class="form-field">
                <label for="campo-${campo.nombre}">${escaparHTML(campo.etiqueta)}</label>
                <input id="campo-${campo.nombre}"
                       name="${campo.nombre}"
                       type="${tipo}"
                       value="${escaparHTML(valor)}"
                       ${requerido}>
            </div>
        `;
    }).join('');
}

function obtenerOpciones(campo) {
    if (campo.tipo === 'select-fijo') {
        return campo.opciones.map(opcion => ({
            valor: opcion,
            texto: opcion
        }));
    }

    if (campo.nombre === 'id_liga') {
        return ligasDisponibles.map(liga => ({
            valor: liga.id,
            texto: liga.nombre
        }));
    }

    if (campo.nombre === 'id_equipo') {
        return equiposDisponibles.map(equipo => ({
            valor: equipo.id,
            texto: `${equipo.nombre} (${equipo.acronimo || ''})`
        }));
    }

    return [];
}

async function guardarRegistro(evento) {
    evento.preventDefault();

    const configuracion = secciones[seccionActual];
    const datos = Object.fromEntries(new FormData(elementos.form).entries());

    if (seccionActual === 'equipos') {
        datos.id_liga = Number(datos.id_liga);
    }

    if (seccionActual === 'jugadores') {
        datos.id_equipo = Number(datos.id_equipo);
    }

    const editando = registroEditando !== null;
    const url = editando
        ? `${API_URL}/${configuracion.endpoint}/${registroEditando.id}`
        : `${API_URL}/${configuracion.endpoint}`;

    try {
        elementos.btnSave.disabled = true;
        elementos.btnSave.textContent = 'Guardando...';

        await peticionAPI(url, {
            method: editando ? 'PUT' : 'POST',
            body: JSON.stringify(datos)
        });

        cerrarFormulario();
        mostrarAlerta(
            editando ? 'Registro actualizado correctamente.' : 'Registro creado correctamente.',
            'success'
        );

        await cargarDatosAuxiliares();
        await cargarRegistros();
    } catch (error) {
        mostrarAlerta(error.message, 'error');
    } finally {
        elementos.btnSave.disabled = false;
        elementos.btnSave.textContent = editando ? 'Guardar cambios' : 'Crear';
    }
}

async function gestionarAccionesTabla(evento) {
    const boton = evento.target.closest('button[data-action]');

    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.action;
    const registro = registrosActuales.find(item => Number(item.id) === id);

    if (!registro) return;

    if (accion === 'edit') {
        abrirFormularioEdicion(registro);
        return;
    }

    if (accion === 'delete') {
        const configuracion = secciones[seccionActual];
        const nombre = registro.nombre || registro.nickname || `ID ${id}`;

        const confirmado = confirm(
            `¿Seguro que quieres eliminar "${nombre}"? Esta acción no se puede deshacer.`
        );

        if (!confirmado) return;

        try {
            await peticionAPI(`${API_URL}/${configuracion.endpoint}/${id}`, {
                method: 'DELETE'
            });

            mostrarAlerta('Registro eliminado correctamente.', 'success');
            await cargarDatosAuxiliares();
            await cargarRegistros();
        } catch (error) {
            mostrarAlerta(error.message, 'error');
        }
    }
}

function cerrarFormulario() {
    elementos.form.reset();
    elementos.formFields.innerHTML = '';
    elementos.formContainer.hidden = true;
    registroEditando = null;
    elementos.btnSave.disabled = false;
}

function mostrarAlerta(mensaje, tipo) {
    elementos.alerta.textContent = mensaje;
    elementos.alerta.className = `admin-alert ${tipo}`;
    elementos.alerta.hidden = false;
}

function ocultarAlerta() {
    elementos.alerta.hidden = true;
    elementos.alerta.textContent = '';
}

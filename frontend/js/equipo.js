document.addEventListener('DOMContentLoaded', cargarFichaEquipo);

async function cargarFichaEquipo() {
    const params = new URLSearchParams(window.location.search);
    const equipoId = params.get('id');

    const estado = document.getElementById('estado-carga');
    const nombre = document.getElementById('equipo-nombre');
    const liga = document.getElementById('equipo-liga');
    const acronimo = document.getElementById('equipo-acronimo');
    const escudo = document.getElementById('equipo-escudo');
    const escudoFallback = document.getElementById('equipo-escudo-fallback');
    const palmares = document.getElementById('equipo-palmares');
    const roster = document.getElementById('equipo-roster');

    if (!equipoId) {
        mostrarError(
            'No se ha indicado ningún equipo en la dirección.',
            estado,
            nombre,
            liga,
            palmares,
            roster
        );
        return;
    }

    try {
        estado.textContent = 'Buscando equipo...';

        const respuestaLigas = await fetch('/api/ligas');

        if (!respuestaLigas.ok) {
            throw new Error('No se pudieron consultar las ligas.');
        }

        const ligas = await respuestaLigas.json();

        let equipoEncontrado = null;
        let nombreLiga = '';

        for (const itemLiga of ligas) {
            const ligaId = itemLiga.id ?? itemLiga.id_liga;

            const respuestaEquipos = await fetch(
                `/api/ligas/${encodeURIComponent(ligaId)}/equipos`
            );

            if (!respuestaEquipos.ok) {
                continue;
            }

            const equipos = await respuestaEquipos.json();

            equipoEncontrado = equipos.find(equipo =>
                String(equipo.id ?? equipo.id_equipo) === String(equipoId)
            );

            if (equipoEncontrado) {
                nombreLiga = itemLiga.nombre;
                break;
            }
        }

        if (!equipoEncontrado) {
            mostrarError(
                'No se ha encontrado el equipo solicitado.',
                estado,
                nombre,
                liga,
                palmares,
                roster
            );
            return;
        }

        nombre.textContent = equipoEncontrado.nombre;
        document.title = `${equipoEncontrado.nombre} | RiftTracker`;
        liga.textContent = `Liga: ${nombreLiga}`;
        acronimo.textContent = equipoEncontrado.acronimo || '';

        const logoUrl = equipoEncontrado.logo_url;

        if (logoUrl) {
            escudo.src = logoUrl;
            escudo.alt = `Escudo de ${equipoEncontrado.nombre}`;
            escudo.hidden = false;
            escudoFallback.hidden = true;

            escudo.onerror = () => {
                escudo.hidden = true;
                escudoFallback.hidden = false;
            };
        } else {
            escudo.hidden = true;
            escudoFallback.hidden = false;
        }

        estado.textContent = 'Cargando palmarés y roster...';

        const [respuestaJugadores, respuestaPalmares] = await Promise.all([
            fetch(`/api/equipos/${encodeURIComponent(equipoId)}/jugadores`),
            fetch(`/api/equipos/${encodeURIComponent(equipoId)}/palmares`)
        ]);

        if (!respuestaJugadores.ok || !respuestaPalmares.ok) {
            throw new Error(
                'No se pudieron consultar los jugadores o el palmarés.'
            );
        }

        const jugadores = await respuestaJugadores.json();
        const titulos = await respuestaPalmares.json();

        mostrarPalmares(titulos, palmares, nombreLiga);
        mostrarRoster(jugadores, roster);

        estado.textContent = '';

    } catch (error) {
        console.error('Error al cargar la ficha del equipo:', error);

        estado.textContent =
            'No se ha podido cargar toda la información. Comprueba el servidor y la consola.';
        
        palmares.innerHTML = '';
        roster.innerHTML = '';

        const mensajePalmares = crearMensaje('Error al cargar el palmarés.');
        const mensajeRoster = crearMensaje('Error al cargar el roster.');

        palmares.appendChild(mensajePalmares);
        roster.appendChild(mensajeRoster);
    }
}



function mostrarPalmares(titulos, contenedor, nombreLiga) {
    contenedor.innerHTML = '';

    if (!Array.isArray(titulos)) {
        contenedor.appendChild(
            crearMensaje('No se pudieron consultar los títulos.')
        );
        return;
    }

    const liga = String(nombreLiga || '').toUpperCase();

    let regional;

    if (liga.includes('LCK')) {
        regional = {
            nombre: 'LCK',
            imagen: '/assets/trofeos/lck.png',
            coincidencias: ['lck']
        };
    } else if (liga.includes('LEC') || liga.includes('EMEA')) {
        regional = {
            nombre: 'LEC',
            imagen: '/assets/trofeos/lec.png',
            coincidencias: ['lec', 'emea']
        };
    } else if (liga.includes('LPL')) {
        regional = {
            nombre: 'LPL',
            imagen: '/assets/trofeos/lpl.png',
            coincidencias: ['lpl']
        };
    } else {
        regional = {
            nombre: liga || 'LIGA',
            imagen: '',
            coincidencias: [liga.toLowerCase()]
        };
    }

    const competiciones = [
        {
            nombre: 'WORLDS',
            imagen: '/assets/trofeos/worlds.png',
            coincidencias: ['world championship', 'worlds']
        },
        regional,
        {
            nombre: 'MSI',
            imagen: '/assets/trofeos/msi.png',
            coincidencias: [
                'msi',
                'mid-season invitational',
                'mid season invitational'
            ]
        }
    ];

    competiciones.forEach(competicion => {
        const total = titulos.filter(titulo => {
            const nombreTitulo = String(
                titulo.torneo || titulo.titulo || ''
            ).toLowerCase().trim();

            return competicion.coincidencias.some(nombre =>
                nombreTitulo.includes(nombre)
            );
        }).length;

        const tarjeta = document.createElement('article');
        tarjeta.className = 'ficha-trofeo-resumen';

        if (competicion.imagen) {
            const imagen = document.createElement('img');
            imagen.src = competicion.imagen;
            imagen.alt = `Trofeo de ${competicion.nombre}`;

            imagen.onerror = () => {
                imagen.style.display = 'none';
            };

            tarjeta.appendChild(imagen);
        }

        const nombre = document.createElement('h3');
        nombre.textContent = competicion.nombre;

        const numero = document.createElement('span');
        numero.className = 'ficha-trofeo-total';
        numero.textContent = total;

        tarjeta.append(nombre, numero);
        contenedor.appendChild(tarjeta);
    });
}




function mostrarRoster(jugadores, contenedor) {
    contenedor.innerHTML = '';

    if (!Array.isArray(jugadores) || jugadores.length === 0) {
        contenedor.appendChild(
            crearMensaje('Todavía no hay jugadores registrados.')
        );
        return;
    }

    const ordenRoles = {
        'TOP': 1,
        'JUNGLE': 2,
        'JUNGLA': 2,
        'MID': 3,
        'MIDDLE': 3,
        'ADC': 4,
        'BOT': 4,
        'BOTTOM': 4,
        'SUPPORT': 5,
        'SUPP': 5
    };

    const jugadoresOrdenados = [...jugadores].sort((a, b) => {
        const rolA = String(a.rol || '').toUpperCase();
        const rolB = String(b.rol || '').toUpperCase();

        return (ordenRoles[rolA] || 99) - (ordenRoles[rolB] || 99);
    });

    jugadoresOrdenados.forEach(jugador => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'ficha-jugador';

        const foto = document.createElement('img');
        foto.className = 'ficha-jugador-foto';
        foto.src = jugador.foto_url || '';
        foto.alt = `Fotografía de ${jugador.nickname || 'jugador'}`;
        foto.loading = 'lazy';

        foto.onerror = () => {
            foto.style.display = 'none';
        };

        const rol = document.createElement('span');
        rol.className = 'ficha-jugador-rol';

        const nombresRoles = {
            TOP: 'TOP',
            JUNGLE: 'JUNGLA',
            JUNGLA: 'JUNGLA',
            MID: 'MID',
            MIDDLE: 'MID',
            ADC: 'ADC',
            BOT: 'ADC',
            BOTTOM: 'ADC',
            SUPPORT: 'SUPP',
            SUPP: 'SUPP'
        };

        const rolOriginal = String(jugador.rol || '').toUpperCase();
        rol.textContent = nombresRoles[rolOriginal] || rolOriginal || 'SIN ROL';

        const nickname = document.createElement('h3');
        nickname.textContent = jugador.nickname || 'Jugador';

        const nombreReal = document.createElement('p');
        nombreReal.textContent = jugador.nombre_real || '';

        tarjeta.append(foto, rol, nickname, nombreReal);
        contenedor.appendChild(tarjeta);
    });
}

function crearMensaje(texto) {
    const mensaje = document.createElement('p');
    mensaje.className = 'ficha-mensaje';
    mensaje.textContent = texto;
    return mensaje;
}

function mostrarError(texto, estado, nombre, liga, palmares, roster) {
    estado.textContent = texto;
    nombre.textContent = 'Equipo no disponible';
    liga.textContent = 'Vuelve a la página principal y selecciona un equipo.';
    palmares.innerHTML = '';
    roster.innerHTML = '';
}
document.addEventListener('DOMContentLoaded', () => {
    configurarBuscador();
});

function configurarBuscador() {
    const formulario = document.getElementById('soloq-search-form');

    if (!formulario) return;

    formulario.addEventListener('submit', buscarInvocador);
}

async function buscarInvocador(event) {
    event.preventDefault();

    const gameName = document.getElementById('game-name').value.trim();
    const tagLine = document.getElementById('tag-line').value.trim();
    const region = document.getElementById('region').value;

    const boton = document.getElementById('soloq-search-button');
    const estado = document.getElementById('soloq-status');
    const perfil = document.getElementById('soloq-profile');

    if (!gameName || !tagLine) {
        mostrarEstado('Introduce el nombre y la etiqueta del jugador.', true);
        return;
    }

    boton.disabled = true;
    boton.textContent = 'BUSCANDO...';

    perfil.classList.add('hidden');

    estado.innerHTML = `
        <div class="soloq-loading">
            <span class="soloq-spinner"></span>
            Consultando los datos del invocador...
        </div>
    `;

    try {
        const parametros = new URLSearchParams({
            gameName,
            tagLine,
            region
        });

        const respuesta = await fetch(
            `/api/soloq/buscar?${parametros.toString()}`
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                datos.error || 'No se ha podido encontrar al jugador.'
            );
        }

        mostrarPerfil(datos);

        estado.classList.add('hidden');
        perfil.classList.remove('hidden');

    } catch (error) {
        console.error('Error en el buscador SoloQ:', error);

        perfil.classList.add('hidden');

        mostrarEstado(
            error.message || 'Error al consultar la información del jugador.',
            true
        );

    } finally {
        boton.disabled = false;
        boton.innerHTML = '<span class="search-button-icon">⌕</span> BUSCAR';
    }
}

function mostrarEstado(mensaje, esError = false) {
    const estado = document.getElementById('soloq-status');

    estado.classList.remove('hidden');

    estado.innerHTML = '';

    const caja = document.createElement('div');
    caja.className = `soloq-message${esError ? ' error' : ''}`;
    caja.textContent = mensaje;

    estado.appendChild(caja);
}

function mostrarPerfil(datos) {
    const cuenta = datos.account || {};
    const rango = datos.ranked || {};
    const partidas = Array.isArray(datos.matches) ? datos.matches : [];

    document.getElementById('profile-name').textContent =
        cuenta.gameName || 'Jugador';

    document.getElementById('profile-tag').textContent =
        `#${cuenta.tagLine || ''}`;

    document.getElementById('profile-region').textContent =
        datos.region || '';

    document.getElementById('profile-level').textContent =
        cuenta.summonerLevel ?? '—';

    const icono = document.getElementById('profile-icon');

    if (cuenta.profileIconUrl) {
        icono.src = cuenta.profileIconUrl;
        icono.hidden = false;
    } else {
        icono.removeAttribute('src');
        icono.hidden = true;
    }

    const imagenRango = document.getElementById('rank-icon');

    if (rango.rankIconUrl) {
        imagenRango.src = rango.rankIconUrl;
        imagenRango.hidden = false;
    } else {
        imagenRango.removeAttribute('src');
        imagenRango.hidden = true;
    }

    const division = rango.division ? ` ${rango.division}` : '';

    document.getElementById('rank-tier').textContent =
        rango.tier
            ? `${formatearRango(rango.tier)}${division}`
            : 'Sin clasificación';

    document.getElementById('rank-points').textContent =
        rango.leaguePoints !== undefined
            ? `${rango.leaguePoints} LP`
            : 'Sin puntos disponibles';

    mostrarEstadisticas(partidas);
    mostrarPartidas(partidas);
}

function mostrarEstadisticas(partidas) {
    const total = partidas.length;

    const victorias = partidas.filter(partida => partida.win).length;
    const derrotas = total - victorias;

    const winrate = total > 0
        ? (victorias / total) * 100
        : 0;

    const kills = partidas.reduce(
        (total, partida) => total + Number(partida.kills || 0), 0
    );

    const deaths = partidas.reduce(
        (total, partida) => total + Number(partida.deaths || 0), 0
    );

    const assists = partidas.reduce(
        (total, partida) => total + Number(partida.assists || 0), 0
    );

    const kda = deaths === 0
        ? kills + assists
        : (kills + assists) / deaths;

    document.getElementById('stat-games').textContent = total;
    document.getElementById('stat-wins').textContent = victorias;
    document.getElementById('stat-losses').textContent = derrotas;

    document.getElementById('stat-winrate').textContent =
        `${winrate.toFixed(1)}%`;

    document.getElementById('stat-kda').textContent =
        kda.toFixed(2);
}

function mostrarPartidas(partidas) {
    const contenedor = document.getElementById('soloq-matches');

    contenedor.innerHTML = '';

    if (partidas.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.className = 'soloq-placeholder';
        mensaje.textContent = 'No hay partidas clasificatorias disponibles.';

        contenedor.appendChild(mensaje);
        return;
    }

    partidas.forEach(partida => {
        const tarjeta = document.createElement('article');

        tarjeta.className = `soloq-match ${
            partida.win ? 'victory' : 'defeat'
        }`;

        const linea = document.createElement('div');
        linea.className = 'match-result-line';

        const campeon = document.createElement('img');
        campeon.className = 'match-champion';
        campeon.alt = partida.championName || 'Campeón';

        if (partida.championIcon) {
            campeon.src = partida.championIcon;
        } else {
            campeon.hidden = true;
        }

        const informacion = document.createElement('div');

        const nombreCampeon = document.createElement('strong');
        nombreCampeon.className = 'match-champion-name';
        nombreCampeon.textContent = partida.championName || 'Desconocido';

        const posicion = document.createElement('span');
        posicion.className = 'match-lane';
        posicion.textContent = partida.lane || 'Posición desconocida';

        informacion.append(nombreCampeon, posicion);

        const estadisticas = document.createElement('div');
        estadisticas.className = 'match-kda';

        const kda = document.createElement('strong');

        kda.textContent =
            `${partida.kills ?? 0} / ${partida.deaths ?? 0} / ${partida.assists ?? 0}`;

        const resultado = document.createElement('span');

        resultado.textContent = `KDA: ${calcularKDA(partida).toFixed(2)}`;

        estadisticas.append(kda, resultado);

        const meta = document.createElement('div');
        meta.className = 'match-meta';

        const duracion = document.createElement('span');
        duracion.textContent = formatearDuracion(partida.duration);

        const fecha = document.createElement('span');
        fecha.textContent = formatearFecha(partida.playedAt);

        meta.append(duracion, document.createTextNode(' · '), fecha);

        const resultadoFinal = document.createElement('div');
        resultadoFinal.className = 'match-result';

        const textoResultado = document.createElement('strong');

        textoResultado.textContent =
            partida.win ? 'VICTORIA' : 'DERROTA';

        const cola = document.createElement('span');
        cola.textContent = 'CLASIFICATORIA SOLOQ';

        resultadoFinal.append(textoResultado, cola);

        tarjeta.append(
            linea,
            campeon,
            informacion,
            estadisticas,
            meta,
            resultadoFinal
        );

        contenedor.appendChild(tarjeta);
    });
}

function calcularKDA(partida) {
    const kills = Number(partida.kills || 0);
    const deaths = Number(partida.deaths || 0);
    const assists = Number(partida.assists || 0);

    return deaths === 0
        ? kills + assists
        : (kills + assists) / deaths;
}


function formatearRango(rango) {
    const nombres = {
        IRON: 'Hierro',
        BRONZE: 'Bronce',
        SILVER: 'Plata',
        GOLD: 'Oro',
        PLATINUM: 'Platino',
        EMERALD: 'Esmeralda',
        DIAMOND: 'Diamante',
        MASTER: 'Maestro',
        GRANDMASTER: 'Gran Maestro',
        CHALLENGER: 'Challenger'
    };

    return nombres[String(rango).toUpperCase()] || rango;
}


function formatearDuracion(segundos) {
    const minutos = Math.floor(Number(segundos || 0) / 60);
    const resto = Number(segundos || 0) % 60;

    return `${minutos}:${String(resto).padStart(2, '0')}`;
}


function formatearFecha(fecha) {
    if (!fecha) return 'Fecha desconocida';

    const fechaPartida = new Date(fecha);

    if (Number.isNaN(fechaPartida.getTime())) {
        return 'Fecha desconocida';
    }

    return fechaPartida.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

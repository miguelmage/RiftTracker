document.addEventListener('DOMContentLoaded', () => {
  cargarLigas();
  setupModalEvents();
});

async function cargarLigas() {
  const container = document.getElementById('ligas-container');
  if (!container) return;

  try {
    const res = await fetch('/api/ligas');
    const ligas = await res.json();

    container.innerHTML = '';

    if (ligas.length === 0) {
      container.innerHTML = '<p class="loading">No hay ligas en la base de datos.</p>';
      return;
    }

    ligas.forEach(liga => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        ${liga.logo_url ? `<img src="${liga.logo_url}" alt="${liga.nombre}" class="card-logo">` : '🏆'}
        <h3>${liga.nombre}</h3>
        <p>Región: <strong>${liga.region || 'Oficial'}</strong></p>
      `;
      card.addEventListener('click', () => cargarEquipos(liga.id || liga.id_liga, liga.nombre));
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p class="loading">Error al conectar con el servidor.</p>';
  }
}

async function cargarEquipos(ligaId, nombreLiga) {
  const seccion = document.getElementById('equipos-seccion');
  const titulo = document.getElementById('equipo-title');
  const container = document.getElementById('equipos-container');

  titulo.textContent = `EQUIPOS DE ${nombreLiga.toUpperCase()}`;
  seccion.classList.remove('hidden');
  container.innerHTML = '<p class="loading">Cargando equipos...</p>';

  try {
    const res = await fetch(`/api/ligas/${ligaId}/equipos`);
    const equipos = await res.json();

    container.innerHTML = '';

    if (equipos.length === 0) {
      container.innerHTML = '<p class="loading">No hay equipos registrados en esta liga.</p>';
      return;
    }

    equipos.forEach(equipo => {
    const card = document.createElement('div');
    card.className = 'card card-equipo';

    const logoUrl = equipo.logo_url;

    card.innerHTML = `
        <div class="equipo-logo-container">
        ${
            logoUrl
            ? `<img src="${logoUrl}" alt="Logo de ${equipo.nombre}" class="card-escudo"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">`
            : ''
        }
        <span class="equipo-logo-fallback"
                style="display:${logoUrl ? 'none' : 'block'}">🛡️</span>
        </div>
        <h3>${equipo.nombre}</h3>
        <p>Ver Roster y Palmarés</p>
    `;

    card.addEventListener('click', () => {
        abrirFichaEquipo(
        equipo.id || equipo.id_equipo,
        equipo.nombre,
        logoUrl
        );
    });

    container.appendChild(card);
    });

    seccion.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    container.innerHTML = '<p class="loading">Error al cargar los equipos.</p>';
  }
}

async function abrirFichaEquipo(equipoId, nombreEquipo, logoUrl) {
  const modal = document.getElementById('roster-modal');
  const title = document.getElementById('modal-equipo-nombre');
  const palmaresList = document.getElementById('modal-palmares-list');
  const jugadoresGrid = document.getElementById('modal-jugadores-list');

  title.innerHTML = `
  ${logoUrl ? `<img src="${logoUrl}" class="modal-header-escudo" alt="Logo de ${nombreEquipo}">` : ''}
  ${nombreEquipo.toUpperCase()}
`;
  
  palmaresList.innerHTML = '<li>Cargando...</li>';
  jugadoresGrid.innerHTML = '<p class="loading">Cargando...</p>';
  modal.classList.remove('hidden');

  try {
    const [resJugadores, resPalmares] = await Promise.all([
      fetch(`/api/equipos/${equipoId}/jugadores`),
      fetch(`/api/equipos/${equipoId}/palmares`)
    ]);

    const jugadores = await resJugadores.json();
    const palmares = await resPalmares.json();

    palmaresList.innerHTML = '';
    if (palmares.length === 0) {
      palmaresList.innerHTML = '<li>Sin títulos registrados.</li>';
    } else {
      palmares.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `🥇 <strong>${item.torneo || item.titulo}</strong> (${item.anio || 'Año N/A'})`;
        palmaresList.appendChild(li);
      });
    }
    jugadoresGrid.innerHTML = '';
    if (jugadores.length === 0) {
      jugadoresGrid.innerHTML = '<p>No hay jugadores registrados.</p>';
    } else {
      jugadores.forEach(j => {
        const div = document.createElement('div');
        div.className = 'jugador-badge';
        div.innerHTML = `
          <h4>${j.nickname || j.nombre}</h4>
          <p><strong>Rol:</strong> ${j.rol}</p>
          <p><strong>SoloQ:</strong> ${j.soloq_rank || 'Challenger'} (${j.lp || 0} LP)</p>
        `;
        jugadoresGrid.appendChild(div);
      });
    }

  } catch (err) {
    jugadoresGrid.innerHTML = '<p class="loading">Error al cargar la información.</p>';
  }
}

function setupModalEvents() {
  const modal = document.getElementById('roster-modal');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}
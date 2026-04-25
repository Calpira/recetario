const CAT_ICONS = {
  'Panes y masas':      '🍞',
  'Postres':            '🍮',
  'Cafetería':          '☕',
  'Pastelería':         '🥐',
  'Tragos y bebidas':   '🍹',
  'Sopas y caldos':     '🍲',
  'Pastas':             '🍝',
  'Salsas y aderezos':  '🥣',
  'Snacks y aperitivos':'🍟',
  'Platos principales': '🥘',
  'Tartas y quiches':   '🥧',
  'Entradas':           '🧆',
  'Ensaladas':          '🥗',
  'Desayunos':          '🍳',
  'Guarniciones':       '🍚',
  'Ingredientes':       '🧂',
};

function catIcon(cat) { return CAT_ICONS[cat] || '🍴'; }

let recetas = [];
let state = {
  categoria: 'todas',
  busqueda: '',
};

async function cargarRecetas() {
  try {
    const resp = await fetch('recetas.json');
    if (!resp.ok) throw new Error();
    recetas = await resp.json();
    construirCategorias();
    render();
  } catch {
    document.getElementById('grid').innerHTML =
      `<div class="empty"><span class="empty-icon">⚠️</span><p>No se pudo cargar recetas.json</p></div>`;
  }
}

function construirCategorias() {
  const ordenBase = Object.keys(CAT_ICONS);
  const presentes = [...new Set(recetas.map(r => r.categoria))];
  const sorted = presentes.sort((a, b) => {
    const ia = ordenBase.indexOf(a), ib = ordenBase.indexOf(b);
    if (ia < 0 && ib < 0) return a.localeCompare(b);
    if (ia < 0) return 1; if (ib < 0) return -1;
    return ia - ib;
  });

  const nav = document.getElementById('cat-nav');
  nav.innerHTML = '<p class="nav-label">Categorías</p>';

  [['todas', 'Todas las recetas'], ...sorted.map(c => [c, c])].forEach(([val, label]) => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (val === 'todas' ? ' active' : '');
    btn.dataset.cat = val;
    btn.innerHTML = `<span class="cat-icon">${catIcon(val)}</span>${label}`;
    btn.addEventListener('click', () => {
      state.categoria = val;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === val));
      document.getElementById('page-title').textContent = val === 'todas' ? 'Todas las recetas' : val;
      render();
      if (window.innerWidth <= 780) closeSidebar();
    });
    nav.appendChild(btn);
  });
}

function limpiarBusqueda() {
  state.busqueda = '';
  document.getElementById('buscador').value = '';
  document.getElementById('search-clear').style.display = 'none';
  render();
}

function filtrarRecetas() {
  const termino = state.busqueda.toLowerCase().trim();
  return recetas.filter(r => {
    if (state.categoria !== 'todas' && r.categoria !== state.categoria) return false;
    if (termino) {
      const haystack = [
        r.titulo, r.descripcion, r.categoria,
        ...(Array.isArray(r.ingredientes_principales) ? r.ingredientes_principales : [r.ingredientes_principales || '']),
        ...(r.ingredientes || []),
        ...(r.etiquetas || []),
      ].join(' ').toLowerCase();
      if (!haystack.includes(termino)) return false;
    }
    return true;
  });
}

function render() {
  const filtradas = filtrarRecetas();
  const grid = document.getElementById('grid');
  const conteo = document.getElementById('conteo');

  conteo.textContent = filtradas.length === 1 ? '1 receta' : `${filtradas.length} recetas`;

  if (!filtradas.length) {
    grid.innerHTML = `
      <div class="empty">
        <span class="empty-icon">🔍</span>
        <p>No hay recetas que coincidan.</p>
        <p class="empty-sub">Probá ajustar la búsqueda o la categoría.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtradas.map(r => {
    const imgEl = r.imagen
      ? `<img class="card-img" src="${r.imagen}" alt="${r.titulo}" loading="lazy"
           onerror="this.parentElement.innerHTML='<div class=\\'card-img-placeholder\\'>${catIcon(r.categoria)}</div>'">`
      : `<div class="card-img-placeholder">${catIcon(r.categoria)}</div>`;

    const badges = r.etiquetas?.slice(0, 2).map(t => `<span class="badge badge-tag">${t}</span>`).join('') || '';

    return `
      <article class="card" onclick="abrirModal(${r.id})">
        ${imgEl}
        <div class="card-body">
          <div class="card-cat-row">
            <span class="card-cat-icon">${catIcon(r.categoria)}</span>
            <span class="card-cat">${r.categoria}</span>
          </div>
          <h2 class="card-title">${r.titulo}</h2>
          <p class="card-desc">${r.descripcion}</p>
          ${badges ? `<div class="card-badges">${badges}</div>` : ''}
        </div>
        <div class="card-footer">
          <span class="card-meta">🕐 ${r.tiempo}</span>
          <span class="card-meta">🍽 ${r.porciones} ${r.porcion_unidad || 'porciones'}</span>
        </div>
      </article>`;
  }).join('');
}

function abrirModal(id) {
  const r = recetas.find(x => x.id === id);
  if (!r) return;

  const imgEl = r.imagen
    ? `<img class="modal-img" src="${r.imagen}" alt="${r.titulo}">`
    : `<div class="modal-img-placeholder">${catIcon(r.categoria)}</div>`;

  const tagsEl = r.etiquetas?.length
    ? `<div class="card-badges" style="margin-top:.5rem">${r.etiquetas.map(t => `<span class="badge badge-tag">${t}</span>`).join('')}</div>`
    : '';

  const tipsEl = r.tips?.length
    ? `<p class="modal-section">Tips</p><ul class="tips-list">${r.tips.map(t => `<li>${t}</li>`).join('')}</ul>`
    : '';

  document.getElementById('modal-body').innerHTML = `
    ${imgEl}
    <div class="modal-content">
      <div class="modal-cat-row">
        <span class="modal-cat-icon">${catIcon(r.categoria)}</span>
        <span class="modal-cat">${r.categoria}</span>
      </div>
      <h2 class="modal-title">${r.titulo}</h2>
      <div class="modal-meta">
        <span>🕐 ${r.tiempo}</span>
        <span>🍽 ${r.porciones} ${r.porcion_unidad || 'porciones'}</span>
        ${r.dificultad ? `<span>⚡ ${r.dificultad}</span>` : ''}
      </div>
      <p class="modal-desc">${r.descripcion}</p>
      ${tagsEl} 
      <p class="modal-section">Ingredientes</p>
      <ul class="ing-list">${r.ingredientes.map(i => `<li>${i}</li>`).join('')}</ul>
      <p class="modal-section">Preparación</p>
      <ol class="steps-list">${r.pasos.map((p, i) => `
        <li><span class="step-num">${i + 1}</span><span>${p}</span></li>`).join('')}
      </ol>
      ${tipsEl}
    </div>`;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleSidebar() {
  const open = document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay-bg').classList.toggle('open', open);
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay-bg').classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { cerrarModal(); closeSidebar(); }
});

document.getElementById('buscador').addEventListener('input', e => {
  state.busqueda = e.target.value;
  document.getElementById('search-clear').style.display = e.target.value ? 'block' : 'none';
  render();
});

document.getElementById('search-clear').style.display = 'none';

cargarRecetas();

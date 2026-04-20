const openedMap = new Map();
const totalMap = {};
let currentTab = 0;

function getOpened(tab) {
  if (!openedMap.has(tab)) openedMap.set(tab, new Set());
  return openedMap.get(tab);
}

function toggle(tab, num) {
  const card = document.getElementById('card-' + tab + '-' + num);
  const isOpen = card.classList.contains('open');
  card.classList.toggle('open', !isOpen);
  const s = getOpened(tab);
  if (!isOpen) s.add(num); else s.delete(num);
  updateProgress();
}

function updateProgress() {
  const total = totalMap[currentTab] || 0;
  const opened = getOpened(currentTab).size;
  const pct = total ? Math.round((opened / total) * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = '已展开 ' + opened + ' / ' + total + ' 题';
}

function switchTab(idx) {
  document.querySelectorAll('.tab-panel').forEach((p, i) => {
    p.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', +btn.dataset.tab === idx);
  });
  document.querySelectorAll('.fab-menu-item').forEach(item => {
    item.classList.toggle('active-tab', +item.dataset.tab === idx);
  });
  currentTab = idx;
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeFabMenu();
}

function toggleMenu() {
  const menu = document.getElementById('fabMenu');
  const btn = document.getElementById('fabBtn');
  const open = menu.classList.toggle('open');
  btn.textContent = open ? '✕' : '☰';
}

function closeFabMenu() {
  document.getElementById('fabMenu').classList.remove('open');
  document.getElementById('fabBtn').textContent = '☰';
}

document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.fab-wrap');
  if (!wrap.contains(e.target)) closeFabMenu();
});

// ── rendering ──

const CHEVRON = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`;

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderCard(card, tabIdx, cardIdx) {
  const num = String(cardIdx + 1).padStart(2, '0');
  const tags = card.tags.map(t => `<span class="tag tag-${t.color}">${t.text}</span>`).join('');

  const openingLabel = card.code ? '口述思路' : '开场白';

  const codeSection = card.code ? `
      <div class="section section-code">
        <div class="section-label"><span class="dot"></span>源码</div>
        <div class="code-wrap"><pre><code class="language-javascript">${escapeHtml(card.code)}</code></pre></div>
      </div>` : '';

  const listSection = card.pitfall ? `
      <div class="section section-pitfall">
        <div class="section-label"><span class="dot"></span>易错点</div>
        <ul>${card.pitfall.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>` : `
      <div class="section section-followup">
        <div class="section-label"><span class="dot"></span>${card.followupLabel || '追问点'}</div>
        <ul>${card.followup.map(f => `<li${f.extra ? ' class="extra"' : ''}>${f.text}</li>`).join('')}</ul>
      </div>`;

  const bonusSection = card.bonus ? `
      <div class="section section-bonus">
        <div class="section-label"><span class="dot"></span>加分点</div>
        <div class="content">${card.bonus}</div>
      </div>` : '';

  return `
  <div class="card" id="card-${tabIdx}-${cardIdx + 1}">
    <div class="card-header" onclick="toggle(${tabIdx},${cardIdx + 1})">
      <div class="card-num">${num}</div>
      <div class="card-title-wrap">
        <div class="card-title">${card.title}</div>
        <div class="card-tags">${tags}</div>
      </div>
      ${CHEVRON}
    </div>
    <div class="card-body">
      <div class="section section-opening">
        <div class="section-label"><span class="dot"></span>${openingLabel}</div>
        <div class="content">${card.opening}</div>
      </div>
      ${codeSection}
      ${listSection}
      ${bonusSection}
    </div>
  </div>`;
}

function init() {
  const tabBar = document.getElementById('tabBar');
  const fabMenu = document.getElementById('fabMenu');
  const main = document.getElementById('main');

  window.TABS_DATA.forEach((tab, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (i === 0 ? ' active' : '');
    btn.dataset.tab = i;
    btn.textContent = `${tab.icon} ${tab.name}`;
    btn.onclick = () => switchTab(i);
    tabBar.appendChild(btn);

    const a = document.createElement('a');
    a.className = 'fab-menu-item' + (i === 0 ? ' active-tab' : '');
    a.dataset.tab = i;
    a.textContent = `${tab.icon} ${tab.name}`;
    a.onclick = () => switchTab(i);
    fabMenu.appendChild(a);

    const panel = document.createElement('div');
    panel.className = 'tab-panel' + (i === 0 ? ' active' : '');
    panel.id = `panel-${i}`;
    panel.innerHTML = `<div class="module-label">${tab.moduleLabel}</div>` +
      tab.cards.map((card, ci) => renderCard(card, i, ci)).join('');
    main.appendChild(panel);

    totalMap[i] = tab.cards.length;
  });

  document.getElementById('headerSubtitle').textContent =
    window.TABS_DATA.map(t => `${t.icon} ${t.name}`).join(' · ');
  document.getElementById('statModules').textContent = window.TABS_DATA.length;
  document.getElementById('statCards').textContent =
    window.TABS_DATA.reduce((s, t) => s + t.cards.length, 0);

  updateProgress();
}

init();
if (typeof hljs !== 'undefined') hljs.highlightAll();

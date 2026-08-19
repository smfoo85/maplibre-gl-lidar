import maplibregl from 'maplibre-gl';
import { hasLidarShareParams, LidarControl, LidarLayerAdapter } from '../src/index';
import { LayerControl } from 'maplibre-gl-layer-control';
import '../src/index.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl-layer-control/style.css';

// ─── Sample datasets ──────────────────────────────────────────────────────────

const SAMPLES = [
  {
    name: 'Autzen Stadium',
    location: 'Oregon, USA',
    type: 'COPC',
    url: 'https://s3.amazonaws.com/hobu-lidar/autzen-classified.copc.laz',
  },
  {
    name: 'Madison',
    location: 'Wisconsin, USA',
    type: 'COPC',
    url: 'https://data.opengeos.org/madison.copc.laz',
  },
  {
    name: 'Chicago',
    location: 'Illinois, USA',
    type: 'COPC',
    url: 'https://data.opengeos.org/chicago.copc.laz',
  },
  {
    name: 'Texas Coast',
    location: 'Texas, USA',
    type: 'COPC',
    url: 'https://data.opengeos.org/USGS_LPC_TX_CoastalRegion_2018_A18_stratmap18-50cm-2995201a1.copc.laz',
  },
  {
    name: 'Alabama',
    location: 'Alabama, USA',
    type: 'EPT',
    url: 'https://s3-us-west-2.amazonaws.com/usgs-lidar-public/AL_17Co_1_2020/ept.json',
  },
  {
    name: 'Chicago (EPT)',
    location: 'Illinois, USA',
    type: 'EPT',
    url: 'https://s3-us-west-2.amazonaws.com/usgs-lidar-public/USGS_LPC_IL_4County_Cook_2017_LAS_2019/ept.json',
  },
];

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const landing         = document.getElementById('landing')!;
const urlForm         = document.getElementById('url-form') as HTMLFormElement;
const urlInput        = document.getElementById('url-input') as HTMLInputElement;
const loadBtn         = document.getElementById('load-btn') as HTMLButtonElement;
const dropZone        = document.getElementById('drop-zone')!;
const fileInput       = document.getElementById('file-input') as HTMLInputElement;
const loadingOverlay  = document.getElementById('loading-overlay')!;
const loadingFile     = document.getElementById('loading-file')!;
const statsRibbon     = document.getElementById('stats-ribbon')!;
const ribbonBack      = document.getElementById('ribbon-back')!;
const statName        = document.getElementById('stat-name')!;
const statPoints      = document.getElementById('stat-points')!;
const statFormat      = document.getElementById('stat-format')!;
const statRgb         = document.getElementById('stat-rgb')!;
const statClass       = document.getElementById('stat-class')!;
const errorToast      = document.getElementById('error-toast')!;
const streamBar       = document.getElementById('stream-bar')!;
const samplesGrid     = document.getElementById('samples-grid')!;
const scanCanvas      = document.getElementById('scan-canvas') as HTMLCanvasElement;

// ─── Scan-grid canvas animation ───────────────────────────────────────────────

(function initScanCanvas() {
  const ctx = scanCanvas.getContext('2d');
  if (!ctx) return;

  let raf: number;
  let time = 0;

  function resize() {
    scanCanvas.width  = window.innerWidth;
    scanCanvas.height = window.innerHeight;
  }

  function draw() {
    const W = scanCanvas.width;
    const H = scanCanvas.height;
    ctx.clearRect(0, 0, W, H);

    // detect dark/light from tokens
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
      || document.documentElement.dataset.theme === 'dark';

    const gridColor  = dark ? 'rgba(0,196,160,' : 'rgba(0,136,122,';
    const pulseColor = dark ? 'rgba(0,196,160,' : 'rgba(0,136,122,';

    const step = 48;
    ctx.lineWidth = .5;

    // grid
    for (let x = 0; x < W; x += step) {
      ctx.strokeStyle = gridColor + '.12)';
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.strokeStyle = gridColor + '.12)';
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // horizontal scan line
    const scanY = (Math.sin(time * .0012) * .5 + .5) * H;
    const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
    grad.addColorStop(0,   pulseColor + '0)');
    grad.addColorStop(.4,  pulseColor + '.10)');
    grad.addColorStop(.5,  pulseColor + '.28)');
    grad.addColorStop(.6,  pulseColor + '.10)');
    grad.addColorStop(1,   pulseColor + '0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 60, W, 120);

    // scan line itself
    ctx.strokeStyle = pulseColor + '.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(W, scanY);
    ctx.stroke();

    // dots at grid intersections near scan line
    const dotR = 1.8;
    for (let x = 0; x < W; x += step) {
      for (let y = 0; y < H; y += step) {
        const dist = Math.abs(y - scanY);
        const a = Math.max(0, .5 - dist / 100);
        if (a <= 0) continue;
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = pulseColor + a + ')';
        ctx.fill();
      }
    }

    time++;
    raf = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();

  // pause when landing is hidden
  const observer = new MutationObserver(() => {
    if (landing.classList.contains('hidden')) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
  });
  observer.observe(landing, { attributes: true, attributeFilter: ['class'] });
})();

// ─── Populate sample cards ────────────────────────────────────────────────────

SAMPLES.forEach(s => {
  const card = document.createElement('div');
  card.className = 'sample-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Load ${s.name} sample dataset`);
  card.innerHTML = `
    <span class="sample-card-name">${s.name}</span>
    <span class="sample-card-type">${s.type}</span>
    <span class="sample-card-meta">${s.location}</span>
  `;
  card.addEventListener('click', () => loadFromUrl(s.url));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') loadFromUrl(s.url); });
  samplesGrid.appendChild(card);
});

// ─── Error toast ──────────────────────────────────────────────────────────────

let errorTimer: ReturnType<typeof setTimeout>;
function showError(msg: string) {
  errorToast.textContent = msg;
  errorToast.classList.add('visible');
  clearTimeout(errorTimer);
  errorTimer = setTimeout(() => errorToast.classList.remove('visible'), 6000);
}

// ─── Map & controls (lazy) ────────────────────────────────────────────────────

let map: maplibregl.Map | null = null;
let lidarControl: LidarControl | null = null;
let layerControl: LayerControl | null = null;

function initMap(): maplibregl.Map {
  if (map) return map;

  map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center: [0, 0],
    zoom: 2,
    pitch: 60,
    maxPitch: 85,
  });

  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  map.addControl(new maplibregl.FullscreenControl(), 'top-right');
  map.addControl(new maplibregl.GlobeControl(), 'top-right');
  map.addControl(new maplibregl.ScaleControl(), 'bottom-right');

  map.on('style.load', () => {
    if (!map) return;
    map.addSource('google-satellite', {
      type: 'raster',
      tiles: ['https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'],
      tileSize: 256,
      attribution: '© Google',
    });
    map.addLayer({
      id: 'google-satellite',
      type: 'raster',
      source: 'google-satellite',
      paint: { 'raster-opacity': 1 },
      layout: { visibility: 'visible' },
      minzoom: 16,
    });
  });

  return map;
}

function initLidarControl(): LidarControl {
  if (lidarControl) return lidarControl;

  lidarControl = new LidarControl({
    title: 'LiDAR Viewer',
    collapsed: false,
    panelWidth: 360,
    pointSize: 2,
    opacity: 1.0,
    colorScheme: 'elevation',
    pickable: true,
    restoreFromUrl: false,
    closeOnOutsideClick: false,
  });

  // streaming progress bar
  lidarControl.on('streamingprogress', (event) => {
    const prog = event?.state?.streamingProgress;
    if (prog != null) {
      const pct = Math.round(prog * 100);
      streamBar.style.width = `${pct}%`;
      streamBar.classList.remove('hidden');
    }
  });

  lidarControl.on('streamingstart', () => {
    streamBar.style.width = '5%';
    streamBar.classList.remove('hidden');
  });

  lidarControl.on('streamingstop', () => {
    streamBar.style.width = '100%';
    setTimeout(() => {
      streamBar.classList.add('hidden');
      streamBar.style.width = '0%';
    }, 500);
  });

  return lidarControl;
}

function initLayerControl(ctrl: LidarControl): LayerControl {
  if (layerControl) return layerControl;

  const adapter = new LidarLayerAdapter(ctrl);
  layerControl = new LayerControl({
    collapsed: true,
    customLayerAdapters: [adapter],
    showStyleEditor: true,
    basemapStyleUrl: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  });

  return layerControl;
}

async function ensureMapReady(): Promise<maplibregl.Map> {
  const m = initMap();
  if (!m.loaded()) {
    await new Promise<void>(res => m.on('load', () => res()));
  }
  return m;
}

async function attachControls(m: maplibregl.Map): Promise<LidarControl> {
  const ctrl = initLidarControl();
  const lc   = initLayerControl(ctrl);

  if (!m.hasControl(lc))   m.addControl(lc, 'top-right');
  if (!m.hasControl(ctrl)) m.addControl(ctrl, 'top-right');

  return ctrl;
}

// ─── Update stats ribbon ──────────────────────────────────────────────────────

function updateStats(info: {
  name: string;
  pointCount: number;
  hasRGB: boolean;
  hasClassification: boolean;
  format?: string;
}) {
  statName.textContent   = info.name.length > 28 ? '…' + info.name.slice(-25) : info.name;
  statPoints.textContent = info.pointCount.toLocaleString();
  statFormat.textContent = info.format ?? '—';
  statRgb.textContent    = info.hasRGB ? 'Yes' : 'No';
  statClass.textContent  = info.hasClassification ? 'Yes' : 'No';
  statsRibbon.classList.add('visible');
}

// ─── Load from URL ────────────────────────────────────────────────────────────

async function loadFromUrl(url: string): Promise<void> {
  const trimmed = url.trim();
  if (!trimmed) return;

  loadingFile.textContent = trimmed.split('/').pop() ?? trimmed;
  loadingOverlay.classList.remove('hidden');
  loadBtn.disabled = true;
  statsRibbon.classList.remove('visible');

  try {
    const m    = await ensureMapReady();
    const ctrl = await attachControls(m);

    const info = await ctrl.loadPointCloud(trimmed);

    ctrl.flyToPointCloud(info.id);

    // Update browser URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('url', trimmed);
    window.history.pushState({}, '', newUrl.toString());

    document.title = `${info.name} — Point Cloud Viewer`;

    updateStats({
      name:              info.name,
      pointCount:        info.pointCount,
      hasRGB:            info.hasRGB,
      hasClassification: info.hasClassification,
      format:            (info as any).format ?? guessFormat(trimmed),
    });

    // Hide landing
    landing.classList.add('hidden');

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    showError(`Failed to load: ${msg}`);
    console.error(err);
  } finally {
    loadingOverlay.classList.add('hidden');
    loadBtn.disabled = false;
  }
}

// ─── Load from File ───────────────────────────────────────────────────────────

async function loadFromFile(file: File): Promise<void> {
  loadingFile.textContent = file.name;
  loadingOverlay.classList.remove('hidden');
  loadBtn.disabled = true;
  statsRibbon.classList.remove('visible');

  try {
    const m    = await ensureMapReady();
    const ctrl = await attachControls(m);

    const info = await ctrl.loadPointCloud(file);

    ctrl.flyToPointCloud(info.id);
    document.title = `${file.name} — Point Cloud Viewer`;

    updateStats({
      name:              file.name,
      pointCount:        info.pointCount,
      hasRGB:            info.hasRGB,
      hasClassification: info.hasClassification,
      format:            guessFormat(file.name),
    });

    landing.classList.add('hidden');

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    showError(`Failed to load: ${msg}`);
    console.error(err);
  } finally {
    loadingOverlay.classList.add('hidden');
    loadBtn.disabled = false;
  }
}

function guessFormat(src: string): string {
  const lower = src.toLowerCase();
  if (lower.endsWith('ept.json'))   return 'EPT';
  if (lower.includes('.copc.laz'))  return 'COPC';
  if (lower.endsWith('.laz'))       return 'LAZ';
  if (lower.endsWith('.las'))       return 'LAS';
  return '—';
}

// ─── Restore shared state ─────────────────────────────────────────────────────

async function restoreShared(): Promise<void> {
  loadingFile.textContent = 'Restoring shared view…';
  loadingOverlay.classList.remove('hidden');

  try {
    const m    = await ensureMapReady();
    const ctrl = await attachControls(m);

    const clouds = await ctrl.restoreFromUrl(window.location.href);
    if (clouds.length) {
      const info = clouds[0];
      updateStats({
        name:              info.name,
        pointCount:        info.pointCount,
        hasRGB:            info.hasRGB,
        hasClassification: info.hasClassification,
        format:            guessFormat(info.name),
      });
    }

    landing.classList.add('hidden');
  } catch (err) {
    console.error('Restore failed:', err);
    loadingOverlay.classList.add('hidden');
  } finally {
    loadingOverlay.classList.add('hidden');
  }
}

// ─── Event listeners ──────────────────────────────────────────────────────────

urlForm.addEventListener('submit', e => {
  e.preventDefault();
  const url = urlInput.value.trim();
  if (url) loadFromUrl(url);
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  if (file) loadFromFile(file);
});

// Drag and drop
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = e.dataTransfer?.files?.[0];
  if (file) loadFromFile(file);
});

// Also allow dropping on the whole page when landing is visible
document.addEventListener('dragover', e => {
  if (!landing.classList.contains('hidden')) e.preventDefault();
});
document.addEventListener('drop', e => {
  if (landing.classList.contains('hidden')) return;
  e.preventDefault();
  const file = e.dataTransfer?.files?.[0];
  if (file) loadFromFile(file);
});

// Back button
ribbonBack.addEventListener('click', () => {
  landing.classList.remove('hidden');
  statsRibbon.classList.remove('visible');
  document.title = 'Point Cloud Viewer';
  const u = new URL(window.location.href);
  u.searchParams.delete('url');
  window.history.pushState({}, '', u.toString());
});

// ─── Auto-load from URL params ────────────────────────────────────────────────

const params = new URLSearchParams(window.location.search);
const initialUrl = params.get('url');

if (hasLidarShareParams(window.location.href)) {
  restoreShared();
} else if (initialUrl) {
  urlInput.value = initialUrl;
  loadFromUrl(initialUrl);
}

// ─── HMR cleanup ─────────────────────────────────────────────────────────────

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    map?.remove();
    map = null;
    lidarControl = null;
    layerControl = null;
  });
}

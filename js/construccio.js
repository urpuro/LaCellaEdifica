import { MATERIALS } from './materials.js';
import { obtenirEstat, treureMaterial, subscriure } from './estat.js';
import { mostrarAvis } from './avis.js';

const COLUMNES = 12;
const FILES = 10;

// graella[fila][columna] = tipus de material o null. La fila 0 és la de dalt.
const graella = Array.from({ length: FILES }, () => Array(COLUMNES).fill(null));
let seleccionat = 'teula';

// Fila on quedaria una peça que comença a `columna`: baixa mentre totes les
// caselles que ocupa estiguin lliures. Retorna -1 si no hi cap.
function filaDesti(columna, amplada) {
  if (columna + amplada > COLUMNES) return -1;
  let fila = -1;
  for (let f = 0; f < FILES; f++) {
    const lliure = graella[f].slice(columna, columna + amplada).every((c) => c === null);
    if (!lliure) break;
    fila = f;
  }
  return fila;
}

function collocar(columna) {
  const { amplada, nom } = MATERIALS[seleccionat];
  const inici = Math.min(columna, COLUMNES - amplada);
  const fila = filaDesti(inici, amplada);
  if (fila < 0) {
    mostrarAvis('Aquí no hi cap!', 'error');
    return;
  }
  if (!treureMaterial(seleccionat)) {
    mostrarAvis(`No tens cap ${nom.toLowerCase()}. Ves a la botiga!`, 'error');
    return;
  }
  for (let c = inici; c < inici + amplada; c++) graella[fila][c] = seleccionat;
  pintarTauler();
}

function pintarTauler() {
  document.getElementById('tauler').innerHTML = graella
    .flatMap((fila, f) =>
      fila.map((tipus, c) => `<div class="casella ${tipus ?? ''}" data-columna="${c}" data-fila="${f}"></div>`))
    .join('');
}

function pintarEines({ inventari }) {
  document.getElementById('eines').innerHTML = Object.entries(MATERIALS)
    .map(([tipus, m]) => `
      <button data-material="${tipus}" class="${tipus === seleccionat ? 'actiu' : ''}">
        ${m.icona} ${m.nom} (${inventari[tipus]})
      </button>`)
    .join('');
}

export function iniciarConstruccio() {
  const tauler = document.getElementById('tauler');
  tauler.style.setProperty('--columnes', COLUMNES);
  tauler.addEventListener('click', (e) => {
    const casella = e.target.closest('[data-columna]');
    if (casella) collocar(Number(casella.dataset.columna));
  });
  document.getElementById('eines').addEventListener('click', (e) => {
    const boto = e.target.closest('[data-material]');
    if (!boto) return;
    seleccionat = boto.dataset.material;
    pintarEines(obtenirEstat());
  });
  subscriure(pintarEines);
  pintarTauler();
}

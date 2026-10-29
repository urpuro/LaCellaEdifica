import { MATERIALS } from './materials.js';
import { gastarPunts, afegirMaterial, subscriure } from './estat.js';
import { mostrarAvis } from './avis.js';

function pintarCataleg({ punts }) {
  document.getElementById('cataleg').innerHTML = Object.entries(MATERIALS)
    .map(([tipus, m]) => `
      <div class="article">
        <div class="icona">${m.icona}</div>
        <h3>${m.nom}</h3>
        <p>${m.preu} punts · ${m.amplada} ${m.amplada === 1 ? 'casella' : 'caselles'}</p>
        <button data-comprar="${tipus}" ${punts < m.preu ? 'disabled' : ''}>Compra</button>
      </div>`)
    .join('');
}

export function iniciarBotiga() {
  document.getElementById('cataleg').addEventListener('click', (e) => {
    const boto = e.target.closest('[data-comprar]');
    if (!boto) return;
    const tipus = boto.dataset.comprar;
    if (gastarPunts(MATERIALS[tipus].preu)) {
      afegirMaterial(tipus);
      mostrarAvis(`Has comprat: ${MATERIALS[tipus].nom}`, 'ok');
    }
  });
  subscriure(pintarCataleg);
}

import { PROVES } from './dades-proves.js';
import { obtenirEstat, sumarPunts, marcarSuperada, subscriure } from './estat.js';
import { mostrarAvis } from './avis.js';

let provaActual = null;

// Majúscules, sense espais, i ";" (separador de Sheets en català) com a ",".
export function normalitzar(text) {
  return String(text).trim().toUpperCase().replace(/\s+/g, '').replace(/;/g, ',');
}

function nomColumna(index) {
  return String.fromCharCode(65 + index);
}

function pintarFull(full) {
  const columnes = Math.max(...full.map((fila) => fila.length));
  const capcalera = Array.from({ length: columnes }, (_, c) => `<th>${nomColumna(c)}</th>`).join('');
  const files = full
    .map((fila, f) => {
      const celles = Array.from({ length: columnes }, (_, c) => `<td>${fila[c] ?? ''}</td>`).join('');
      return `<tr><th>${f + 1}</th>${celles}</tr>`;
    })
    .join('');
  return `<table class="full"><thead><tr><th></th>${capcalera}</tr></thead><tbody>${files}</tbody></table>`;
}

function pintarLlista() {
  const { provesSuperades } = obtenirEstat();
  const llista = document.getElementById('llista-proves');
  llista.innerHTML = PROVES.map((p) => {
    const feta = provesSuperades.has(p.id);
    const actiu = provaActual?.id === p.id ? ' actiu' : '';
    return `<li><button data-prova="${p.id}" class="${feta ? 'feta' : ''}${actiu}">
      ${feta ? '✅' : '⬜'} ${p.titol} <small>(${p.punts} pts)</small></button></li>`;
  }).join('');
}

function obrirProva(id) {
  provaActual = PROVES.find((p) => p.id === id);
  const feta = obtenirEstat().provesSuperades.has(id);
  const contenidor = document.getElementById('prova-activa');
  contenidor.innerHTML = `
    <h2>${provaActual.titol}</h2>
    <p>${provaActual.enunciat}</p>
    ${pintarFull(provaActual.full)}
    <form id="form-resposta" class="resposta">
      <input id="input-resposta" autocomplete="off" spellcheck="false"
             placeholder="Escriu aquí la resposta" ${feta ? 'disabled' : ''}>
      <button type="submit" ${feta ? 'disabled' : ''}>Comprova</button>
    </form>
    ${feta ? '<p class="feta">Ja has superat aquesta prova.</p>' : ''}
  `;
  pintarLlista();
  if (!feta) {
    document.getElementById('form-resposta').addEventListener('submit', comprovar);
    document.getElementById('input-resposta').focus();
  }
}

function comprovar(event) {
  event.preventDefault();
  const resposta = normalitzar(document.getElementById('input-resposta').value);
  const encert = provaActual.respostes.some((r) => normalitzar(r) === resposta);
  if (!encert) {
    mostrarAvis('Encara no. Torna-ho a provar!', 'error');
    return;
  }
  marcarSuperada(provaActual.id);
  sumarPunts(provaActual.punts);
  mostrarAvis(`Molt bé! +${provaActual.punts} punts`, 'ok');
  obrirProva(provaActual.id);
}

export function iniciarProves() {
  document.getElementById('llista-proves').addEventListener('click', (e) => {
    const boto = e.target.closest('[data-prova]');
    if (boto) obrirProva(boto.dataset.prova);
  });
  subscriure(pintarLlista);
  obrirProva(PROVES[0].id);
}

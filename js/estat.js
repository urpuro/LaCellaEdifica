// Estat de la partida. Només viu en memòria: en recarregar la pàgina es perd.

const estat = {
  punts: 0,
  inventari: { teula: 0, taulo: 0 },
  provesSuperades: new Set(),
};

const subscriptors = new Set();

export function obtenirEstat() {
  return estat;
}

export function subscriure(fn) {
  subscriptors.add(fn);
  fn(estat);
}

function notificar() {
  subscriptors.forEach((fn) => fn(estat));
}

export function sumarPunts(quantitat) {
  estat.punts += quantitat;
  notificar();
}

export function gastarPunts(quantitat) {
  if (estat.punts < quantitat) return false;
  estat.punts -= quantitat;
  notificar();
  return true;
}

export function afegirMaterial(tipus, quantitat = 1) {
  estat.inventari[tipus] += quantitat;
  notificar();
}

export function treureMaterial(tipus) {
  if (estat.inventari[tipus] <= 0) return false;
  estat.inventari[tipus] -= 1;
  notificar();
  return true;
}

export function marcarSuperada(id) {
  estat.provesSuperades.add(id);
  notificar();
}

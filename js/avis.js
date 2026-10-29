let temporitzador = null;

export function mostrarAvis(text, tipus = 'ok') {
  const avis = document.getElementById('avis');
  avis.textContent = text;
  avis.className = `avis visible ${tipus}`;
  clearTimeout(temporitzador);
  temporitzador = setTimeout(() => avis.classList.remove('visible'), 2000);
}

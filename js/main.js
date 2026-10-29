import { subscriure } from './estat.js';
import { iniciarProves } from './proves.js';
import { iniciarBotiga } from './botiga.js';
import { iniciarConstruccio } from './construccio.js';

function iniciarPestanyes() {
  const botons = document.querySelectorAll('.pestanyes button');
  botons.forEach((boto) => {
    boto.addEventListener('click', () => {
      botons.forEach((b) => b.classList.toggle('actiu', b === boto));
      document.querySelectorAll('.seccio').forEach((s) => {
        s.classList.toggle('actiu', s.id === boto.dataset.seccio);
      });
    });
  });
}

function iniciarMarcador() {
  subscriure(({ punts, inventari }) => {
    document.getElementById('punts').textContent = punts;
    document.getElementById('inv-teula').textContent = inventari.teula;
    document.getElementById('inv-taulo').textContent = inventari.taulo;
  });
}

iniciarPestanyes();
iniciarMarcador();
iniciarProves();
iniciarBotiga();
iniciarConstruccio();

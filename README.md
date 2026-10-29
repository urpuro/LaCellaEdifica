# La Cella Edifica

Un joc per aprendre a fer servir els fulls de càlcul de **Google Sheets** jugant.

## Com funciona

1. **Proves**: el joc és una sèrie de reptes sobre fulls de càlcul (fórmules, referències de cel·les, funcions com `SUMA`, `SI`, `CERCAV`, formats, ordenació, filtres…). Cada prova superada et dona **punts**.
2. **Botiga**: amb els punts compres materials de construcció: **teules** i **taulons**.
3. **Construcció**: apila els materials per construir coses (cases, torres, ponts…). Com més proves superes, més gran i més elaborat pot ser el que construeixes.

## Característiques

- **Web estàtica** publicada a **GitHub Pages**: només cal un navegador, no cal instal·lar res.
- **Sense persistència de dades**: no hi ha comptes, ni servidor, ni base de dades, ni res guardat al navegador. Cada partida comença de zero i en tancar la pàgina es perd.
- Pensat per a l'aprenentatge: les proves van de menys a més dificultat.

## Estructura

HTML, CSS i JavaScript sense dependències ni pas de compilació (mòduls ES).

```
index.html            Pàgina única amb les tres seccions
css/estil.css         Estils
js/main.js            Arrencada i navegació entre pestanyes
js/estat.js           Estat de la partida en memòria (punts, inventari, proves fetes)
js/dades-proves.js    Definició de les proves
js/proves.js          Pinta les proves i comprova les respostes
js/materials.js       Teules i taulons: preu i amplada
js/botiga.js          Compra de materials amb punts
js/construccio.js     Tauler on s'apilen les peces
js/avis.js            Missatges emergents
```

### Afegir una prova

Afegeix un objecte a `PROVES` de `js/dades-proves.js` amb `id`, `titol`, `punts`,
`enunciat`, `full` (les cel·les que es mostren) i `respostes` (les respostes acceptades).
Les respostes es comparen sense distingir majúscules ni espais, i `;` equival a `,`.

## Executar-ho en local

Com que fa servir mòduls ES, cal servir-ho amb un servidor web, per exemple:

```bash
python3 -m http.server
```

i obrir <http://localhost:8000>.

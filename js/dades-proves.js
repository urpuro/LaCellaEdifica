// Definició de les proves. Cada prova mostra un full de càlcul petit i
// demana una fórmula o un valor. `respostes` conté les respostes acceptades;
// es comparen normalitzades (vegeu normalitzar() a proves.js).

export const PROVES = [
  {
    id: 'referencia',
    titol: 'Què hi ha a la cel·la?',
    punts: 5,
    enunciat: 'Quin valor hi ha a la cel·la <code>B3</code>?',
    full: [
      ['Fruita', 'Quilos'],
      ['Pomes', 12],
      ['Peres', 8],
      ['Taronges', 15],
    ],
    respostes: ['8'],
  },
  {
    id: 'suma',
    titol: 'Sumar una columna',
    punts: 10,
    enunciat: 'Escriu la fórmula que suma els quilos de <code>B2</code> a <code>B4</code>.',
    full: [
      ['Fruita', 'Quilos'],
      ['Pomes', 12],
      ['Peres', 8],
      ['Taronges', 15],
    ],
    respostes: ['=SUMA(B2:B4)', '=SUM(B2:B4)', '=B2+B3+B4'],
  },
  {
    id: 'mitjana',
    titol: 'La mitjana',
    punts: 10,
    enunciat: 'Escriu la fórmula que calcula la mitjana de les notes (<code>B2:B5</code>).',
    full: [
      ['Alumne', 'Nota'],
      ['Anna', 7],
      ['Biel', 9],
      ['Carla', 6],
      ['Dani', 8],
    ],
    respostes: ['=MITJANA(B2:B5)', '=AVERAGE(B2:B5)'],
  },
  {
    id: 'multiplicar',
    titol: 'Preu total',
    punts: 15,
    enunciat: 'A <code>D2</code> volem el preu total de la línia: quantitat per preu. Quina fórmula hi poses?',
    full: [
      ['Producte', 'Quantitat', 'Preu', 'Total'],
      ['Teules', 4, 3, ''],
    ],
    respostes: ['=B2*C2', '=C2*B2', '=PRODUCTE(B2:C2)', '=PRODUCT(B2:C2)'],
  },
  {
    id: 'si',
    titol: 'Aprovat o no?',
    punts: 20,
    enunciat: 'A <code>C2</code> volem que surti "Aprovat" si la nota de <code>B2</code> és 5 o més, i "Suspès" si no.',
    full: [
      ['Alumne', 'Nota', 'Resultat'],
      ['Anna', 7, ''],
    ],
    respostes: [
      '=SI(B2>=5,"APROVAT","SUSPÈS")',
      '=IF(B2>=5,"APROVAT","SUSPÈS")',
      '=SI(B2<5,"SUSPÈS","APROVAT")',
      '=IF(B2<5,"SUSPÈS","APROVAT")',
    ],
  },
];

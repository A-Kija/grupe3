console.log('Labas, Barsukas!');

let kintamasis1 = 5;
let kintamasis2 = 'Katė';

let kintamasis3 = kintamasis1 * kintamasis2;

let kintamasis4 = kintamasis1 / 0;

console.log(typeof kintamasis1);
console.log(typeof kintamasis2);
console.log(kintamasis3, typeof kintamasis3);
console.log(kintamasis4, typeof kintamasis4);


const zmogus = {}; // objektas

zmogus.vardas = 'Vardenis'; // vardas yra kintamasis, kuris yra objekto savybė
zmogus.pavarde = 'Pavardenis';
zmogus.alga = 1000;
zmogus.amzius = 99;
zmogus.namas = {};
zmogus.namas.adresas = 'Gatvės g. 1-1';
zmogus.namas.miestas = 'Vilnius';

zmogus.alga = zmogus.alga + 100;
zmogus.namas.miestas = 'Kaunas';

// zmogus = 5; // neveiks, nes const

{
    let sk = 5;
    console.log(sk);
    console.log(zmogus);
}

const skaicius = 5;

// DOM

const h1 = document.querySelector('h1');

const h1tekstas = h1.innerText;

console.log(h1, h1tekstas, typeof h1tekstas);

h1.innerText = skaicius;

console.log(h1.innerText, typeof h1.innerText);

h1.innerText = h1.innerText * 200;

// h1.style.color = 'crimson';
// h1.style.fontSize = '50px';
// h1.style.letterSpacing = '15px';

h1.classList.add('pirma-klase');
h1.classList.remove('fermos-klase');

const ketvirta = document.querySelector('section h2:nth-child(4)');

ketvirta.style.color = 'green';






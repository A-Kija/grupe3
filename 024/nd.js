class Troleibusas {

    static visiKeleiviai = 0;

    static bendrasKeleiviuSkaicius(keleiviuSkaicius) {
        this.visiKeleiviai += keleiviuSkaicius;
    }

    constructor() {
        this.keleiviuSkaicius = 0;
    }

    ilipa(keleiviuSkaicius) {
        this.keleiviuSkaicius += keleiviuSkaicius;
        this.constructor.visiKeleiviai += keleiviuSkaicius;
        // this.constructor.bendrasKeleiviuSkaicius(keleiviuSkaicius);
    }

    islipa(keleiviuSkaicius) {
        const islipo = Math.min(this.keleiviuSkaicius, keleiviuSkaicius);
        this.keleiviuSkaicius -= islipo;
        this.constructor.bendrasKeleiviuSkaicius(-islipo);
    }

    vaziuoja() {
        console.log(`Troleibuse vaiuoja ${this.keleiviuSkaicius} keleiviai.`);
    }

    keleiviuSkaiciusVisuoseTroleibusuose() {
        console.log(`Visuose troleibusuose yra ${this.constructor.visiKeleiviai} keleiviai.`);
    }
}

const nr10 = new Troleibusas();
const nr12 = new Troleibusas();
const nr16 = new Troleibusas();

nr10.ilipa(10);
nr12.ilipa(12);
nr16.ilipa(16);

nr10.islipa(2);
nr12.islipa(300);
nr16.islipa(4);

nr10.vaziuoja();
nr12.vaziuoja();
nr16.vaziuoja();

nr10.keleiviuSkaiciusVisuoseTroleibusuose();

console.clear();


const manoMapas = new Map(); // nėra shortcut, nes klaviatūroje pasibaigė skliausteliai

const manoArejus = new Array(); // shortcut const manoArejus = [];

const manoObjektas = new Object(); // shortcut const manoObjektas = {};


// Jeigu objekte aiškus eiliškumas, tai tokį objektą vadiname COUNTABLE

manoObjektas.vardas = 'Petras';
manoObjektas.amzius = 99;
manoObjektas.miestas = 'Vilnius';

manoArejus.push('Petras');
manoArejus.push(99);
manoArejus.push('Vilnius');
manoArejus.push('Petras');

manoMapas.set('vardas', 'Petras');
manoMapas.set('amzius', 99);
manoMapas.set('miestas', 'Vilnius');


console.log(manoObjektas);

console.log(manoArejus);



console.log(manoMapas.get('vardas'));
console.log(manoMapas.size);
console.log(manoMapas.has('vardas'));
manoMapas.delete('vardas');
console.log(manoMapas.has('vardas'));
manoMapas.set('vardas', 'Ona');

manoMapas.set(1, 'Vienetas');
manoMapas.set('1', 'Irgi vienetas');

manoMapas.set({a: 1}, 'Objektas 1');
manoMapas.set({a: 1}, 'Objektas 2');

console.log( manoMapas.get({a: 1}) );

// console.log({a: 1} === {a: 1}); FALSE

manoMapas.set(_=>_, 'Funkcija');

manoMapas.set(_=>_, _=>_); // Egzotika

console.log(manoMapas);

// Anonsas Set() - tai objektas, kuris saugo unikalius elementus

const manoSetas = new Set();

manoSetas.add('Petras');
manoSetas.add(99);
manoSetas.add('Vilnius');
manoSetas.add('Petras');

console.log(manoSetas.has('Petras'));
console.log(manoSetas.size);

manoSetas.delete('Petras');

manoSetas.add({a: 1});
manoSetas.add({a: 1});


console.log(manoSetas);

console.clear();

// CIKLAI: ITERACIJOS
/*
FOR - kai aiškus iteracijos skaičius
WHILE - kai nežinomas iteracijų skaičius ir gali būti nuo 0 iki begalybės
DO-WHILE - kai nežinomas iteracijų skaičius ir gali būti nuo 1 iki begalybės
FOR-IN - skirtas objektams, kai reikia pereiti per visas savybes (raktus, properties)
FOR-OF - skirtas objektams, kai reikia pereiti per visas reikšmes (values)
SWITCH - kai darome 1 iteraciją nuo pasirinktos pradžios iki pabaigos

ciklo valdymo operatoriai:
BREAK - nutraukia ciklą visiškai
CONTINUE - nutraukia šią iteraciją ir eina į kitą
*/


const herbasArSkaicius = _ => Math.random() > 0.5 ? 'H' : 'S';

// FOR reikia monetą mesti 5 kartus

for (let i = 0; i < 5; i++) {
    console.log(i, herbasArSkaicius());
}

// DO-WHILE reikia monetą mesti tol, kol iškris Herbas

let r;
do {
    r = herbasArSkaicius();
    console.log(r);
} while (r !== 'H');

// DO-WHILE reikia mesti dvi monetas kol abiejose iškris Skačius

let r1;
let r2;

let saugiklis = 100;

do {
    r1 = herbasArSkaicius();
    r2 = herbasArSkaicius();
    console.log(r1, r2);

    if (--saugiklis == 0 ) break;

} while (r1 !== 'S' || r2 !== 'S');

/*

=== - !==
> - <=
>= - <
|| - &&

*/

function rand(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// WHILE Rimas vairuoja Boltą. Rimas nori kelnių už 50. Rimas per dieną uždirba nuo 5 iki 11 eurų. Kiek dienų jam reikės dirbti jeigu greitai jo gimtadienis?

let rimas = 0;

const mociutesDovana = rand(10, 80);

rimas += mociutesDovana;

console.log('Rimas po gimtadienio turi ', rimas, ' eurų');

while(rimas < 50) {
    const uzmokestis = rand(5, 11);
    rimas += uzmokestis;
    console.log('Rimas dirbo ir turi ', rimas, ' eurų');
}

// FOR-OF per COUNTABLE objektus

console.clear();

for (const value of manoArejus) {
    if (value === 'Petras') {
        continue;
    }
    console.log(value);
}
console.log('-----------------');

manoArejus.forEach(value => {
    // ciklo valdymo operatoriai neveikia nes ne ciklas
    console.log(value);
});

console.log('-----------------');

// FOR-IN per NE COUNTABLE objektus

for (const key in manoObjektas) {
    console.log(key, manoObjektas[key]);
}

// FOR-IN per COUNTABLE objektus

for (const key in manoArejus) {
    console.log(key, manoArejus[key]);
}
console.log('-----------------');

console.log([...manoMapas]);

// Teorinis atvejis, kai galima naudoti FOR-IN, bet  kai yra geresnių būdų
for (const key in [...manoMapas]) {
    console.log([...manoMapas][key][0], [...manoMapas][key][1]);
}

console.clear();
// SWITCH

const dydis = 'M';

if (dydis === 'S') {
    console.log('Tikrinam S');
}
if (dydis === 'S' || dydis === 'M') {
    console.log('Tikrinam M');
}
if (dydis === 'S' || dydis === 'M' || dydis === 'L') {
    console.log('Tikrinam L');
}
if (dydis === 'S' || dydis === 'M' || dydis === 'L' || dydis === 'XL') {
    console.log('Tikrinam XL');
}
console.log('Netelpa');

console.log('-----------------');

switch (dydis) {
    case 'S':
        console.log('Tikrinam S');
    case 'M':
        console.log('Tikrinam M');
    case 'L':
        console.log('Tikrinam L');
    case 'XL':
        console.log('Tikrinam XL');
    default:
        console.log('Netelpa');
}

console.log('-----------------');

if (dydis === 'S') {
    console.log('Tikrinam S');
} else if (dydis === 'M') {
    console.log('Tikrinam M');
} else if (dydis === 'L') {
    console.log('Tikrinam L');
} else if (dydis === 'XL') {
    console.log('Tikrinam XL');
} else {
    console.log('Netelpa');
}

console.log('-----------------');

switch (dydis) {
    case 'S':
        console.log('Tikrinam S');
        break;
    case 'M':
        console.log('Tikrinam M');
        break;
    case 'L':
        console.log('Tikrinam L');
        break;
    case 'XL':
        console.log('Tikrinam XL');
        break;
    default:
        console.log('Netelpa');
}
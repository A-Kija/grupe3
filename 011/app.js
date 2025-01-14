console.log('Labas, Marsiečių vitaminai!');

// ! neigimas
// || arba
// && ir

let gerai = true;
console.log('gerai:', gerai);
gerai = !gerai;
console.log('gerai:', gerai);
gerai = !gerai;
console.log('gerai:', gerai);
gerai = !!gerai;
console.log('gerai:', gerai);

let kaipGyveni = 'gerai';
kaipGyveni = !kaipGyveni;

console.log('kaipGyveni:', kaipGyveni);

let niekas = '';

niekas = !!niekas;

console.log('niekas:', niekas);

let superBebras = 'ndfdsjhiuhdsuighdiuhfdiuhvfiudshvuifdshvuishviushusgfh';

console.log(superBebras);

console.clear();

// ARBA

console.log('true || true:', true || true);
console.log('true || false:', true || false);
console.log('false || true:', false || true);
console.log('false || false:', false || false);


// IR

console.log('true && true:', true && true);
console.log('true && false:', true && false);
console.log('false && true:', false && true);
console.log('false && false:', false && false);


const kas1 = 'Bebras' || 'Antraštė';
const kas2 = 'Bebras' && 'Antraštė';
const kas3 = '' || 'Antraštė';
const kas4 = '' && 'Antraštė';

console.log(kas1);
console.log(kas2);
console.log(kas3);
console.log(kas4);

const kas5 = 0 || 1 || 0 || 2; // gražins pirmą true reikšmę arba paskutinę reikšmę

const kas6 = NaN && 1 && 0 && 2; // gražins pirmą false reikšmę arba paskutinę reikšmę

console.log('kas5', kas5);
console.log('kas6', kas6);

console.clear();


const skaicius = 25;

// skaičius yra didesnis už 10 ir mažesnis už 20

if (skaicius > 10 && skaicius < 20) {
    console.log('SKAIČIUS YRA TARP 10 IR 20');
} else {
    console.log('SKAIČIUS NĖRA TARP 10 IR 20');
}


let skaicius2 = 1;

if (skaicius2--) {
    console.log('skaicius2 yra true', skaicius2);
} else {
    console.log('skaicius2 yra false', skaicius2);
}


let reiksme;

console.log(reiksme, typeof reiksme);



// if (sprendejas == 1) {
//     reiksme = 'sprendimas 1';
// } else {
//     reiksme = 'sprendimas kitas';
// }

const sprendejas = 5;

// priskiriamoji sąlyga arba ternary operatorius

reiksme = (sprendejas == 1) ? 'sprendimas 1' : 'sprendimas kitas';

console.log(reiksme);


let reiksme2;

// if (sprendejas == 1) {
//     reiksme2 = 'sprendimas 1';
// } else if (sprendejas == 2) {
//     reiksme2 = 'sprendimas 2';
// } else {
//     reiksme2 = 'sprendimas kitas';
// }

reiksme2 = sprendejas == 1 ? 'sprendimas 1' : sprendejas == 2 ? 'sprendimas 2' : 'sprendimas kitas';

console.log(reiksme2);

let objektas3 = undefined;
const objektas = null;
const objektas2 = {};

console.log(objektas, typeof objektas);
console.log(objektas2, typeof objektas2);
console.log(objektas3, typeof objektas3);


/*
JS LOOPS

for
for-in
for-of
while
do-while
switch

*/

console.clear();

let sriuba = 7;

for (let i = 0; i < sriuba; i++) {
    console.log('saukstas NR:', i);
}

const ul = document.querySelector('ul');

let html = '';

for (let i = 0; i < sriuba; i++) {

    if (i % 2) {
        html += `<li style="color: crimson;">
            Šaukštas NR: ${i}
            </li>`;
    } else {
        html += '<li>Šaukštas NR: ' + i + '</li>';
    }

}

ul.innerHTML = html;





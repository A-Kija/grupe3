console.log('Labas, Marsai!');

let fobas = 1;

fobas = fobas + 1;

fobas += 7;

fobas = fobas % 7;

console.log(fobas);

let deimas = 1;

deimas++; // padidinti vienetu
deimas++;
deimas++;

console.log(deimas);


let deimas3 = 10;

console.log(deimas3++);

console.log(deimas3);

let deimas4 = 3;
let deimas5 = 3;
let deimas6 = 3;
let deimas7 = 3;

let kiek1 = deimas4++ * 2;

console.log(kiek1);

let kiek2 = ++deimas5 * 2;

console.log(kiek2);

let kiek3 = deimas6++ * ++deimas6; // 3 * 5

console.log(kiek3);

let kiek4 = ++deimas7 * deimas7++; // 4 * 4

let fobas2 = 3;

let kiek5 = fobas2 ** fobas2; // 3 * 3 * 3

console.log(kiek5);

let kiek6 = 2 + 2 * 2; // 2 + 4

console.log(kiek6);

let kiek7 = (2 + 2) * 2; // 4 * 2

console.log(kiek7);

let kiek8 = 8 / 3;

console.log(kiek8);

console.clear(); // konsolės išvalymas

console.log(Math.round(7.35)); // apvalina iki sveiko skaičiaus
console.log(Math.round(7.85)); // apvalina iki sveiko skaičiaus
console.log(Math.round(7.5)); // apvalina iki sveiko skaičiaus
console.log(Math.round(7.499999)); // apvalina iki sveiko skaičiaus

console.log(Math.floor(7.85)); // apvalina žemyn
console.log(Math.ceil(7.15)); // apvalina aukštyn

console.log(Math.sqrt(81)); // kvadratinė šaknis

console.log(Math.max(5, 7, 10, -25)); // didžiausias skaičius
console.log(Math.min(5, 7, 10, -25)); // mažiausias skaičius

console.log(Math.PI); // skaičius pi

let deimas8 = 3;
let deimas9 = '5'; // string

console.log(deimas8 + deimas9); // 35

deimas9 = parseInt(deimas9); // pakeičia string į skaičių

console.log(deimas8 + deimas9); // 8

let deimas10 = '3.5'; // string

deimas10 = parseFloat(deimas10); // pakeičia string į skaičių

console.log(deimas8 + deimas10); // 6.5

let deimas11 = '52ABC'; // string

deimas11 = parseInt(deimas11); // pakeičia string į skaičių

console.log(deimas11); // 52

let deimas12 = 'ABC52'; // string

deimas12 = parseInt(deimas12); // pakeičia string į skaičių

console.log(deimas12); // NaN

let deimas13 = '52A52'; // string

deimas13 = parseInt(deimas13); // pakeičia string į skaičių

console.log(deimas13); // 52

let deimas14 = '52'; // string

deimas14 = +deimas14; // pakeičia string į skaičių

console.log(deimas14); // 52

let deimas15 = '52ABC'; // string

deimas15 = +deimas15; // pakeičia string į skaičių

console.log(deimas15); // NaN

let deimas16 = 333;

deimas16 = '' + deimas16; // pakeičia skaičių į string

console.log(deimas16); // '333'

console.clear(); // konsolės išvalymas


let deimas17 = 'ABC52GGG'; // string

// use regex to remove all non-numeric characters

deimas17 = deimas17.replace(/[^0-9]/g, '');

deimas17 = parseInt(deimas17);

console.log(deimas17); // 52

// boolean loginis tipas

let tiesa = true;
let melas = false;


const A = 100;
const B = 10;


if (A > B) {
    console.log('A daugiau už B');
} else if (A == B) {
    console.log('A lygu B');
} else {
    console.log('A mažiau už B');
}


console.log('A' > 'B'); // false
console.log('A' > 'b'); // false

console.log('B' > 'b'); // false
console.log('B' == 'b'); // false

console.log('AA' > 'A'); // true 65, 65 > 65, 0

console.clear(); // konsolės išvalymas  

console.log('a' > '0');
console.log('!' > '0');

console.log(2 > 3); // daugiau
console.log(2 < 3); // mažiau
console.log(2 == 3); // lygu
console.log(2 != 3); // nelygu
console.log(2 >= 3); // daugiau arba lygu
console.log(2 <= 3); // mažiau arba lygu
console.log(2 === 3); // griežtai lygu
console.log(2 !== 3); // griežtai nelygu

console.clear(); // konsolės išvalymas

console.log(2 == 2); // true lyginam tik reikšmes
console.log(2 == '2'); // true

console.log(2 === 2); // true
console.log(2 === '2'); // false griežtai lyginam ir reikšmes ir tipus












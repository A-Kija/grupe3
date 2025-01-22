const A = 1;
const B = A; // by value



const masyvas1 = [1, 2, 3, 4, 5];


const masyvas2 = [8, ...masyvas1, 7]; // [...masyvas1] - padaro kopija masyvo

const kitas = { ...masyvas1 };

const masyvas3 = masyvas1; // masyvui1 suteikiam antrą vardą masyvas3
// by reference

masyvas3[2] = 200;



console.log(masyvas1);
console.log(masyvas2);
console.log(masyvas3);
console.log(kitas);


const didelis = Math.max(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

const didelis2 = Math.max(...masyvas2);

console.log(didelis);

console.log(didelis2);


const sum2 = (a, b) => a + b;
const sum3 = (a, b, c) => a + b + c;
const sum4 = (a, b, c, d) => a + b + c + d;

const sumX = (a, ...args777) => {
    let suma = 0;
    for (let i = 0; i < args777.length; i++) {
        suma += args777[i];
    }
    return suma;
}


console.log(sum2(1, 2));
console.log(sum3(1, 2, 3));
console.log(sum4(1, 2, 3, 4));

console.log(sumX(1, 2, 3, 4));

console.clear();

const div = document.querySelector('div');

console.log(div.innerText);

const ul = document.querySelectorAll('ul li'); // NodeList - tai yra masyvas

console.log(ul);

const texts = [];

for (let i = 0; i < ul.length; i++) {
    texts.push(ul[i].innerText);
}

console.log(texts);

div.style.color = 'skyblue';

// ul.style.color = 'crimson'; // neveiks

// ul[1].style.color = 'crimson';

// for (let i = 0; i < ul.length; i++) {
//     ul[i].style.color = 'green';
// }

const ul1 = document.querySelector('ul:nth-child(3)');

console.log(ul1);


const liA = document.querySelector('li'); // visas dokumentas
console.log(liA);

const liB = ul1.querySelector('li'); // tik ul1
console.log(liB);


const uls = document.querySelectorAll('ul');

console.log(uls);

// for (let i = 0; i < uls.length; i++) {
//     const allLi = uls[i].querySelectorAll('li');
//     allLi[1].style.color = 'crimson';

//     console.log(allLi[1]);
// }

const masyvasMasyve = [];

for (let i = 0; i < uls.length; i++) {
    const allLi = uls[i].querySelectorAll('li');
    masyvasMasyve.push(allLi);
}

console.log(masyvasMasyve);


masyvasMasyve[1][4].style.color = 'crimson';

console.clear();

const randomColor = _ => {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

for (let i = 0; i < masyvasMasyve.length; i++) {
    for (let j = 0; j < masyvasMasyve[i].length; j++) {
        masyvasMasyve[i][j].style.color = randomColor();
    }
}

// 1. Sukurti masyvą iš 10 skirtingų (kartotis gali) atsitiktinių skaičių (nuo 20 iki 100) 
function rand(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// const M = Array.from({ length: 10 }, _ => rand(20, 100));



const M = [];

for (let i = 0; i < 10; i++) {
    M.push(rand(20, 100));
}

console.log(M);

// 2. Sukurti masyvą iš 10 elementų, kur pirmi 5 yra "A" raidės, o kiti "B" raidės


// const MM = Array.from({ length: 10 }, (_, i) => i < 5 ? 'A' : 'B');

const MM = [];

for (let i = 0; i < 10; i++) {
    if (i < 5) {
        MM.push('A');
    } else {
        MM.push('B');
    }
}

console.log(MM);


const digits = [5, 8, 7, 3, 3, 2, 1, 4, 9, 0];
// 3. Suskai2iuoti visų skaičių sumą



// const suma = digits.reduce((sum, sk) => sum + sk, 0); // Čia yra mūsų ketvirtadienio kodas

let suma = 0;
for (let i = 0; i < digits.length; i++) {
    suma += digits[i];
}


console.log(suma);




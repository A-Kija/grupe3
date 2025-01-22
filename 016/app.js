console.log('Sveiki, ar norite išmokti programuoti?');


const gyvuliai = ['katė', 'šuo', 'žiurkenas', 'triušis', 'begemotas', 'liūtas', 'zebras'];

let a1Html = '';

const ul1 = document.querySelector('#a1');

for (let i = 0; i < gyvuliai.length; i++) {
    a1Html += `<li style="color:skyblue">${gyvuliai[i]}</li>`; // ilgas, ilgas stringas tekstas
}

ul1.innerHTML = a1Html;


const a2 = document.querySelector('#a2');

for (let i = 0; i < gyvuliai.length; i++) {
    const li = document.createElement('li'); // sukuriamas naujas elementas tagas tikras
    li.innerText = gyvuliai[i]; // priskiriamas tekstas
    li.style.color = 'skyblue'; // priskiriamas stilius
    a2.appendChild(li); // pridedam elementa i html
}


const a3 = document.querySelector('#a3');

const gyvuliuDejimas = gyvulys => {
    const li = document.createElement('li'); // sukuriamas naujas elementas tagas tikras
    li.innerText = gyvulys; // priskiriamas tekstas
    li.style.color = 'skyblue'; // priskiriamas stilius
    a3.appendChild(li); // pridedam elementa i html
}

// for (let i = 0; i < gyvuliai.length; i++) {
//     gyvuliuDejimas(gyvuliai[i]);
// }

gyvuliai.forEach(gyvuliuDejimas);

const gyvulysIKonsole = gyvulys => {
    console.log(gyvulys);
}

gyvuliai.forEach(gyvulysIKonsole);

console.log('-----------------');

gyvuliai.forEach(gyvulys => {
    console.log(gyvulys);
});

console.log('-----------------');

gyvuliai.forEach(gyvulys => console.log(gyvulys));

console.clear();

gyvuliai.forEach((gyvulys, i) => console.log(`${i}: ${gyvulys}`));


const sks = [77, 44, 99, 55, 22, 88, 33, 11];

// Naudojant forEach atspausdinti visus skaičius

sks.forEach(skaicius => console.log(skaicius));

// Naudojant forEach atspausdinti visus skaičius pridėjus indeksą

sks.forEach((skaicius, i) => console.log(skaicius + i));

sks.forEach(skaicius => {
    if (skaicius % 2 === 0) {
        console.log(skaicius);
    }
});

console.clear();

const animals = ['cat', 'dog', 'mouse', 'rabbit'];

// Naudojant forEach atspausdinti visus gyvulius
const forResult = animals.forEach(gyvulys => console.log(gyvulys));

console.log(forResult);


const mapResult = animals.map(gyvulys => gyvulys + '@ferma.com');

//1. Sukuria naują masyvą
//2. Paima kiekvieną elementą iš seno masyvo
//3. Atlieka su juo veiksmą
//4. Įdeda rezultatą į naują masyvą

console.log(mapResult);
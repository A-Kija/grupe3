console.log('Spausk mygtyką, kol jaunas!');

const mygtukas1 = document.querySelector('button#btn1');


const mygtuko1Paspaudimas = _ => {
    console.log('Paspaustas mygtukas 1');
};


mygtukas1.addEventListener('click', mygtuko1Paspaudimas);

mygtukas1.addEventListener('dblclick', _ => {
    console.log('Paspaustas mygtukas 1 dvigubai');
});

mygtukas1.addEventListener('contextmenu', _ => {
    console.log('Paspaustas mygtukas 1 dešiniuoju pelės klavišu');
});


window.addEventListener('DOMContentLoaded', _ => {
    console.log('HTML įkeltas');
});

// konsolėje spausdinkite kintamąjį kuris didėtų vienetu paspaudus mygtuką +1

let skaicius = JSON.parse(localStorage.getItem('skaicius')) || 0;

const kazkoksObjektas = document.querySelector('#tavo');

const mygtukas2 = document.querySelector('button#btn2');

mygtukas2.addEventListener('click', _ => {
    skaicius = skaicius + 1;
    console.log(skaicius);
    kazkoksObjektas.innerText = skaicius;
    localStorage.setItem('skaicius', JSON.stringify(skaicius)); // geimo seivinimas
});

// paspaudus X mygtuką, kintamasis turi pasidarti lygus 0

const mygtukas3 = document.querySelector('#btn3');

mygtukas3.addEventListener('click', _ => {
    skaicius = 0;
    console.log(skaicius);
    kazkoksObjektas.innerText = skaicius;
});

// pakeisti kodą parašytą aukščiau, kad kintamasis būtų atvaizduojamas h1 elemente


// const manoTekstas = 'Kazkoks tekstas';

// localStorage.setItem('cia', manoTekstas);


// const tekstasIsLocal = localStorage.getItem('cia');

// console.log(tekstasIsLocal);

const zmogus = {
    vardas: 'Vardenis',
    pavarde: 'Pavardenis',
    amzius: 99,
    gyvunas: {
        rusis: 'šuo',
        vardas: 'Rexas',
    }
};

const zmogusString = JSON.stringify(zmogus); // objektą paverčia į tekstą

localStorage.setItem('zmogus', zmogusString);


const zmogusIsLocal = localStorage.getItem('zmogus');

const zmogusObjektas = JSON.parse(zmogusIsLocal); // tekstą paverčia į objektą

console.log(zmogusObjektas);

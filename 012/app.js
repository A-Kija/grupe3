console.log('Pats tu hello.js');

const ilgesnisZodis = 'Krokodilas';

// console.log(ilgesnisZodis[0]);
// console.log(ilgesnisZodis[2]);

// console.log(ilgesnisZodis.length);
// console.log(ilgesnisZodis[ilgesnisZodis.length - 1]);

// įhardkodintas kodas yra blogis, nes jis nėra universalus
// įhardkodintas kodas yra geresnis nei jokio kodo
console.log(ilgesnisZodis[0]);
console.log(ilgesnisZodis[1]);
console.log(ilgesnisZodis[2]);
console.log(ilgesnisZodis[3]);
console.log(ilgesnisZodis[4]);
console.log(ilgesnisZodis[5]);

console.clear();

let kitas = '';

for (let i = 0; i < ilgesnisZodis.length; i++) {
    console.log(ilgesnisZodis[i]);
    kitas += ilgesnisZodis[i];
}

console.log(kitas);

let naujasBeAsuO = '';

// Reikia žodyje pakeisti raides 'a' į raides 'o'

for (let i = 0; i < ilgesnisZodis.length; i++) {
    if (ilgesnisZodis[i] == 'a') {
        naujasBeAsuO += 'o';
    } else {
        naujasBeAsuO += ilgesnisZodis[i];
    }
}

console.log('El ' + naujasBeAsuO);

naujasBeAsuO = '';
for (let i = 0; i < ilgesnisZodis.length; i++) {
    naujasBeAsuO += ilgesnisZodis[i] == 'a' ? 'o' : ilgesnisZodis[i];
}

console.log('El ' + naujasBeAsuO);

// Tarp raidžių įterpti brūkšnelius

let suBruk = '';

for (let i = 0; i < ilgesnisZodis.length; i++) {
    if (i < ilgesnisZodis.length - 1) {
        suBruk += ilgesnisZodis[i] + '-';
    } else {
        suBruk += ilgesnisZodis[i];
    }
}

console.log(suBruk);

let lettersHtml = '';

for (let i = 0; i < ilgesnisZodis.length; i++) {
    lettersHtml += `<div class="letter">${ilgesnisZodis[i]}</div>`;
}

document.querySelector('.word').innerHTML = lettersHtml;

// Kiek raidžių "o" yra žodyje "krokodilas"?

let oCount = 0;

for (let i = 0; i < ilgesnisZodis.length; i++) {
    if (ilgesnisZodis[i] == 'o') {
        oCount++;
    }
}

console.log('O yra: ' + oCount);

console.clear();

for (let i = ilgesnisZodis.length - 1; i >= 0; i--) {
    console.log(ilgesnisZodis[i]);
}

console.clear();

for (let i = 0; i < ilgesnisZodis.length; i+=2 ) {
    console.log(ilgesnisZodis[i]);
}

console.clear();

for (let i = ilgesnisZodis.length - 1; i >= 0; i-=2) {
    console.log(ilgesnisZodis[i]);
}

console.clear();


// Nupaišyti 5 orandžinius apskritimus su skaičiais nuo 5 iki 9 (imtinai)

let circlesHtml = '';

for (let i = 5; i < 10; i++) {
    circlesHtml += `<div class="letter">${i}</div>`;
}

document.querySelector('.count').innerHTML = circlesHtml;

// Nupaišyti 7 orandžinius apskritimus su raide "A"

let circlesHtmlA = '';

for (let i = 0; i < 7; i++) {
    circlesHtmlA += `<div class="letter">A</div>`;
}

document.querySelector('.a').innerHTML = circlesHtmlA;

// Nupaišyti 7 orandžinius/mėlynus apskritimus su raide "A" (oranžinis-mėlynas-oranžinis-mėlynas-...)

let circlesHtmlAM = '';

for (let i = 0; i < 7; i++) {
    if (i % 2 == 0) {
        circlesHtmlAM += `<div class="letter">A</div>`;
    } else {
        circlesHtmlAM += `<div class="letter" style="background: darkblue;">A</div>`;
    }
}

document.querySelector('.b').innerHTML = circlesHtmlAM;




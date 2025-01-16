console.log('fun with FUNctions');  


console.log('srart');

function sayHi() {
    console.log('hi');
}

function say(something) {        // parameter - kintamasis
    console.log(something);
}

function say2(something, somethingElse) {
    console.log(something);
    console.log(somethingElse);
}

console.log('middle');

sayHi();
say('hello');   // argument - reikšmė
say('goodbye');
say('bebras');


console.log('middle 2');

sayHi(1, 2, 3, 4, 5);
sayHi();
say2('labas', 'rytas', 'kaip sekasi?');


console.log('end');

console.clear();

function fun1(a, b) {
    const rez = a + b;
    // return;
    console.log(rez);
}

function fun2(a, b) {
    const rez = a + b;
    return rez;
    // toliau niekas nevyksta
    const c = a - b;
    return c;
}

const astuoni = 8;

fun1(astuoni, 5);

const kaGrazinaFunkcija = fun1(astuoni, 5);

console.log(kaGrazinaFunkcija);


// reikia dviejų skaičių sumos

const dss = fun2(astuoni, 5); // priskiriams funkcijos rezultatas

console.log(dss);

function fun3(a, b) {
    return a - b;
}

function fun3(a, b) {
    return 'bla bla bla';
}

const ats3 = fun3;

console.log(ats3, typeof ats3);

const ats4 = ats3(8, 3);

console.log(ats4);

const fun4 = function (a, b) { // anoniminė funkcija
    return a * b;
}

const ats5 = fun4(8, 3);

console.log(ats5);


const kvadratas = function (size, spalva = 'black') {
    const html = '<div style="height: '+ size +'px; width: '+ size +'px; background-color: ' + spalva + ';">';
    return html;
}

// Arrow funkcija
const kvadratas2 = (size, spalva = 'black') => {
    const html = '<div style="height: '+ size +'px; width: '+ size +'px; background-color: ' + spalva + ';">';
    return html;
}

// Arrow funkcija vienos eilutės variantas
const kvadratas3 = (size, spalva = 'black') => '<div style="height: '+ size +'px; width: '+ size +'px; background-color: ' + spalva + ';">';

const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
const h3 = document.querySelector('h3');

h1.innerHTML = kvadratas3(100, 'crimson');
h2.innerHTML = kvadratas(200);
h3.innerHTML = kvadratas2(150, 'skyblue');

console.clear();


const f1 = function () {
    console.log(this);
}

const f2 = () => {
    console.log(this);
}

const o1 = {
    sayHello1: f1,
    sayHello2: f2,
}

o1.sayHello1();
o1.sayHello2();

function fun63(a, b) {
    return a + b;
}

const fun62 = function (a, b) {
    return a + b;
}

const fun61 = (a, b) => {
    return a + b;
}

const fun6 = (a, b) => a + b;

const rez6 = fun6(10, 5);

console.log(rez6);

const fun7 = (a) => a * 5;

const fun71 = a => a * 5;

console.log(fun71(10));


const fun81 = () => console.log('nieko nėra');
const fun8 = _ => console.log('nieko nėra');

fun8('labas');


const funFun = a => {
    return funMore = b => {
        return a * b;
    }
}

const rez = funFun(8)(7);

console.log(rez);

const funFunFun = a => { // callback funkcija
    a();
}

const notFun = () => console.log('labas');


funFunFun(notFun);








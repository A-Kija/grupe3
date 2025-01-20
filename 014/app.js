console.log('Sunkiausia dalis');


const fun1 = a => {
    console.log('fun1', a, typeof a);
    return a * 2;
}

const rez1 = fun1(8);
console.log(rez1);

console.log('-------------------');

const fun2 = a => {
    console.log('fun2', a, typeof a);
    return a();
}

const calbackFun1 = _ => {
    console.log('calbackFun1', 6 * 6);
}

const rez2 = fun2(calbackFun1);
console.log(rez2);

console.log('-------------------');

// Petras
const fun3 = (a, b, veiksmoFunkcija) => {
    const c = 5;
    return veiksmoFunkcija(a, b, c);
}

const daugyba = (a, b, c) => {
    return a * b + c;
}

const dalyba = (a, b, c) => {
    return a / b + c;
}


const rez3D = fun3(8, 5, daugyba);
console.log(rez3D);

const rez3D2 = fun3(8, 5, dalyba);
console.log(rez3D2);

console.clear();

const person = {
    name: 'Jonas',
    age: 99,
    pet: 'dog'
}

console.log(person);

const box1 = {
    daiktas1: 'raktai',
    daiktas7: 'telefonas',
    daiktas3: 'mikroskopas',
}

console.log(box1, box1.daiktas7);

const box2 = [
    'raktai',
    'telefonas',
    'mikroskopas',
];




box2[1] = 'radijas';
box2[3] = 'televizorius';

box2[7] = 'kede';

const pushResult = box2.push('stalas');

console.log('pushResult', pushResult); // grąžina naujo masyvo ilgį

box2.push('lova', 'fotelis');

box2.unshift('kede', 'kede', 'kede');

const popResult = box2.pop();

console.log('popResult', popResult); // grąžina išimtą elementą


for (let i = 0; i < 3; i++) {
    box2.shift();
}



console.log(box2, box2[1]);

for (let i = 0; i < box2.length; i++) {
    console.log(i, box2[i]);
}

// 1. Ar masyvas yra "skylėtas"?

let skyle = false;

for (let i = 0; i < box2.length; i++) {
    if (box2[i] === undefined) {
        skyle = true;
    }
}

console.log('skyle', skyle ? 'yra' : 'nera');

console.clear();


// 2. Užpildyti visas skyles "skėčiais"

for (let i = 0; i < box2.length; i++) {
    if (box2[i] === undefined) {
        box2[i] = 'skėtis';
    }
}

console.log(box2);




// 3. Rasti ilgiausią žodį, jeigu yra keli, tai paskutinį

let zodis = box2[0];

for (let i = 0; i < box2.length; i++) {
    if (box2[i].length >= zodis.length) {
        zodis = box2[i];
    }
}

console.log('ilgiausias zodis:', zodis);


const words = ['labas', 'rytas', 'Lietuva', 'sakau', 'tau', 'aš', 'esantis', 'čia', 'miške', 'barsukas'];
// 4. Rasti ilgiausius žodžius, jeigu yra keli, tai visus - sukuriamas naujas masyvas






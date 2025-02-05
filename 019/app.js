console.log('some, find, filter, map, reduce, sort, findIndex, findLast, includes');
const animals = [
    { name: 'Fluffy', species: 'cat', age: 2 },
    { name: 'Carlo', species: 'dog', age: 4 },
    { name: 'Nemo', species: 'fish', age: 1 },
    { name: 'Polly', species: 'bird', age: 3 },
    { name: 'Buddy', species: 'dog', age: 6 },
    { name: 'Mittens', species: 'cat', age: 5 },
    { name: 'Goldie', species: 'fish', age: 2 },
    { name: 'Tweety', species: 'bird', age: 1 },
    { name: 'Scooby', species: 'dog', age: 7 },
    { name: 'Garfield', species: 'cat', age: 4 },
    { name: 'Trash Panda', species: 'racoon', age: 5 }
];

// some
// patikrina ar bent vienas elementas atitinka sąlygą
// GRĄŽINA true arba false

//1. Ar yra šunų vyresnių nei 5 metai (metodas some)?

const isDogOlderThanFive1 = animals.some(animal => animal.species === 'dog' && animal.age > 5);
// Sužinom ar yra
console.log(isDogOlderThanFive1 ? 'Yra' : 'Nėra'); // true
const isCatOlderThanFive1 = animals.some(animal => animal.species === 'cat' && animal.age > 5);
console.log(isCatOlderThanFive1 ? 'Yra' : 'Nėra'); // false

// find
// GRĄŽINA pirmą elementą, kuris atitinka sąlygą
// GRĄŽINA undefined, jei neranda
// Radęs elementą, toliau neieško

//2. Ar yra šunų vyresnių nei 5 metai (metodas find)?

const isDogOlderThanFive2 = animals.find(animal => animal.species === 'dog' && animal.age > 5);
// Sužinom ar yra ir kuris
console.log(isDogOlderThanFive2 ? 'Yra' : 'Nėra'); 
// jei isDogOlderThanFive2 true tai rodom kas po klaustuko jei false tai kas po dvitaškio
const isCatgOlderThanFive2 = animals.find(animal => animal.species === 'cat' && animal.age > 5);
console.log(isCatgOlderThanFive2 ? 'Yra' : 'Nėra');

const isDogOlderThanFiveTrueFalse1 = !!animals.find(animal => animal.species === 'dog' && animal.age > 5);
console.log(isDogOlderThanFiveTrueFalse1);

const isDogOlderThanFiveTrueFalse2 = animals.find(animal => animal.species === 'dog' && animal.age > 5) ? true : false;
console.log(isDogOlderThanFiveTrueFalse2);


// filter
// GRĄŽINA visus elementus, kurie atitinka sąlygą
// GRĄŽINA tuščią masyvą, jei neranda
// Radęs elementą, toliau ieško, pereina per visus elementus

//3. Ar yra šunų vyresnių nei 5 metai (metodas filter)?

const isDogOlderThanFive3 = animals.filter(animal => animal.species === 'dog' && animal.age > 5);
//sužinom ar yra, kas yra ir kiek yra
console.log(isDogOlderThanFive3.length ? 'Yra' : 'Nėra');
const isCatOlderThanFive3 = animals.filter(animal => animal.species === 'cat' && animal.age > 5);
console.log(isCatOlderThanFive3.length ? 'Yra' : 'Nėra');

//4. Kiek yra šunų vyresnių nei 5 metai (metodas filter)?

const isDogOlderThanFive4 = animals.filter(animal => animal.species === 'dog' && animal.age > 5);
//sužinom kiek yra ir kas yra
console.log(isDogOlderThanFive4);
const countOfDogsOlderThanFive = isDogOlderThanFive4.length;
console.log(countOfDogsOlderThanFive);

//5. Kiek yra šunų vyresnių nei 5 metai (metodas reduce)?

const countOfDogsOlderThanFive2 = animals.reduce((total, animal) => animal.species === 'dog' && animal.age > 5 ? total + 1 : total, 0);
//sužinom kiek yra
console.log(countOfDogsOlderThanFive2);


const digits = [45, 4, 9, 16, 25];

const digits09 = digits.toSorted((a, b) => a - b);
console.log(digits09);

const digits90 = digits.toSorted((a, b) => b - a);
console.log(digits90);

//6. Surūšiuoti gyvulius pagal amžių nuo mažiausio iki didžiausio (metodas toSorted)?

const animalsSortedByAge = animals.toSorted((a, b) => a.age - b.age);
console.log(animalsSortedByAge);

const letters = ['z', 'f', 'h', 'a', 'V', 'f', 'ž', 'ą'];

const lettersSorted1 = letters.toSorted((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
});

console.log(lettersSorted1);

const lettersSorted2 = letters.toSorted((a, b) => a.localeCompare(b));

console.log(lettersSorted2);

const letters2 = ['ą', 'č', 'ę', 'ė', 'į', 'š', 'ų', 'ū', 'ž', 'a', 'c', 'e', 'i', 's', 'u', 'z'];

const lettersSorted3 = letters2.toSorted((a, b) => a.localeCompare(b, 'lt'));

console.log(lettersSorted3);

//7. Surūšiuoti gyvulius pagal vardą nuo Z iki A (metodas toSorted)?

const animalsSortedByName = animals.toSorted((a, b) => b.name.localeCompare(a.name));

console.log(animalsSortedByName);



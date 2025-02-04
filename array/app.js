const colors = ['red', 'green', 'blue', 'yellow', 'black', 'white'];

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

//1. Su forEach atspausdinti konsolėje spalvas.

colors.forEach(color => console.log(color));

//2. Su forEach atspausdinti konsolėje gyvulių vardus.

animals.forEach(animal => console.log(animal.name));

console.clear();

//3. Su map sukurti naują masyvą, kuriame visi gyvuliai yra metais vyresni.

const olderAnimals = animals.map(animal => ({ ...animal, age: animal.age + 1 }));

console.log(olderAnimals);

//4. Su map sukurti naują masyvą, kuriame visos katės yra metais vyresnės.

const olderCats = animals.map(animal => animal.species === 'cat' ? { ...animal, age: animal.age + 1 } : animal);

console.log(olderCats);

//5. Su filter atrinkti į naują masyvą visus šunis.

console.clear();

const dogs = animals.filter(animal => animal.species === 'dog');

console.log(dogs);

const olderDogs = animals
    .filter(animal => animal.species === 'dog')
    .map(dog => ({ ...dog, age: dog.age + 1 }));

console.log(olderDogs);

console.clear();


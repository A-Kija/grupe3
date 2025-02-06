
// Petras Malinauskas
class Animal {

    constructor(vardas, type) {
        console.log('Animal constructor');
        this.name = vardas;
        this.type = type;
    }

    koksTipas() {
        console.log(this.type, this.age);
    }

    duotiMetus(amzius) {
        this.age = amzius;
    }

}

// Ona Onaitytė
const dog = new Animal('Bobikas', 'dog', 3);
const cat = new Animal('Rainis', 'cat', 2);



const racoon = {name: 'Animal'};

console.log(dog.type);
console.log(cat);

console.log(racoon);

dog.duotiMetus(3);

dog.koksTipas();
cat.koksTipas();




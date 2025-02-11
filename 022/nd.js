console.log('Labas, Bebrai!');

class Pinigine2 {
    constructor() {
        this.popieriniaiPinigai = [];
        this.metaliniaiPinigai = [];
    }

    ideti(kiekis) {
        if (kiekis <= 2) {
            this.metaliniaiPinigai.push(kiekis);
        } else {
            this.popieriniaiPinigai.push(kiekis);
        }
    }

    skaiciuoti() {
        console.log('Popierinių pinigų suma:',
            this.popieriniaiPinigai.reduce((suma, pinigas) => suma + pinigas, 0));
        console.log('Metalinių pinigų suma:',
            this.metaliniaiPinigai.reduce((suma, pinigas) => suma + pinigas, 0));
        console.log('Banknotų kiekis:', this.popieriniaiPinigai.length);
        console.log('Monetų kiekis:', this.metaliniaiPinigai.length);
    }
}

const kasandrosPinigine = new Pinigine2();
const hulioPinigine = new Pinigine2();

kasandrosPinigine.ideti(5);
kasandrosPinigine.ideti(0.5);
kasandrosPinigine.ideti(20);
kasandrosPinigine.ideti(2);
kasandrosPinigine.ideti(1);

hulioPinigine.ideti(5);
hulioPinigine.ideti(0.5);
hulioPinigine.ideti(5);
hulioPinigine.ideti(0.5);

kasandrosPinigine.skaiciuoti();
hulioPinigine.skaiciuoti();

console.clear();

class Stikline {
    constructor(turis) {
        this.turis = turis;
        this.kiekis = 0;
    }

    ipilti(kiekis) {
        this.kiekis = Math.min(this.turis, this.kiekis + kiekis);
        console.log(this); // s200 kontekste this === s200
        return this;
    }

    ispilti() {
        const kiekis = this.kiekis;
        this.kiekis = 0;
        return kiekis;
    }

    stiklinejeYra() {
        console.log(this.turis + ' stiklineje yra: ' + this.kiekis + ' vandens.');
    }

}



const s200 = new Stikline(200);
const s150 = new Stikline(150);
const s100 = new Stikline(100);


// s200.ipilti(1000).stiklinejeYra();


// s200.ipilti(1000);

// s150.ipilti(s200.ispilti());

// s100.ipilti(s150.ispilti());


s100.ipilti(s150.ipilti(s200.ipilti(1000).ispilti()).ispilti());


s200.stiklinejeYra();
s150.stiklinejeYra();
s100.stiklinejeYra();


console.clear();

class Grybas {
    constructor() {
        this.valgomas = !this.rand(0, 1);
        this.sukirmijes = !this.rand(0, 1);
        this.svoris = this.rand(5, 45);
    }

    rand(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
}

class Krepsys {
    constructor() {
        this.dydis = 500;
        this.prikrauta = 0;
    }

    deti(grybas) {

        // if (grybas.valgomas && !grybas.sukirmijes) {
        //     this.prikrauta += grybas.svoris;
        // }

        grybas.valgomas && !grybas.sukirmijes && (this.prikrauta += grybas.svoris);


        return this.dydis >= this.prikrauta; // dydis didesnis - telpa dar kraunam
    }
}

const krepsys = new Krepsys();

while (krepsys.deti(new Grybas())) {} // čia neturi būti jokio tikrinimo

console.log(krepsys);